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
  getU8Decoder,
  getU8Encoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type ReadonlyUint8Array,
} from '@solana/kit';

export type HandleReceiveMessageParams = {
  remoteDomain: number;
  sender: Address;
  finalityThresholdExecuted: number;
  messageBody: ReadonlyUint8Array;
  authorityBump: number;
};

export type HandleReceiveMessageParamsArgs = HandleReceiveMessageParams;

export function getHandleReceiveMessageParamsEncoder(): Encoder<HandleReceiveMessageParamsArgs> {
  return getStructEncoder([
    ['remoteDomain', getU32Encoder()],
    ['sender', getAddressEncoder()],
    ['finalityThresholdExecuted', getU32Encoder()],
    ['messageBody', addEncoderSizePrefix(getBytesEncoder(), getU32Encoder())],
    ['authorityBump', getU8Encoder()],
  ]);
}

export function getHandleReceiveMessageParamsDecoder(): Decoder<HandleReceiveMessageParams> {
  return getStructDecoder([
    ['remoteDomain', getU32Decoder()],
    ['sender', getAddressDecoder()],
    ['finalityThresholdExecuted', getU32Decoder()],
    ['messageBody', addDecoderSizePrefix(getBytesDecoder(), getU32Decoder())],
    ['authorityBump', getU8Decoder()],
  ]);
}

export function getHandleReceiveMessageParamsCodec(): Codec<
  HandleReceiveMessageParamsArgs,
  HandleReceiveMessageParams
> {
  return combineCodec(
    getHandleReceiveMessageParamsEncoder(),
    getHandleReceiveMessageParamsDecoder()
  );
}
