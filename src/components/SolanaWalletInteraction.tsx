import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import {
  appendTransactionMessageInstruction,
  createTransactionMessage,
  generateKeyPairSigner,
  setTransactionMessageFeePayer,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners,
  address as solAddress,
} from "@solana/kit";
import { tokenMessagerV2Addresses, usdcAddresses } from "@/lib/wagmi/config";
import { mainnet, solana } from "@reown/appkit/networks";
import {
  DepositForBurnArgs,
  getDepositForBurnInstructionAsync,
  TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
} from "@/lib/solana/tools/codama/generated/token_messenger_minter_v2";
import { Address, toBytes } from "viem";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { findNetworkAdapter } from "@/lib/cctp/networks";
import { getATA2 } from "@/lib/solana/my-utils";
import { getDepositForBurnPdasV2 } from "@/lib/solana/v2/utilsV2";
import { createSolanaClient } from "gill";
import { pipe } from "codama";
import { useWalletAccountTransactionSigner } from "@solana/react";
import { UiWalletAccount, useWallets } from "@wallet-standard/react";
import { Button } from "./ui/button";

const evmAddressToBytes32 = (address: string): string =>
  `0x000000000000000000000000${address.replace("0x", "")}`;
const evmAddressToSolana = (evmAddress: Address) =>
  solAddress(bs58.encode(toBytes(evmAddressToBytes32(evmAddress))));
const solanaUsdcAddress = solAddress(usdcAddresses[solana.id]);

export default function SolanaWalletInteraction() {
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();
  const wallets = useWallets();
  const selected = wallets.find((wallet) => wallet.accounts.length > 0);

  return (
    <div>
      {!isConnected ? (
        <button onClick={() => open()}>Connect Solana Wallet</button>
      ) : (
        selected && (
          <SignMessageButton account={selected.accounts[0]} text="Hello" />
        )
      )}
    </div>
  );
}

function SignMessageButton({
  account,
  text,
}: {
  account: UiWalletAccount;
  text: string;
}) {
  const { isConnected, address } = useAppKitAccount();
  const messageSigner = useWalletAccountTransactionSigner(
    account,
    "solana:mainnet"
  );

  const handleSend = async () => {
    if (!isConnected || !address) return;

    const receipientAddress = evmAddressToSolana(
      "0x9b3e4c62aa8f384b91dbd5260888289b699eab3a"
    );
    const { rpc, rpcSubscriptions, sendAndConfirmTransaction } =
      createSolanaClient({
        urlOrMoniker: `https://solana-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      });
    const myAddress = solAddress(address);
    const blockhash = await rpc.getLatestBlockhash().send();
    const destination = findNetworkAdapter(mainnet.id);
    if (!destination) throw new Error("Destination not found");

    // const signer: TransactionSigner = {
    //   address: messageSigner.address,
    //   async signAndSendTransactions(transactions, config) {
    //     console.log({ transactions, config });

    //     const result = await messageSigner.signAndSendTransactions(
    //       transactions,
    //       config
    //     );

    //     return result;
    //   },
    // };
    const signer = messageSigner;

    const amount = 1000000n;
    const args: DepositForBurnArgs = {
      burnToken: solanaUsdcAddress,
      amount, // 1 USDC if 6 decimals
      depositor: solAddress(address),
      mintRecipient: receipientAddress,
      destinationDomain: destination.domain,
      destinationTokenMessenger: evmAddressToSolana(
        tokenMessagerV2Addresses[
          destination.id as keyof typeof tokenMessagerV2Addresses
        ] as Address
      ),
      destinationCaller: receipientAddress,
      maxFee: amount - 1n,
      minFinalityThreshold: 1000,
      hookData: new Uint8Array(),
    };
    const userTokenAccount = await getATA2(solanaUsdcAddress, myAddress);

    const pdas = await getDepositForBurnPdasV2(
      solanaUsdcAddress,
      destination.domain
    );
    const messageSentEventAccount = await generateKeyPairSigner();
    const instruction = await getDepositForBurnInstructionAsync({
      params: args,
      owner: signer,
      eventRentPayer: signer,
      burnTokenAccount: userTokenAccount,
      burnTokenMint: solanaUsdcAddress,
      messageSentEventData: messageSentEventAccount,
      messageTransmitter: pdas.messageTransmitterAccount,
      tokenMessenger: pdas.tokenMessengerAccount,
      remoteTokenMessenger: pdas.remoteTokenMessengerKey,
      tokenMinter: pdas.tokenMinterAccount,
      program: TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
    });
    const txMessage = pipe(
      createTransactionMessage({ version: 0 }),
      (txm) =>
        setTransactionMessageLifetimeUsingBlockhash(blockhash.value, txm),
      (txm) => setTransactionMessageFeePayer(signer.address, txm),
      (txm) => appendTransactionMessageInstruction(instruction, txm)
    );

    const signedTx = await signTransactionMessageWithSigners(txMessage);
    const sig = await sendAndConfirmTransaction(signedTx);
  };

  return <Button onClick={handleSend}>Handle Send</Button>;
}
