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

export type SetMaxBurnAmountPerMessageParams = { burnLimitPerMessage: bigint };

export type SetMaxBurnAmountPerMessageParamsArgs = {
  burnLimitPerMessage: number | bigint;
};

export function getSetMaxBurnAmountPerMessageParamsEncoder(): Encoder<SetMaxBurnAmountPerMessageParamsArgs> {
  return getStructEncoder([['burnLimitPerMessage', getU64Encoder()]]);
}

export function getSetMaxBurnAmountPerMessageParamsDecoder(): Decoder<SetMaxBurnAmountPerMessageParams> {
  return getStructDecoder([['burnLimitPerMessage', getU64Decoder()]]);
}

export function getSetMaxBurnAmountPerMessageParamsCodec(): Codec<
  SetMaxBurnAmountPerMessageParamsArgs,
  SetMaxBurnAmountPerMessageParams
> {
  return combineCodec(
    getSetMaxBurnAmountPerMessageParamsEncoder(),
    getSetMaxBurnAmountPerMessageParamsDecoder()
  );
}
