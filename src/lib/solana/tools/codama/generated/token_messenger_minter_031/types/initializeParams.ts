/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/kit';

export type InitializeParams = {
  tokenController: Address;
  localMessageTransmitter: Address;
  messageBodyVersion: number;
};

export type InitializeParamsArgs = InitializeParams;

export function getInitializeParamsEncoder(): Encoder<InitializeParamsArgs> {
  return getStructEncoder([
    ['tokenController', getAddressEncoder()],
    ['localMessageTransmitter', getAddressEncoder()],
    ['messageBodyVersion', getU32Encoder()],
  ]);
}

export function getInitializeParamsDecoder(): Decoder<InitializeParams> {
  return getStructDecoder([
    ['tokenController', getAddressDecoder()],
    ['localMessageTransmitter', getAddressDecoder()],
    ['messageBodyVersion', getU32Decoder()],
  ]);
}

export function getInitializeParamsCodec(): Codec<
  InitializeParamsArgs,
  InitializeParams
> {
  return combineCodec(
    getInitializeParamsEncoder(),
    getInitializeParamsDecoder()
  );
}
