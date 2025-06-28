import { hexToBytes, findProgramAddressKit } from "../utils";
import {
  MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS,
  SEND_MESSAGE_DISCRIMINATOR,
} from "../tools/codama/generated/message_transmitter_v2";
import { TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS } from "../tools/codama/generated/token_messenger_minter_v2";

export const getDepositForBurnPdasV2 = async (
  usdcAddress: string,
  destinationDomain: number
) => {
  SEND_MESSAGE_DISCRIMINATOR;
  const messageTransmitterAccountPromise = findProgramAddressKit(
    "message_transmitter",
    MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS
  );
  const tokenMessengerAccountPromise = findProgramAddressKit(
    "token_messenger",
    TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS
  );
  const tokenMinterAccountPromise = findProgramAddressKit(
    "token_minter",
    TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS
  );
  const localTokenPromise = findProgramAddressKit(
    "local_token",
    TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
    [usdcAddress]
  );
  const remoteTokenMessengerKeyPromise = findProgramAddressKit(
    "remote_token_messenger",
    TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
    [destinationDomain.toString()]
  );
  const authorityPdaPromise = findProgramAddressKit(
    "sender_authority",
    TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS
  );
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
  ]);

  return {
    messageTransmitterAccount,
    tokenMessengerAccount,
    tokenMinterAccount,
    localToken,
    remoteTokenMessengerKey,
    authorityPda,
  };
};

export const decodeEventNonceFromMessageV2 = (messageHex: string): Buffer => {
  const nonceIndex = 12;
  const nonceBytesLength = 32;
  const message = hexToBytes(messageHex);
  const eventNonceBytes = message.subarray(
    nonceIndex,
    nonceIndex + nonceBytesLength
  );
  return eventNonceBytes;
};
