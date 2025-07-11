/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/kit';

export type MaxMessageBodySizeUpdated = { newMaxMessageBodySize: bigint };

export type MaxMessageBodySizeUpdatedArgs = {
  newMaxMessageBodySize: number | bigint;
};

export function getMaxMessageBodySizeUpdatedEncoder(): Encoder<MaxMessageBodySizeUpdatedArgs> {
  return getStructEncoder([['newMaxMessageBodySize', getU64Encoder()]]);
}

export function getMaxMessageBodySizeUpdatedDecoder(): Decoder<MaxMessageBodySizeUpdated> {
  return getStructDecoder([['newMaxMessageBodySize', getU64Decoder()]]);
}

export function getMaxMessageBodySizeUpdatedCodec(): Codec<
  MaxMessageBodySizeUpdatedArgs,
  MaxMessageBodySizeUpdated
> {
  return combineCodec(
    getMaxMessageBodySizeUpdatedEncoder(),
    getMaxMessageBodySizeUpdatedDecoder()
  );
}
