/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlyUint8Array,
} from '@solana/kit';
import { MESSAGE_TRANSMITTER_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';
import {
  getIsNonceUsedParamsDecoder,
  getIsNonceUsedParamsEncoder,
  type IsNonceUsedParams,
  type IsNonceUsedParamsArgs,
} from '../types';

export const IS_NONCE_USED_DISCRIMINATOR = new Uint8Array([
  144, 72, 107, 148, 35, 218, 31, 187,
]);

export function getIsNonceUsedDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    IS_NONCE_USED_DISCRIMINATOR
  );
}

export type IsNonceUsedInstruction<
  TProgram extends string = typeof MESSAGE_TRANSMITTER_PROGRAM_ADDRESS,
  TAccountUsedNonces extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountUsedNonces extends string
        ? ReadonlyAccount<TAccountUsedNonces>
        : TAccountUsedNonces,
      ...TRemainingAccounts,
    ]
  >;

export type IsNonceUsedInstructionData = {
  discriminator: ReadonlyUint8Array;
  params: IsNonceUsedParams;
};

export type IsNonceUsedInstructionDataArgs = { params: IsNonceUsedParamsArgs };

export function getIsNonceUsedInstructionDataEncoder(): Encoder<IsNonceUsedInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['params', getIsNonceUsedParamsEncoder()],
    ]),
    (value) => ({ ...value, discriminator: IS_NONCE_USED_DISCRIMINATOR })
  );
}

export function getIsNonceUsedInstructionDataDecoder(): Decoder<IsNonceUsedInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['params', getIsNonceUsedParamsDecoder()],
  ]);
}

export function getIsNonceUsedInstructionDataCodec(): Codec<
  IsNonceUsedInstructionDataArgs,
  IsNonceUsedInstructionData
> {
  return combineCodec(
    getIsNonceUsedInstructionDataEncoder(),
    getIsNonceUsedInstructionDataDecoder()
  );
}

export type IsNonceUsedInput<TAccountUsedNonces extends string = string> = {
  /** Account will be explicitly loaded to avoid error when it's not initialized */
  usedNonces: Address<TAccountUsedNonces>;
  params: IsNonceUsedInstructionDataArgs['params'];
};

export function getIsNonceUsedInstruction<
  TAccountUsedNonces extends string,
  TProgramAddress extends Address = typeof MESSAGE_TRANSMITTER_PROGRAM_ADDRESS,
>(
  input: IsNonceUsedInput<TAccountUsedNonces>,
  config?: { programAddress?: TProgramAddress }
): IsNonceUsedInstruction<TProgramAddress, TAccountUsedNonces> {
  // Program address.
  const programAddress =
    config?.programAddress ?? MESSAGE_TRANSMITTER_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    usedNonces: { value: input.usedNonces ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [getAccountMeta(accounts.usedNonces)],
    programAddress,
    data: getIsNonceUsedInstructionDataEncoder().encode(
      args as IsNonceUsedInstructionDataArgs
    ),
  } as IsNonceUsedInstruction<TProgramAddress, TAccountUsedNonces>;

  return instruction;
}

export type ParsedIsNonceUsedInstruction<
  TProgram extends string = typeof MESSAGE_TRANSMITTER_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Account will be explicitly loaded to avoid error when it's not initialized */
    usedNonces: TAccountMetas[0];
  };
  data: IsNonceUsedInstructionData;
};

export function parseIsNonceUsedInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedIsNonceUsedInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 1) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      usedNonces: getNextAccount(),
    },
    data: getIsNonceUsedInstructionDataDecoder().decode(instruction.data),
  };
}
