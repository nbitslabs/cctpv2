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
import { Address } from "viem";
import { findNetworkAdapter } from "@/lib/cctp/networks";
import { getATA2 } from "@/lib/solana/my-utils";
import { getDepositForBurnPdasV2 } from "@/lib/solana/v2/utilsV2";
import { createSolanaClient } from "gill";
import { pipe } from "codama";
import { useWalletAccountTransactionSigner } from "@solana/react";
import { UiWalletAccount, useWallets } from "@wallet-standard/react";
import { Button } from "./ui/button";
import { evmAddressToSolana } from "@/lib/solana/utils";
const solanaUsdcAddress = solAddress(usdcAddresses[solana.id]);

export default function SolanaWalletInteraction() {
  const { open } = useAppKit();
  const { isConnected } = useAppKitAccount();
  const wallets = useWallets();
  const selected = wallets.find((wallet) => wallet.accounts.length > 0);

  return (
    <div>
      {!isConnected ? (
        <button onClick={() => open()}>Connect Solana Wallet</button>
      ) : (
        selected && <SignMessageButton account={selected.accounts[0]} />
      )}
    </div>
  );
}

function SignMessageButton({ account }: { account: UiWalletAccount }) {
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
    const { rpc, sendAndConfirmTransaction } = createSolanaClient({
      urlOrMoniker: `https://wispy-icy-liquid.solana-mainnet.quiknode.pro/1b10c09ce4cbf223215490fc24ad0fb398e470a4/`,
    });
    const myAddress = solAddress(address);
    const destination = findNetworkAdapter(mainnet.id);
    if (!destination) throw new Error("Destination not found");
    const signer = messageSigner;

    const amount = 1000n;
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
    const blockhashResponse = await rpc.getLatestBlockhash().send();

    const txMessage = pipe(
      createTransactionMessage({ version: 0 }),
      (m) =>
        setTransactionMessageLifetimeUsingBlockhash(blockhashResponse.value, m),
      (m) => setTransactionMessageFeePayer(signer.address, m),
      (m) => appendTransactionMessageInstruction(instruction, m)
    );
    const signedTx = await signTransactionMessageWithSigners(txMessage);
    const sig = await sendAndConfirmTransaction({
      ...signedTx,
      lifetimeConstraint: blockhashResponse.value,
    });
    console.log("Burn from SOL: ", sig);

    // console.log("depositForBurn message information:", response.messages[0]);
    // console.log(
    //   "message and attestation can be used to receive the message on destination chain with domain",
    //   destinationDomain
    // );
  };

  return <Button onClick={handleSend}>Handle Send </Button>;
}
