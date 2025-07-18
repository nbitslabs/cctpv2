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
  getSetMaxMessageBodySizeParamsDecoder,
  getSetMaxMessageBodySizeParamsEncoder,
  type SetMaxMessageBodySizeParams,
  type SetMaxMessageBodySizeParamsArgs,
} from '../types';

export const SET_MAX_MESSAGE_BODY_SIZE_DISCRIMINATOR = new Uint8Array([
  168, 178, 8, 117, 217, 167, 219, 31,
]);

export function getSetMaxMessageBodySizeDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    SET_MAX_MESSAGE_BODY_SIZE_DISCRIMINATOR
  );
}

export type SetMaxMessageBodySizeInstruction<
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

export type SetMaxMessageBodySizeInstructionData = {
  discriminator: ReadonlyUint8Array;
  params: SetMaxMessageBodySizeParams;
};

export type SetMaxMessageBodySizeInstructionDataArgs = {
  params: SetMaxMessageBodySizeParamsArgs;
};

export function getSetMaxMessageBodySizeInstructionDataEncoder(): Encoder<SetMaxMessageBodySizeInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['params', getSetMaxMessageBodySizeParamsEncoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: SET_MAX_MESSAGE_BODY_SIZE_DISCRIMINATOR,
    })
  );
}

export function getSetMaxMessageBodySizeInstructionDataDecoder(): Decoder<SetMaxMessageBodySizeInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['params', getSetMaxMessageBodySizeParamsDecoder()],
  ]);
}

export function getSetMaxMessageBodySizeInstructionDataCodec(): Codec<
  SetMaxMessageBodySizeInstructionDataArgs,
  SetMaxMessageBodySizeInstructionData
> {
  return combineCodec(
    getSetMaxMessageBodySizeInstructionDataEncoder(),
    getSetMaxMessageBodySizeInstructionDataDecoder()
  );
}

export type SetMaxMessageBodySizeInput<
  TAccountOwner extends string = string,
  TAccountMessageTransmitter extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  owner: TransactionSigner<TAccountOwner>;
  messageTransmitter: Address<TAccountMessageTransmitter>;
  eventAuthority: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  params: SetMaxMessageBodySizeInstructionDataArgs['params'];
};

export function getSetMaxMessageBodySizeInstruction<
  TAccountOwner extends string,
  TAccountMessageTransmitter extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends Address = typeof MESSAGE_TRANSMITTER_PROGRAM_ADDRESS,
>(
  input: SetMaxMessageBodySizeInput<
    TAccountOwner,
    TAccountMessageTransmitter,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): SetMaxMessageBodySizeInstruction<
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
    data: getSetMaxMessageBodySizeInstructionDataEncoder().encode(
      args as SetMaxMessageBodySizeInstructionDataArgs
    ),
  } as SetMaxMessageBodySizeInstruction<
    TProgramAddress,
    TAccountOwner,
    TAccountMessageTransmitter,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type ParsedSetMaxMessageBodySizeInstruction<
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
  data: SetMaxMessageBodySizeInstructionData;
};

export function parseSetMaxMessageBodySizeInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedSetMaxMessageBodySizeInstruction<TProgram, TAccountMetas> {
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
    data: getSetMaxMessageBodySizeInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
