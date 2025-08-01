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
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/kit';
import { MESSAGE_TRANSMITTER_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';
import {
  getUpdateAttesterManagerParamsDecoder,
  getUpdateAttesterManagerParamsEncoder,
  type UpdateAttesterManagerParams,
  type UpdateAttesterManagerParamsArgs,
} from '../types';

export const UPDATE_ATTESTER_MANAGER_DISCRIMINATOR = new Uint8Array([
  175, 245, 178, 104, 85, 179, 71, 16,
]);

export function getUpdateAttesterManagerDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    UPDATE_ATTESTER_MANAGER_DISCRIMINATOR
  );
}

export type UpdateAttesterManagerInstruction<
  TProgram extends string = typeof MESSAGE_TRANSMITTER_PROGRAM_ADDRESS,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TAccountMessageTransmitter extends string | IAccountMeta<string> = string,
  TAccountEventAuthority extends string | IAccountMeta<string> = string,
  TAccountProgram extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountOwner extends string
        ? ReadonlySignerAccount<TAccountOwner> &
            IAccountSignerMeta<TAccountOwner>
        : TAccountOwner,
      TAccountMessageTransmitter extends string
        ? WritableAccount<TAccountMessageTransmitter>
        : TAccountMessageTransmitter,
      TAccountEventAuthority extends string
        ? ReadonlyAccount<TAccountEventAuthority>
        : TAccountEventAuthority,
      TAccountProgram extends string
        ? ReadonlyAccount<TAccountProgram>
        : TAccountProgram,
      ...TRemainingAccounts,
    ]
  >;

export type UpdateAttesterManagerInstructionData = {
  discriminator: ReadonlyUint8Array;
  params: UpdateAttesterManagerParams;
};

export type UpdateAttesterManagerInstructionDataArgs = {
  params: UpdateAttesterManagerParamsArgs;
};

export function getUpdateAttesterManagerInstructionDataEncoder(): Encoder<UpdateAttesterManagerInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['params', getUpdateAttesterManagerParamsEncoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: UPDATE_ATTESTER_MANAGER_DISCRIMINATOR,
    })
  );
}

export function getUpdateAttesterManagerInstructionDataDecoder(): Decoder<UpdateAttesterManagerInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['params', getUpdateAttesterManagerParamsDecoder()],
  ]);
}

export function getUpdateAttesterManagerInstructionDataCodec(): Codec<
  UpdateAttesterManagerInstructionDataArgs,
  UpdateAttesterManagerInstructionData
> {
  return combineCodec(
    getUpdateAttesterManagerInstructionDataEncoder(),
    getUpdateAttesterManagerInstructionDataDecoder()
  );
}

export type UpdateAttesterManagerInput<
  TAccountOwner extends string = string,
  TAccountMessageTransmitter extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  owner: TransactionSigner<TAccountOwner>;
  messageTransmitter: Address<TAccountMessageTransmitter>;
  eventAuthority: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  params: UpdateAttesterManagerInstructionDataArgs['params'];
};

export function getUpdateAttesterManagerInstruction<
  TAccountOwner extends string,
  TAccountMessageTransmitter extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends Address = typeof MESSAGE_TRANSMITTER_PROGRAM_ADDRESS,
>(
  input: UpdateAttesterManagerInput<
    TAccountOwner,
    TAccountMessageTransmitter,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): UpdateAttesterManagerInstruction<
  TProgramAddress,
  TAccountOwner,
  TAccountMessageTransmitter,
  TAccountEventAuthority,
  TAccountProgram
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? MESSAGE_TRANSMITTER_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    owner: { value: input.owner ?? null, isWritable: false },
    messageTransmitter: {
      value: input.messageTransmitter ?? null,
      isWritable: true,
    },
    eventAuthority: { value: input.eventAuthority ?? null, isWritable: false },
    program: { value: input.program ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.messageTransmitter),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getUpdateAttesterManagerInstructionDataEncoder().encode(
      args as UpdateAttesterManagerInstructionDataArgs
    ),
  } as UpdateAttesterManagerInstruction<
    TProgramAddress,
    TAccountOwner,
    TAccountMessageTransmitter,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type ParsedUpdateAttesterManagerInstruction<
  TProgram extends string = typeof MESSAGE_TRANSMITTER_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    owner: TAccountMetas[0];
    messageTransmitter: TAccountMetas[1];
    eventAuthority: TAccountMetas[2];
    program: TAccountMetas[3];
  };
  data: UpdateAttesterManagerInstructionData;
};

export function parseUpdateAttesterManagerInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedUpdateAttesterManagerInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 4) {
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
      owner: getNextAccount(),
      messageTransmitter: getNextAccount(),
      eventAuthority: getNextAccount(),
      program: getNextAccount(),
    },
    data: getUpdateAttesterManagerInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
