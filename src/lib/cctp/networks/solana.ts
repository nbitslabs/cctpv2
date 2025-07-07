import { solana } from "@reown/appkit/networks";
import {
  CctpNetworkAdapter,
  CctpFunctionOpts,
  CctpV2TransferType,
} from "./type";
import { usdcAddresses } from "@/lib/wagmi/config";
import { createSolanaClient, lamportsToSol } from "gill";
import { getATA2 } from "@/lib/solana/my-utils";
import { getTokenMessagerAddress } from "./util";
import { defaultCctpOpts, USDC_DECIMALS } from "./constants";
import {
  DepositForBurnArgs,
  getDepositForBurnInstructionAsync,
  TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
} from "@/lib/solana/tools/codama/generated/token_messenger_minter_v2";
import {
  Address,
  address as solAddress,
  generateKeyPairSigner,
  pipe,
  createTransactionMessage,
  setTransactionMessageLifetimeUsingBlockhash,
  setTransactionMessageFeePayer,
  appendTransactionMessageInstruction,
  signTransactionMessageWithSigners,
} from "@solana/kit";
import { Address as EvmAddress, hexToBytes, parseUnits, toBytes } from "viem";
import { evmAddressToSolana } from "@/lib/solana/utils";
import {
  getDepositForBurnPdasV2,
  getDepositForBurnPdasV2MessageTransmitter,
  getReceiveMessagePdasV2,
} from "@/lib/solana/v2/utilsV2";
import {
  getReceiveMessageInstructionAsync,
  getReclaimEventAccountInstruction,
  MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS,
} from "@/lib/solana/tools/codama/generated/message_transmitter_v2";

