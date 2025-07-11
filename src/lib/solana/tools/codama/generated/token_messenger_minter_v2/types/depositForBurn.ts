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

export type DepositForBurn = {
  burnToken: Address;
  amount: bigint;
  depositor: Address;
  mintRecipient: Address;
  destinationDomain: number;
  destinationTokenMessenger: Address;
  destinationCaller: Address;
  maxFee: bigint;
  minFinalityThreshold: number;
  hookData: ReadonlyUint8Array;
};

export type DepositForBurnArgs = {
  burnToken: Address;
  amount: number | bigint;
  depositor: Address;
  mintRecipient: Address;
  destinationDomain: number;
  destinationTokenMessenger: Address;
  destinationCaller: Address;
  maxFee: number | bigint;
  minFinalityThreshold: number;
  hookData: ReadonlyUint8Array;
};

export function getDepositForBurnEncoder(): Encoder<DepositForBurnArgs> {
  return getStructEncoder([
    ['burnToken', getAddressEncoder()],
    ['amount', getU64Encoder()],
    ['depositor', getAddressEncoder()],
    ['mintRecipient', getAddressEncoder()],
    ['destinationDomain', getU32Encoder()],
    ['destinationTokenMessenger', getAddressEncoder()],
    ['destinationCaller', getAddressEncoder()],
    ['maxFee', getU64Encoder()],
    ['minFinalityThreshold', getU32Encoder()],
    ['hookData', addEncoderSizePrefix(getBytesEncoder(), getU32Encoder())],
  ]);
}

export function getDepositForBurnDecoder(): Decoder<DepositForBurn> {
  return getStructDecoder([
    ['burnToken', getAddressDecoder()],
    ['amount', getU64Decoder()],
    ['depositor', getAddressDecoder()],
    ['mintRecipient', getAddressDecoder()],
    ['destinationDomain', getU32Decoder()],
    ['destinationTokenMessenger', getAddressDecoder()],
    ['destinationCaller', getAddressDecoder()],
    ['maxFee', getU64Decoder()],
    ['minFinalityThreshold', getU32Decoder()],
    ['hookData', addDecoderSizePrefix(getBytesDecoder(), getU32Decoder())],
  ]);
}

export function getDepositForBurnCodec(): Codec<
  DepositForBurnArgs,
  DepositForBurn
> {
  return combineCodec(getDepositForBurnEncoder(), getDepositForBurnDecoder());
}
