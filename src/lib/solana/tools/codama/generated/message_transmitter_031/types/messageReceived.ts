/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  addDecoderSizePrefix,
  addEncoderSizePrefix,
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  getU64Decoder,
  getU64Encoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type ReadonlyUint8Array,
} from '@solana/kit';

export type MessageReceived = {
  caller: Address;
  sourceDomain: number;
  nonce: bigint;
  sender: Address;
  messageBody: ReadonlyUint8Array;
};

export type MessageReceivedArgs = {
  caller: Address;
  sourceDomain: number;
  nonce: number | bigint;
  sender: Address;
  messageBody: ReadonlyUint8Array;
};

export function getMessageReceivedEncoder(): Encoder<MessageReceivedArgs> {
  return getStructEncoder([
    ['caller', getAddressEncoder()],
    ['sourceDomain', getU32Encoder()],
    ['nonce', getU64Encoder()],
    ['sender', getAddressEncoder()],
    ['messageBody', addEncoderSizePrefix(getBytesEncoder(), getU32Encoder())],
  ]);
}

export function getMessageReceivedDecoder(): Decoder<MessageReceived> {
  return getStructDecoder([
    ['caller', getAddressDecoder()],
    ['sourceDomain', getU32Decoder()],
    ['nonce', getU64Decoder()],
    ['sender', getAddressDecoder()],
    ['messageBody', addDecoderSizePrefix(getBytesDecoder(), getU32Decoder())],
  ]);
}

export function getMessageReceivedCodec(): Codec<
  MessageReceivedArgs,
  MessageReceived
> {
  return combineCodec(getMessageReceivedEncoder(), getMessageReceivedDecoder());
}