const { rpc, sendAndConfirmTransaction } = createSolanaClient({
  urlOrMoniker: `https://wispy-icy-liquid.solana-mainnet.quiknode.pro/1b10c09ce4cbf223215490fc24ad0fb398e470a4/`,
});
const solanaChainId = solana.id;
const solanaUsdcAddress = solAddress(usdcAddresses[solanaChainId]);
export const solanaNetworkAdapters: CctpNetworkAdapter[] = [
  {
    id: solanaChainId,
    name: solana.name,
    domain: 5,
    type: "solana",
    nativeCurrency: solana.nativeCurrency,
    explorer: solana.blockExplorers.default,
    v1: { support: true },
    v2: { support: true },
    usdcAddress: solanaUsdcAddress,

    async readNativeBalance(address: string) {
      const { value: lamports } = await rpc
        .getBalance(solAddress(address))
        .send();

      const formatted = Number(lamportsToSol(lamports));
      return { raw: formatted.toString(), formatted };
    },

    async readUsdcBalance(address: string) {
      const tokenAccount = await getATA2(solanaUsdcAddress, address);
      const { value: tokenAccountInfo } = await rpc
        .getTokenAccountBalance(solAddress(tokenAccount.toString()))
        .send();
      const raw = tokenAccountInfo.uiAmountString;

      return { raw, formatted: Number(raw) };
    },

    async writeTokenMessagerDepositForBurn(
      { address, amount, destination, mintRecipient, ...options },
      cctpOpts = defaultCctpOpts
    ) {
      const tokenMessagerAddress = getTokenMessagerAddress(
        cctpOpts,
        solanaChainId
      ) as Address;
      let {
        transferType = CctpV2TransferType.Fast,
        maxFee,
        finalityThreshold,
      } = options;

      const { solanaSigner } = cctpOpts || {};
      if (!solanaSigner) throw new Error("Solana signer is required");

      const rawAmount = parseUnits(amount.toString(), USDC_DECIMALS);

      maxFee = maxFee ?? rawAmount - 1n;
      finalityThreshold =
        finalityThreshold ??
        (transferType === CctpV2TransferType.Fast ? 1000 : 2000);

      const myAddress = solAddress(address);

      const mintRecipientAddress = (
        destination.type === "evm"
          ? evmAddressToSolana(mintRecipient as EvmAddress)
          : mintRecipient
      ) as Address;

      const destTokenMessagerAddress = getTokenMessagerAddress(
        cctpOpts,
        destination.id
      );
      const destinationTokenMessagerAddress =
        destination.type === "evm"
          ? evmAddressToSolana(destTokenMessagerAddress as EvmAddress)
          : destTokenMessagerAddress;

      const args: DepositForBurnArgs = {
        burnToken: solanaUsdcAddress,
        amount: rawAmount,
        depositor: solAddress(address),
        mintRecipient: mintRecipientAddress,
        destinationDomain: destination.domain,
        destinationTokenMessenger: destinationTokenMessagerAddress as Address,
        destinationCaller: mintRecipientAddress,
        maxFee,
        minFinalityThreshold: finalityThreshold,
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
        owner: solanaSigner,
        eventRentPayer: solanaSigner,
        burnTokenAccount: userTokenAccount,
        burnTokenMint: solanaUsdcAddress,
        messageSentEventData: messageSentEventAccount,
        messageTransmitter: pdas.messageTransmitterAccount,
        tokenMessenger: pdas.tokenMessengerAccount,
        remoteTokenMessenger: pdas.remoteTokenMessengerKey,
        tokenMinter: pdas.tokenMinterAccount,
        program: tokenMessagerAddress,
      });
      const blockhashResponse = await rpc.getLatestBlockhash().send();

      const txMessage = pipe(
        createTransactionMessage({ version: 0 }),
        (m) =>
          setTransactionMessageLifetimeUsingBlockhash(
            blockhashResponse.value,
            m
          ),
        (m) => setTransactionMessageFeePayer(solanaSigner.address, m),
        (m) => appendTransactionMessageInstruction(instruction, m)
      );
      const signedTx = await signTransactionMessageWithSigners(txMessage);
      const sig = await sendAndConfirmTransaction({
        ...signedTx,
        lifetimeConstraint: blockhashResponse.value,
      });

      return sig.toString();
    },

    async simulateMessageTransmitterReceiveMessage(
      _message: string,
      _attestation: string,
      _cctpOpts?: CctpFunctionOpts
    ) {
      // TODO: Implement simulation logic if possible
      return true;
    },

    async writeMessageTransmitterReceiveMessage(
      message,
      attestation,
      cctpOpts = defaultCctpOpts
    ) {
      const { solanaSigner } = cctpOpts || {};
      if (!solanaSigner) throw new Error("Solana signer is required");

      const { usedNonce, messageTransmitter } = await getReceiveMessagePdasV2(
        decodeEventNonceFromMessageV2(message) as unknown as number[]
      );

      const instruction = await getReceiveMessageInstructionAsync({
        caller: solanaSigner,
        payer: solanaSigner,
        messageTransmitter,
        usedNonce,
        receiver: TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
        program: MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS,
        params: {
          attestation: toBytes(attestation),
          message: toBytes(message),
        },
      });

      const { value: blockhash } = await rpc.getLatestBlockhash().send();
      const txMessage = pipe(
        createTransactionMessage({ version: 0 }),
        (m) => setTransactionMessageLifetimeUsingBlockhash(blockhash, m),
        (m) => setTransactionMessageFeePayer(solanaSigner.address, m),
        (m) => appendTransactionMessageInstruction(instruction, m)
      );
      const signedTx = await signTransactionMessageWithSigners(txMessage);
      const sig = await sendAndConfirmTransaction({
        ...signedTx,
        lifetimeConstraint: blockhash,
      });
      return sig.toString();
    },

    hooks: {
      async solanaClaimEventAccount(
        { sentEventAccount, message, attestation },
        cctpOpts
      ) {
        const { solanaSigner } = cctpOpts || {};
        if (!solanaSigner) throw new Error("Solana signer is required");

        const messageTransmitterAccount =
          await getDepositForBurnPdasV2MessageTransmitter();
        const reclaimInstruction = getReclaimEventAccountInstruction({
          messageSentEventData: sentEventAccount,
          messageTransmitter: messageTransmitterAccount,
          payee: solanaSigner,
          params: {
            attestation: toBytes(attestation),
            destinationMessage: toBytes(message),
          },
        });

        const { value: blockhash } = await rpc.getLatestBlockhash().send();
        const txMessage = pipe(
          createTransactionMessage({ version: 0 }),
          (m) => setTransactionMessageLifetimeUsingBlockhash(blockhash, m),
          (m) => setTransactionMessageFeePayer(solanaSigner.address, m),
          (m) => appendTransactionMessageInstruction(reclaimInstruction, m)
        );
        const signedTx = await signTransactionMessageWithSigners(txMessage);
        const sig = await sendAndConfirmTransaction({
          ...signedTx,
          lifetimeConstraint: blockhash,
        });

        return sig;
      },
    },
  },
];

const decodeEventNonceFromMessageV2 = (messageHex: EvmAddress) => {
  const nonceIndex = 12;
  const nonceBytesLength = 32;
  const message = hexToBytes(messageHex);
  const eventNonceBytes = message.subarray(
    nonceIndex,
    nonceIndex + nonceBytesLength
  );
  return eventNonceBytes;
};
