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
  getProgramDerivedAddress,
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
import { MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';
import {
  getUnpauseParamsDecoder,
  getUnpauseParamsEncoder,
  type UnpauseParams,
  type UnpauseParamsArgs,
} from '../types';

export const UNPAUSE_DISCRIMINATOR = new Uint8Array([
  169, 144, 4, 38, 10, 141, 188, 255,
]);

export function getUnpauseDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(UNPAUSE_DISCRIMINATOR);
}

export type UnpauseInstruction<
  TProgram extends string = typeof MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS,
  TAccountPauser extends string | IAccountMeta<string> = string,
  TAccountMessageTransmitter extends string | IAccountMeta<string> = string,
  TAccountEventAuthority extends string | IAccountMeta<string> = string,
  TAccountProgram extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountPauser extends string
        ? ReadonlySignerAccount<TAccountPauser> &
            IAccountSignerMeta<TAccountPauser>
        : TAccountPauser,
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

export type UnpauseInstructionData = {
  discriminator: ReadonlyUint8Array;
  params: UnpauseParams;
};

export type UnpauseInstructionDataArgs = { params: UnpauseParamsArgs };

export function getUnpauseInstructionDataEncoder(): Encoder<UnpauseInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['params', getUnpauseParamsEncoder()],
    ]),
    (value) => ({ ...value, discriminator: UNPAUSE_DISCRIMINATOR })
  );
}

export function getUnpauseInstructionDataDecoder(): Decoder<UnpauseInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['params', getUnpauseParamsDecoder()],
  ]);
}

export function getUnpauseInstructionDataCodec(): Codec<
  UnpauseInstructionDataArgs,
  UnpauseInstructionData
> {
  return combineCodec(
    getUnpauseInstructionDataEncoder(),
    getUnpauseInstructionDataDecoder()
  );
}

export type UnpauseAsyncInput<
  TAccountPauser extends string = string,
  TAccountMessageTransmitter extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  pauser: TransactionSigner<TAccountPauser>;
  messageTransmitter: Address<TAccountMessageTransmitter>;
  eventAuthority?: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  params: UnpauseInstructionDataArgs['params'];
};

export async function getUnpauseInstructionAsync<
  TAccountPauser extends string,
  TAccountMessageTransmitter extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends
    Address = typeof MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS,
>(
  input: UnpauseAsyncInput<
    TAccountPauser,
    TAccountMessageTransmitter,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  UnpauseInstruction<
    TProgramAddress,
    TAccountPauser,
    TAccountMessageTransmitter,
    TAccountEventAuthority,
    TAccountProgram
  >
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    pauser: { value: input.pauser ?? null, isWritable: false },
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

  // Resolve default values.
  if (!accounts.eventAuthority.value) {
    accounts.eventAuthority.value = await getProgramDerivedAddress({
      programAddress,
      seeds: [
        getBytesEncoder().encode(
          new Uint8Array([
            95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114,
            105, 116, 121,
          ])
        ),
      ],
    });
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.pauser),
      getAccountMeta(accounts.messageTransmitter),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getUnpauseInstructionDataEncoder().encode(
      args as UnpauseInstructionDataArgs
    ),
  } as UnpauseInstruction<
    TProgramAddress,
    TAccountPauser,
    TAccountMessageTransmitter,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type UnpauseInput<
  TAccountPauser extends string = string,
  TAccountMessageTransmitter extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  pauser: TransactionSigner<TAccountPauser>;
  messageTransmitter: Address<TAccountMessageTransmitter>;
  eventAuthority: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  params: UnpauseInstructionDataArgs['params'];
};

export function getUnpauseInstruction<
  TAccountPauser extends string,
  TAccountMessageTransmitter extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends
    Address = typeof MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS,
>(
  input: UnpauseInput<
    TAccountPauser,
    TAccountMessageTransmitter,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): UnpauseInstruction<
  TProgramAddress,
  TAccountPauser,
  TAccountMessageTransmitter,
  TAccountEventAuthority,
  TAccountProgram
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    pauser: { value: input.pauser ?? null, isWritable: false },
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
      getAccountMeta(accounts.pauser),
      getAccountMeta(accounts.messageTransmitter),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getUnpauseInstructionDataEncoder().encode(
      args as UnpauseInstructionDataArgs
    ),
  } as UnpauseInstruction<
    TProgramAddress,
    TAccountPauser,
    TAccountMessageTransmitter,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type ParsedUnpauseInstruction<
  TProgram extends string = typeof MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    pauser: TAccountMetas[0];
    messageTransmitter: TAccountMetas[1];
    eventAuthority: TAccountMetas[2];
    program: TAccountMetas[3];
  };
  data: UnpauseInstructionData;
};

export function parseUnpauseInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedUnpauseInstruction<TProgram, TAccountMetas> {
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
      pauser: getNextAccount(),
      messageTransmitter: getNextAccount(),
      eventAuthority: getNextAccount(),
      program: getNextAccount(),
    },
    data: getUnpauseInstructionDataDecoder().decode(instruction.data),
  };
}
