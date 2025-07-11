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
  getU64Decoder,
  getU64Encoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/kit';

export type TokenCustodyBurned = {
  custodyTokenAccount: Address;
  amount: bigint;
};

export type TokenCustodyBurnedArgs = {
  custodyTokenAccount: Address;
  amount: number | bigint;
};

export function getTokenCustodyBurnedEncoder(): Encoder<TokenCustodyBurnedArgs> {
  return getStructEncoder([
    ['custodyTokenAccount', getAddressEncoder()],
    ['amount', getU64Encoder()],
  ]);
}

export function getTokenCustodyBurnedDecoder(): Decoder<TokenCustodyBurned> {
  return getStructDecoder([
    ['custodyTokenAccount', getAddressDecoder()],
    ['amount', getU64Decoder()],
  ]);
}

export function getTokenCustodyBurnedCodec(): Codec<
  TokenCustodyBurnedArgs,
  TokenCustodyBurned
> {
  return combineCodec(
    getTokenCustodyBurnedEncoder(),
    getTokenCustodyBurnedDecoder()
  );
}
