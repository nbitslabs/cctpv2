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
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type ReadonlyUint8Array,
} from '@solana/kit';

export type ReplaceDepositForBurnParams = {
  originalMessage: ReadonlyUint8Array;
  originalAttestation: ReadonlyUint8Array;
  newDestinationCaller: Address;
  newMintRecipient: Address;
};

export type ReplaceDepositForBurnParamsArgs = ReplaceDepositForBurnParams;

export function getReplaceDepositForBurnParamsEncoder(): Encoder<ReplaceDepositForBurnParamsArgs> {
  return getStructEncoder([
    [
      'originalMessage',
      addEncoderSizePrefix(getBytesEncoder(), getU32Encoder()),
    ],
    [
      'originalAttestation',
      addEncoderSizePrefix(getBytesEncoder(), getU32Encoder()),
    ],
    ['newDestinationCaller', getAddressEncoder()],
    ['newMintRecipient', getAddressEncoder()],
  ]);
}

export function getReplaceDepositForBurnParamsDecoder(): Decoder<ReplaceDepositForBurnParams> {
  return getStructDecoder([
    [
      'originalMessage',
      addDecoderSizePrefix(getBytesDecoder(), getU32Decoder()),
    ],
    [
      'originalAttestation',
      addDecoderSizePrefix(getBytesDecoder(), getU32Decoder()),
    ],
    ['newDestinationCaller', getAddressDecoder()],
    ['newMintRecipient', getAddressDecoder()],
  ]);
}

export function getReplaceDepositForBurnParamsCodec(): Codec<
  ReplaceDepositForBurnParamsArgs,
  ReplaceDepositForBurnParams
> {
  return combineCodec(
    getReplaceDepositForBurnParamsEncoder(),
    getReplaceDepositForBurnParamsDecoder()
  );
}
