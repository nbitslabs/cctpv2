import { solana } from "@reown/appkit/networks"
import type { CctpNetworkAdapter } from "./type"
import { CctpV2TransferType } from "./type"
import { usdcAddresses } from "@/lib/wagmi/config"
import { getATA2 } from "@/lib/solana/utils"
import { getTokenMessagerAddress } from "./util"
import { defaultCctpOpts, USDC_DECIMALS } from "./constants"
import type { DepositForBurnArgs } from "@/lib/solana/tools/codama/generated/token_messenger_minter_v2"
import {
  getDepositForBurnInstructionAsync,
  TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
} from "@/lib/solana/tools/codama/generated/token_messenger_minter_v2"
import type { Address, IAccountMeta } from "@solana/kit"
import {
  address as solAddress,
  generateKeyPairSigner,
  pipe,
  createTransactionMessage,
  setTransactionMessageLifetimeUsingBlockhash,
  setTransactionMessageFeePayer,
  appendTransactionMessageInstruction,
  signTransactionMessageWithSigners,
  AccountRole,
  createSolanaRpc,
  sendAndConfirmTransactionFactory,
  getSignatureFromTransaction,
  getBase64EncodedWireTransaction,
  createSolanaRpcSubscriptions,
} from "@solana/kit"
import type { Address as EvmAddress, Hex } from "viem"
import { hexToBytes, parseUnits, toBytes } from "viem"
import { evmAddressToSolana } from "@/lib/solana/utils"
import {
  getDepositForBurnPdasV2,
  getDepositForBurnPdasV2MessageTransmitter,
  getReceiveMessagePdasV2,
} from "@/lib/solana/v2/utilsV2"
import {
  getReceiveMessageInstructionAsync,
  getReclaimEventAccountInstruction,
  MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS,
} from "@/lib/solana/tools/codama/generated/message_transmitter_v2"
import { TOKEN_PROGRAM_ADDRESS } from "@solana-program/token"

function lamportsToSol(lamports: bigint) {
  return Number(lamports) / Number(10 ** 9)
}

const rpcPath =
  "wispy-icy-liquid.solana-mainnet.quiknode.pro/1b10c09ce4cbf223215490fc24ad0fb398e470a4/"

const rpc = createSolanaRpc(`https://${rpcPath}`)
const sendAndConfirmTransaction = sendAndConfirmTransactionFactory({
  rpc,
  rpcSubscriptions: createSolanaRpcSubscriptions(`wss://${rpcPath}`),
})

