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
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/kit';

export type Denylisted = { account: Address };

export type DenylistedArgs = Denylisted;

export function getDenylistedEncoder(): Encoder<DenylistedArgs> {
  return getStructEncoder([['account', getAddressEncoder()]]);
}

export function getDenylistedDecoder(): Decoder<Denylisted> {
  return getStructDecoder([['account', getAddressDecoder()]]);
}

export function getDenylistedCodec(): Codec<DenylistedArgs, Denylisted> {
  return combineCodec(getDenylistedEncoder(), getDenylistedDecoder());
}
