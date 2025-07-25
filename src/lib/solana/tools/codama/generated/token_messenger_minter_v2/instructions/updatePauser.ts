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
import { TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';
import {
  getUpdatePauserParamsDecoder,
  getUpdatePauserParamsEncoder,
  type UpdatePauserParams,
  type UpdatePauserParamsArgs,
} from '../types';

export const UPDATE_PAUSER_DISCRIMINATOR = new Uint8Array([
  140, 171, 211, 132, 57, 201, 16, 254,
]);

export function getUpdatePauserDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    UPDATE_PAUSER_DISCRIMINATOR
  );
}

export type UpdatePauserInstruction<
  TProgram extends string = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TAccountTokenMessenger extends string | IAccountMeta<string> = string,
  TAccountTokenMinter extends string | IAccountMeta<string> = string,
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
      TAccountTokenMessenger extends string
        ? ReadonlyAccount<TAccountTokenMessenger>
        : TAccountTokenMessenger,
      TAccountTokenMinter extends string
        ? WritableAccount<TAccountTokenMinter>
        : TAccountTokenMinter,
      TAccountEventAuthority extends string
        ? ReadonlyAccount<TAccountEventAuthority>
        : TAccountEventAuthority,
      TAccountProgram extends string
        ? ReadonlyAccount<TAccountProgram>
        : TAccountProgram,
      ...TRemainingAccounts,
    ]
  >;

export type UpdatePauserInstructionData = {
  discriminator: ReadonlyUint8Array;
  params: UpdatePauserParams;
};

export type UpdatePauserInstructionDataArgs = {
  params: UpdatePauserParamsArgs;
};

export function getUpdatePauserInstructionDataEncoder(): Encoder<UpdatePauserInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['params', getUpdatePauserParamsEncoder()],
    ]),
    (value) => ({ ...value, discriminator: UPDATE_PAUSER_DISCRIMINATOR })
  );
}

export function getUpdatePauserInstructionDataDecoder(): Decoder<UpdatePauserInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['params', getUpdatePauserParamsDecoder()],
  ]);
}

export function getUpdatePauserInstructionDataCodec(): Codec<
  UpdatePauserInstructionDataArgs,
  UpdatePauserInstructionData
> {
  return combineCodec(
    getUpdatePauserInstructionDataEncoder(),
    getUpdatePauserInstructionDataDecoder()
  );
}

export type UpdatePauserAsyncInput<
  TAccountOwner extends string = string,
  TAccountTokenMessenger extends string = string,
  TAccountTokenMinter extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  owner: TransactionSigner<TAccountOwner>;
  tokenMessenger: Address<TAccountTokenMessenger>;
  tokenMinter: Address<TAccountTokenMinter>;
  eventAuthority?: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  params: UpdatePauserInstructionDataArgs['params'];
};

export async function getUpdatePauserInstructionAsync<
  TAccountOwner extends string,
  TAccountTokenMessenger extends string,
  TAccountTokenMinter extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends
    Address = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
>(
  input: UpdatePauserAsyncInput<
    TAccountOwner,
    TAccountTokenMessenger,
    TAccountTokenMinter,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  UpdatePauserInstruction<
    TProgramAddress,
    TAccountOwner,
    TAccountTokenMessenger,
    TAccountTokenMinter,
    TAccountEventAuthority,
    TAccountProgram
  >
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    owner: { value: input.owner ?? null, isWritable: false },
    tokenMessenger: { value: input.tokenMessenger ?? null, isWritable: false },
    tokenMinter: { value: input.tokenMinter ?? null, isWritable: true },
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
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.tokenMessenger),
      getAccountMeta(accounts.tokenMinter),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getUpdatePauserInstructionDataEncoder().encode(
      args as UpdatePauserInstructionDataArgs
    ),
  } as UpdatePauserInstruction<
    TProgramAddress,
    TAccountOwner,
    TAccountTokenMessenger,
    TAccountTokenMinter,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type UpdatePauserInput<
  TAccountOwner extends string = string,
  TAccountTokenMessenger extends string = string,
  TAccountTokenMinter extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  owner: TransactionSigner<TAccountOwner>;
  tokenMessenger: Address<TAccountTokenMessenger>;
  tokenMinter: Address<TAccountTokenMinter>;
  eventAuthority: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  params: UpdatePauserInstructionDataArgs['params'];
};

export function getUpdatePauserInstruction<
  TAccountOwner extends string,
  TAccountTokenMessenger extends string,
  TAccountTokenMinter extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends
    Address = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
>(
  input: UpdatePauserInput<
    TAccountOwner,
    TAccountTokenMessenger,
    TAccountTokenMinter,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): UpdatePauserInstruction<
  TProgramAddress,
  TAccountOwner,
  TAccountTokenMessenger,
  TAccountTokenMinter,
  TAccountEventAuthority,
  TAccountProgram
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    owner: { value: input.owner ?? null, isWritable: false },
    tokenMessenger: { value: input.tokenMessenger ?? null, isWritable: false },
    tokenMinter: { value: input.tokenMinter ?? null, isWritable: true },
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
      getAccountMeta(accounts.tokenMessenger),
      getAccountMeta(accounts.tokenMinter),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getUpdatePauserInstructionDataEncoder().encode(
      args as UpdatePauserInstructionDataArgs
    ),
  } as UpdatePauserInstruction<
    TProgramAddress,
    TAccountOwner,
    TAccountTokenMessenger,
    TAccountTokenMinter,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type ParsedUpdatePauserInstruction<
  TProgram extends string = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    owner: TAccountMetas[0];
    tokenMessenger: TAccountMetas[1];
    tokenMinter: TAccountMetas[2];
    eventAuthority: TAccountMetas[3];
    program: TAccountMetas[4];
  };
  data: UpdatePauserInstructionData;
};

export function parseUpdatePauserInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedUpdatePauserInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 5) {
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
      tokenMessenger: getNextAccount(),
      tokenMinter: getNextAccount(),
      eventAuthority: getNextAccount(),
      program: getNextAccount(),
    },
    data: getUpdatePauserInstructionDataDecoder().decode(instruction.data),
  };
}