const solanaChainId = solana.id
const solanaUsdcAddress = solAddress(usdcAddresses[solanaChainId])
export const solanaNetworkAdapters: CctpNetworkAdapter[] = [
  {
    id: solanaChainId,
    name: solana.name,
    domain: 5,
    type: "solana",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
    nativeCurrency: solana.nativeCurrency,
    explorer: solana.blockExplorers.default,
    v1: { support: true },
    v2: { support: true },
    usdcAddress: solanaUsdcAddress,

    async readNativeBalance(address: string) {
      const { value: lamports } = await rpc
        .getBalance(solAddress(address))
        .send()

      const formatted = lamportsToSol(lamports)
      return { raw: formatted.toString(), formatted }
    },

    async readUsdcBalance(address: string) {
      const tokenAccount = await getATA2(solanaUsdcAddress, address)
      const { value: tokenAccountInfo } = await rpc
        .getTokenAccountBalance(solAddress(tokenAccount.toString()))
        .send()
      const raw = tokenAccountInfo.uiAmountString

      return { raw, formatted: Number(raw) }
    },

    async writeTokenMessagerDepositForBurn(
      { address, amount, destination, mintRecipient, ...options },
      cctpOpts = defaultCctpOpts
    ) {
      const tokenMessagerAddress = getTokenMessagerAddress(
        cctpOpts,
        solanaChainId
      ) as Address
      const transferType = options.transferType ?? CctpV2TransferType.Fast
      let { maxFee, finalityThreshold } = options

      const { solanaSigner } = cctpOpts || {}
      if (!solanaSigner) {
        throw new Error("Solana signer is required")
      }

      const rawAmount = parseUnits(amount.toString(), USDC_DECIMALS)

      maxFee = maxFee ?? rawAmount - 1n
      finalityThreshold =
        finalityThreshold ??
        (transferType === CctpV2TransferType.Fast ? 1000 : 2000)

      const myAddress = solAddress(address)

      const mintRecipientAddress = (
        destination.type === "evm"
          ? evmAddressToSolana(mintRecipient as EvmAddress)
          : mintRecipient
      ) as Address

      const destTokenMessagerAddress = getTokenMessagerAddress(
        cctpOpts,
        destination.id
      )
      const destinationTokenMessagerAddress =
        destination.type === "evm"
          ? evmAddressToSolana(destTokenMessagerAddress as EvmAddress)
          : destTokenMessagerAddress

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
      }
      const userTokenAccount = await getATA2(solanaUsdcAddress, myAddress)

      const pdas = await getDepositForBurnPdasV2(
        solanaUsdcAddress,
        destination.domain
      )
      const messageSentEventAccount = await generateKeyPairSigner()
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
      })
      const { value: blockhash } = await rpc.getLatestBlockhash().send()

      const txMessage = pipe(
        createTransactionMessage({ version: 0 }),
        (m) => setTransactionMessageLifetimeUsingBlockhash(blockhash, m),
        (m) => setTransactionMessageFeePayer(solanaSigner.address, m),
        (m) => appendTransactionMessageInstruction(instruction, m)
      )
      const signedTx = await signTransactionMessageWithSigners(txMessage)
      const appendedTx = { ...signedTx, lifetimeConstraint: blockhash }
      await sendAndConfirmTransaction(appendedTx, {
        commitment: "confirmed",
      })
      const simulation = await rpc
        .simulateTransaction(getBase64EncodedWireTransaction(signedTx), {
          encoding: "base64",
        })
        .send()
      if (simulation.value?.err) {
        throw new Error(simulation.value.err.toString())
      }
      return getSignatureFromTransaction(signedTx)
    },

    async simulateMessageTransmitterReceiveMessage() {
      // TODO: Implement simulation logic if possible
      return true
    },

    async writeMessageTransmitterReceiveMessage(
      message,
      attestation,
      source,
      cctpOpts = defaultCctpOpts
    ) {
      const { solanaSigner } = cctpOpts || {}
      if (!solanaSigner) {
        throw new Error("Solana signer is required")
      }

      const userTokenAccount = await getATA2(
        solanaUsdcAddress,
        solanaSigner.address
      )

      const pdas = await getReceiveMessagePdasV2(
        solanaUsdcAddress,
        evmAddressToSolana(source.usdcAddress as EvmAddress),
        source.domain.toString(),
        decodeEventNonceFromMessageV2(message),
        rpc
      )

      // Add remaining accounts to process further instructions triggered by this instruction
      const remainingAccounts: IAccountMeta[] = [
        {
          address: pdas.tokenMessengerAccount,
          role: AccountRole.READONLY,
        },
        {
          address: pdas.remoteTokenMessengerKey,
          role: AccountRole.READONLY,
        },
        {
          address: pdas.tokenMinterAccount,
          role: AccountRole.WRITABLE,
        },
        { address: pdas.localToken, role: AccountRole.WRITABLE },
        { address: pdas.tokenPair, role: AccountRole.READONLY },
        {
          role: AccountRole.WRITABLE,
          address: pdas.feeRecipientTokenAccount,
        },
        { role: AccountRole.WRITABLE, address: userTokenAccount },
        {
          role: AccountRole.WRITABLE,
          address: pdas.custodyTokenAccount,
        },
        { role: AccountRole.READONLY, address: TOKEN_PROGRAM_ADDRESS },
        {
          role: AccountRole.READONLY,
          address: pdas.tokenMessengerEventAuthority,
        },
        {
          role: AccountRole.READONLY,
          address: TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
        },
      ]

      const instruction = await getReceiveMessageInstructionAsync({
        caller: solanaSigner,
        payer: solanaSigner,
        messageTransmitter: pdas.messageTransmitterAccount,
        usedNonce: pdas.usedNonce,
        receiver: TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
        program: MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS,
        params: {
          attestation: hexToBytes(attestation as Hex),
          message: hexToBytes(message),
        },
      })

      const instructionWithRemainingAccounts = {
        ...instruction,
        accounts: [...instruction.accounts, ...remainingAccounts],
      }

      const { value: blockhash } = await rpc.getLatestBlockhash().send()
      const txMessage = pipe(
        createTransactionMessage({ version: 0 }),
        (m) => setTransactionMessageLifetimeUsingBlockhash(blockhash, m),
        (m) => setTransactionMessageFeePayer(solanaSigner.address, m),
        (m) =>
          appendTransactionMessageInstruction(
            instructionWithRemainingAccounts,
            m
          )
      )
      const signedTx = await signTransactionMessageWithSigners(txMessage)
      const appendedTx = { ...signedTx, lifetimeConstraint: blockhash }
      const simulation = await rpc
        .simulateTransaction(getBase64EncodedWireTransaction(appendedTx), {
          encoding: "base64",
        })
        .send()
      if (simulation.value?.err) {
        throw new Error(simulation.value.err.toString())
      }
      await sendAndConfirmTransaction(appendedTx, {
        commitment: "confirmed",
      })
      return getSignatureFromTransaction(signedTx)
    },

    hooks: {
      async solanaClaimEventAccount(
        { sentEventAccount, message, attestation },
        cctpOpts
      ) {
        const { solanaSigner } = cctpOpts || {}
        if (!solanaSigner) {
          throw new Error("Solana signer is required")
        }

        const messageTransmitterAccount =
          await getDepositForBurnPdasV2MessageTransmitter()
        const reclaimInstruction = getReclaimEventAccountInstruction({
          messageSentEventData: sentEventAccount,
          messageTransmitter: messageTransmitterAccount,
          payee: solanaSigner,
          params: {
            attestation: toBytes(attestation),
            destinationMessage: toBytes(message),
          },
        })

        const { value: blockhash } = await rpc.getLatestBlockhash().send()
        const txMessage = pipe(
          createTransactionMessage({ version: 0 }),
          (m) => setTransactionMessageLifetimeUsingBlockhash(blockhash, m),
          (m) => setTransactionMessageFeePayer(solanaSigner.address, m),
          (m) => appendTransactionMessageInstruction(reclaimInstruction, m)
        )
        const signedTx = await signTransactionMessageWithSigners(txMessage)
        await sendAndConfirmTransaction(signedTx, {
          commitment: "confirmed",
        })

        return getSignatureFromTransaction(signedTx)
      },
    },
  },
]

const decodeEventNonceFromMessageV2 = (messageHex: EvmAddress) => {
  const nonceIndex = 12
  const nonceBytesLength = 32
  const message = hexToBytes(messageHex)
  const eventNonceBytes = message.subarray(
    nonceIndex,
    nonceIndex + nonceBytesLength
  )
  return Buffer.from(eventNonceBytes)
}
