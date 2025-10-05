import { hexToBytes, findProgramAddressKit, getATA2 } from "../utils"
import type { Address, Rpc, SolanaRpcApiMainnet } from "@solana/kit"
import { MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS } from "../tools/codama/generated/message_transmitter_v2"
import { TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS } from "../tools/codama/generated/token_messenger_minter_v2"
import { fetchTokenMessenger } from "../tools/codama/generated/token_messenger_minter_v2"

export const getDepositForBurnPdasV2MessageTransmitter = () =>
  findProgramAddressKit(
    "message_transmitter",
    MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS
  )

export const getDepositForBurnPdasV2 = async (
  usdcAddress: string,
  destinationDomain: number
) => {
  const messageTransmitterAccountPromise =
    getDepositForBurnPdasV2MessageTransmitter()
  const tokenMessengerAccountPromise = findProgramAddressKit(
    "token_messenger",
    TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS
  )
  const tokenMinterAccountPromise = findProgramAddressKit(
    "token_minter",
    TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS
  )
  const localTokenPromise = findProgramAddressKit(
    "local_token",
    TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
    [usdcAddress]
  )
  const remoteTokenMessengerKeyPromise = findProgramAddressKit(
    "remote_token_messenger",
    TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
    [destinationDomain.toString()]
  )
  const authorityPdaPromise = findProgramAddressKit(
    "sender_authority",
    TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS
  )
  const [
    messageTransmitterAccount,
    tokenMessengerAccount,
    tokenMinterAccount,
    localToken,
    remoteTokenMessengerKey,
    authorityPda,
  ] = await Promise.all([
    messageTransmitterAccountPromise,
    tokenMessengerAccountPromise,
    tokenMinterAccountPromise,
    localTokenPromise,
    remoteTokenMessengerKeyPromise,
    authorityPdaPromise,
  ])

  return {
    messageTransmitterAccount,
    tokenMessengerAccount,
    tokenMinterAccount,
    localToken,
    remoteTokenMessengerKey,
    authorityPda,
  }
}

export const decodeEventNonceFromMessageV2 = (messageHex: string): Buffer => {
  const nonceIndex = 12
  const nonceBytesLength = 32
  const message = hexToBytes(messageHex)
  const eventNonceBytes = message.subarray(
    nonceIndex,
    nonceIndex + nonceBytesLength
  )
  return eventNonceBytes
}

// New function to get all PDAs needed for receiveMessage with remainingAccounts
export const getReceiveMessagePdasV2 = async (
  usdcAddress: Address,
  sourceUsdcAddress: string,
  sourceDomain: string,
  nonce: Buffer<ArrayBuffer>,
  rpc: Rpc<SolanaRpcApiMainnet>
) => {
  const messageTransmitterProgram = MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS
  const tokenMessengerMinterProgram = TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS
  const tokenMessengerAccountPromise = findProgramAddressKit(
    "token_messenger",
    tokenMessengerMinterProgram
  )
  const messageTransmitterAccountPromise = findProgramAddressKit(
    "message_transmitter",
    messageTransmitterProgram
  )
  const tokenMinterAccountPromise = findProgramAddressKit(
    "token_minter",
    tokenMessengerMinterProgram
  )
  const localTokenPromise = findProgramAddressKit(
    "local_token",
    tokenMessengerMinterProgram,
    [usdcAddress]
  )
  const remoteTokenMessengerKeyPromise = findProgramAddressKit(
    "remote_token_messenger",
    tokenMessengerMinterProgram,
    [sourceDomain]
  )
  const tokenPairPromise = findProgramAddressKit(
    "token_pair",
    tokenMessengerMinterProgram,
    [sourceDomain, sourceUsdcAddress]
  )

  const custodyTokenAccountPromise = findProgramAddressKit(
    "custody",
    tokenMessengerMinterProgram,
    [usdcAddress]
  )
  const authorityPdaPromise = findProgramAddressKit(
    "message_transmitter_authority",
    messageTransmitterProgram,
    [tokenMessengerMinterProgram]
  )
  const tokenMessengerEventAuthorityPromise = findProgramAddressKit(
    "__event_authority",
    tokenMessengerMinterProgram
  )
  const usedNoncePromise = findProgramAddressKit(
    "used_nonce",
    messageTransmitterProgram,
    [nonce]
  )

  const feeRecipientTokenAccountPromise = (async () => {
    const tokenMessagerAcc = await tokenMessengerAccountPromise
    const {
      data: { feeRecipient },
    } = await fetchTokenMessenger(rpc, tokenMessagerAcc)
    return getATA2(usdcAddress, feeRecipient)
  })()

  const promises = {
    usedNoncePromise,
    messageTransmitterAccountPromise,
    tokenMessengerAccountPromise,
    tokenMinterAccountPromise,
    localTokenPromise,
    remoteTokenMessengerKeyPromise,
    tokenPairPromise,
    feeRecipientTokenAccountPromise,
    custodyTokenAccountPromise,
    tokenMessengerEventAuthorityPromise,
    authorityPdaPromise,
  }

  const results = await Promise.all(
    Object.entries(promises).map(
      async ([key, p]) => [key.replace("Promise", ""), await p] as const
    )
  )

  return Object.fromEntries(results) as UnwrapPromiseObjectToArray<
    typeof promises
  >
}

type UnwrapPromiseObjectToArray<T> = {
  [K in keyof T as K extends `${infer P}Promise` ? P : K]: T[K] extends Promise<
    infer U
  >
    ? U
    : T[K]
}
