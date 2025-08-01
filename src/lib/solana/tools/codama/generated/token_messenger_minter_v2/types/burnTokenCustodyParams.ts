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

export type BurnTokenCustodyParams = { amount: bigint };

export type BurnTokenCustodyParamsArgs = { amount: number | bigint };

export function getBurnTokenCustodyParamsEncoder(): Encoder<BurnTokenCustodyParamsArgs> {
  return getStructEncoder([['amount', getU64Encoder()]]);
}

export function getBurnTokenCustodyParamsDecoder(): Decoder<BurnTokenCustodyParams> {
  return getStructDecoder([['amount', getU64Decoder()]]);
}

export function getBurnTokenCustodyParamsCodec(): Codec<
  BurnTokenCustodyParamsArgs,
  BurnTokenCustodyParams
> {
  return combineCodec(
    getBurnTokenCustodyParamsEncoder(),
    getBurnTokenCustodyParamsDecoder()
  );
}
