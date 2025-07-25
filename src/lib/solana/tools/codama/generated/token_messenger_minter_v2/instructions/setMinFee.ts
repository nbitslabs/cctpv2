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
  getSetMinFeeParamsDecoder,
  getSetMinFeeParamsEncoder,
  type SetMinFeeParams,
  type SetMinFeeParamsArgs,
} from '../types';

export const SET_MIN_FEE_DISCRIMINATOR = new Uint8Array([
  114, 198, 35, 3, 41, 196, 194, 246,
]);

export function getSetMinFeeDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(SET_MIN_FEE_DISCRIMINATOR);
}

export type SetMinFeeInstruction<
  TProgram extends string = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
  TAccountMinFeeController extends string | IAccountMeta<string> = string,
  TAccountTokenMessenger extends string | IAccountMeta<string> = string,
  TAccountEventAuthority extends string | IAccountMeta<string> = string,
  TAccountProgram extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMinFeeController extends string
        ? ReadonlySignerAccount<TAccountMinFeeController> &
            IAccountSignerMeta<TAccountMinFeeController>
        : TAccountMinFeeController,
      TAccountTokenMessenger extends string
        ? WritableAccount<TAccountTokenMessenger>
        : TAccountTokenMessenger,
      TAccountEventAuthority extends string
        ? ReadonlyAccount<TAccountEventAuthority>
        : TAccountEventAuthority,
      TAccountProgram extends string
        ? ReadonlyAccount<TAccountProgram>
        : TAccountProgram,
      ...TRemainingAccounts,
    ]
  >;

export type SetMinFeeInstructionData = {
  discriminator: ReadonlyUint8Array;
  params: SetMinFeeParams;
};

export type SetMinFeeInstructionDataArgs = { params: SetMinFeeParamsArgs };

export function getSetMinFeeInstructionDataEncoder(): Encoder<SetMinFeeInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['params', getSetMinFeeParamsEncoder()],
    ]),
    (value) => ({ ...value, discriminator: SET_MIN_FEE_DISCRIMINATOR })
  );
}

export function getSetMinFeeInstructionDataDecoder(): Decoder<SetMinFeeInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['params', getSetMinFeeParamsDecoder()],
  ]);
}

export function getSetMinFeeInstructionDataCodec(): Codec<
  SetMinFeeInstructionDataArgs,
  SetMinFeeInstructionData
> {
  return combineCodec(
    getSetMinFeeInstructionDataEncoder(),
    getSetMinFeeInstructionDataDecoder()
  );
}

export type SetMinFeeAsyncInput<
  TAccountMinFeeController extends string = string,
  TAccountTokenMessenger extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  minFeeController: TransactionSigner<TAccountMinFeeController>;
  tokenMessenger: Address<TAccountTokenMessenger>;
  eventAuthority?: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  params: SetMinFeeInstructionDataArgs['params'];
};

export async function getSetMinFeeInstructionAsync<
  TAccountMinFeeController extends string,
  TAccountTokenMessenger extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends
    Address = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
>(
  input: SetMinFeeAsyncInput<
    TAccountMinFeeController,
    TAccountTokenMessenger,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  SetMinFeeInstruction<
    TProgramAddress,
    TAccountMinFeeController,
    TAccountTokenMessenger,
    TAccountEventAuthority,
    TAccountProgram
  >
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    minFeeController: {
      value: input.minFeeController ?? null,
      isWritable: false,
    },
    tokenMessenger: { value: input.tokenMessenger ?? null, isWritable: true },
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
      getAccountMeta(accounts.minFeeController),
      getAccountMeta(accounts.tokenMessenger),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getSetMinFeeInstructionDataEncoder().encode(
      args as SetMinFeeInstructionDataArgs
    ),
  } as SetMinFeeInstruction<
    TProgramAddress,
    TAccountMinFeeController,
    TAccountTokenMessenger,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type SetMinFeeInput<
  TAccountMinFeeController extends string = string,
  TAccountTokenMessenger extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  minFeeController: TransactionSigner<TAccountMinFeeController>;
  tokenMessenger: Address<TAccountTokenMessenger>;
  eventAuthority: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  params: SetMinFeeInstructionDataArgs['params'];
};

export function getSetMinFeeInstruction<
  TAccountMinFeeController extends string,
  TAccountTokenMessenger extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends
    Address = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
>(
  input: SetMinFeeInput<
    TAccountMinFeeController,
    TAccountTokenMessenger,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): SetMinFeeInstruction<
  TProgramAddress,
  TAccountMinFeeController,
  TAccountTokenMessenger,
  TAccountEventAuthority,
  TAccountProgram
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    minFeeController: {
      value: input.minFeeController ?? null,
      isWritable: false,
    },
    tokenMessenger: { value: input.tokenMessenger ?? null, isWritable: true },
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
      getAccountMeta(accounts.minFeeController),
      getAccountMeta(accounts.tokenMessenger),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getSetMinFeeInstructionDataEncoder().encode(
      args as SetMinFeeInstructionDataArgs
    ),
  } as SetMinFeeInstruction<
    TProgramAddress,
    TAccountMinFeeController,
    TAccountTokenMessenger,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type ParsedSetMinFeeInstruction<
  TProgram extends string = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    minFeeController: TAccountMetas[0];
    tokenMessenger: TAccountMetas[1];
    eventAuthority: TAccountMetas[2];
    program: TAccountMetas[3];
  };
  data: SetMinFeeInstructionData;
};

export function parseSetMinFeeInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedSetMinFeeInstruction<TProgram, TAccountMetas> {
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
      minFeeController: getNextAccount(),
      tokenMessenger: getNextAccount(),
      eventAuthority: getNextAccount(),
      program: getNextAccount(),
    },
    data: getSetMinFeeInstructionDataDecoder().decode(instruction.data),
  };
}
