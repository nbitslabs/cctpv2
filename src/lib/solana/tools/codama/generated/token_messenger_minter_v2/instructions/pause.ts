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
  getPauseParamsDecoder,
  getPauseParamsEncoder,
  type PauseParams,
  type PauseParamsArgs,
} from '../types';

export const PAUSE_DISCRIMINATOR = new Uint8Array([
  211, 22, 221, 251, 74, 121, 193, 47,
]);

export function getPauseDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(PAUSE_DISCRIMINATOR);
}

export type PauseInstruction<
  TProgram extends string = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
  TAccountPauser extends string | IAccountMeta<string> = string,
  TAccountTokenMinter extends string | IAccountMeta<string> = string,
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

export type PauseInstructionData = {
  discriminator: ReadonlyUint8Array;
  params: PauseParams;
};

export type PauseInstructionDataArgs = { params: PauseParamsArgs };

export function getPauseInstructionDataEncoder(): Encoder<PauseInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['params', getPauseParamsEncoder()],
    ]),
    (value) => ({ ...value, discriminator: PAUSE_DISCRIMINATOR })
  );
}

export function getPauseInstructionDataDecoder(): Decoder<PauseInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['params', getPauseParamsDecoder()],
  ]);
}

export function getPauseInstructionDataCodec(): Codec<
  PauseInstructionDataArgs,
  PauseInstructionData
> {
  return combineCodec(
    getPauseInstructionDataEncoder(),
    getPauseInstructionDataDecoder()
  );
}

export type PauseAsyncInput<
  TAccountPauser extends string = string,
  TAccountTokenMinter extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  pauser: TransactionSigner<TAccountPauser>;
  tokenMinter: Address<TAccountTokenMinter>;
  eventAuthority?: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  params: PauseInstructionDataArgs['params'];
};

export async function getPauseInstructionAsync<
  TAccountPauser extends string,
  TAccountTokenMinter extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends
    Address = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
>(
  input: PauseAsyncInput<
    TAccountPauser,
    TAccountTokenMinter,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  PauseInstruction<
    TProgramAddress,
    TAccountPauser,
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
    pauser: { value: input.pauser ?? null, isWritable: false },
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
      getAccountMeta(accounts.pauser),
      getAccountMeta(accounts.tokenMinter),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getPauseInstructionDataEncoder().encode(
      args as PauseInstructionDataArgs
    ),
  } as PauseInstruction<
    TProgramAddress,
    TAccountPauser,
    TAccountTokenMinter,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type PauseInput<
  TAccountPauser extends string = string,
  TAccountTokenMinter extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  pauser: TransactionSigner<TAccountPauser>;
  tokenMinter: Address<TAccountTokenMinter>;
  eventAuthority: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  params: PauseInstructionDataArgs['params'];
};

export function getPauseInstruction<
  TAccountPauser extends string,
  TAccountTokenMinter extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends
    Address = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
>(
  input: PauseInput<
    TAccountPauser,
    TAccountTokenMinter,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): PauseInstruction<
  TProgramAddress,
  TAccountPauser,
  TAccountTokenMinter,
  TAccountEventAuthority,
  TAccountProgram
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    pauser: { value: input.pauser ?? null, isWritable: false },
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
      getAccountMeta(accounts.pauser),
      getAccountMeta(accounts.tokenMinter),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getPauseInstructionDataEncoder().encode(
      args as PauseInstructionDataArgs
    ),
  } as PauseInstruction<
    TProgramAddress,
    TAccountPauser,
    TAccountTokenMinter,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type ParsedPauseInstruction<
  TProgram extends string = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    pauser: TAccountMetas[0];
    tokenMinter: TAccountMetas[1];
    eventAuthority: TAccountMetas[2];
    program: TAccountMetas[3];
  };
  data: PauseInstructionData;
};

export function parsePauseInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedPauseInstruction<TProgram, TAccountMetas> {
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
      tokenMinter: getNextAccount(),
      eventAuthority: getNextAccount(),
      program: getNextAccount(),
    },
    data: getPauseInstructionDataDecoder().decode(instruction.data),
  };
}
