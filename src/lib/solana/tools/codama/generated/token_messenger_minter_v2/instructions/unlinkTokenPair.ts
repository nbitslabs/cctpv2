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
  type WritableSignerAccount,
} from '@solana/kit';
import { TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';
import {
  getUninkTokenPairParamsDecoder,
  getUninkTokenPairParamsEncoder,
  type UninkTokenPairParams,
  type UninkTokenPairParamsArgs,
} from '../types';

export const UNLINK_TOKEN_PAIR_DISCRIMINATOR = new Uint8Array([
  52, 198, 100, 114, 104, 174, 85, 58,
]);

export function getUnlinkTokenPairDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    UNLINK_TOKEN_PAIR_DISCRIMINATOR
  );
}

export type UnlinkTokenPairInstruction<
  TProgram extends string = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
  TAccountPayee extends string | IAccountMeta<string> = string,
  TAccountTokenController extends string | IAccountMeta<string> = string,
  TAccountTokenMinter extends string | IAccountMeta<string> = string,
  TAccountTokenPair extends string | IAccountMeta<string> = string,
  TAccountEventAuthority extends string | IAccountMeta<string> = string,
  TAccountProgram extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountPayee extends string
        ? WritableSignerAccount<TAccountPayee> &
            IAccountSignerMeta<TAccountPayee>
        : TAccountPayee,
      TAccountTokenController extends string
        ? ReadonlySignerAccount<TAccountTokenController> &
            IAccountSignerMeta<TAccountTokenController>
        : TAccountTokenController,
      TAccountTokenMinter extends string
        ? ReadonlyAccount<TAccountTokenMinter>
        : TAccountTokenMinter,
      TAccountTokenPair extends string
        ? WritableAccount<TAccountTokenPair>
        : TAccountTokenPair,
      TAccountEventAuthority extends string
        ? ReadonlyAccount<TAccountEventAuthority>
        : TAccountEventAuthority,
      TAccountProgram extends string
        ? ReadonlyAccount<TAccountProgram>
        : TAccountProgram,
      ...TRemainingAccounts,
    ]
  >;

export type UnlinkTokenPairInstructionData = {
  discriminator: ReadonlyUint8Array;
  params: UninkTokenPairParams;
};

export type UnlinkTokenPairInstructionDataArgs = {
  params: UninkTokenPairParamsArgs;
};

export function getUnlinkTokenPairInstructionDataEncoder(): Encoder<UnlinkTokenPairInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['params', getUninkTokenPairParamsEncoder()],
    ]),
    (value) => ({ ...value, discriminator: UNLINK_TOKEN_PAIR_DISCRIMINATOR })
  );
}

export function getUnlinkTokenPairInstructionDataDecoder(): Decoder<UnlinkTokenPairInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['params', getUninkTokenPairParamsDecoder()],
  ]);
}

export function getUnlinkTokenPairInstructionDataCodec(): Codec<
  UnlinkTokenPairInstructionDataArgs,
  UnlinkTokenPairInstructionData
> {
  return combineCodec(
    getUnlinkTokenPairInstructionDataEncoder(),
    getUnlinkTokenPairInstructionDataDecoder()
  );
}

export type UnlinkTokenPairAsyncInput<
  TAccountPayee extends string = string,
  TAccountTokenController extends string = string,
  TAccountTokenMinter extends string = string,
  TAccountTokenPair extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  payee: TransactionSigner<TAccountPayee>;
  tokenController: TransactionSigner<TAccountTokenController>;
  tokenMinter: Address<TAccountTokenMinter>;
  tokenPair: Address<TAccountTokenPair>;
  eventAuthority?: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  params: UnlinkTokenPairInstructionDataArgs['params'];
};

export async function getUnlinkTokenPairInstructionAsync<
  TAccountPayee extends string,
  TAccountTokenController extends string,
  TAccountTokenMinter extends string,
  TAccountTokenPair extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends
    Address = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
>(
  input: UnlinkTokenPairAsyncInput<
    TAccountPayee,
    TAccountTokenController,
    TAccountTokenMinter,
    TAccountTokenPair,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  UnlinkTokenPairInstruction<
    TProgramAddress,
    TAccountPayee,
    TAccountTokenController,
    TAccountTokenMinter,
    TAccountTokenPair,
    TAccountEventAuthority,
    TAccountProgram
  >
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    payee: { value: input.payee ?? null, isWritable: true },
    tokenController: {
      value: input.tokenController ?? null,
      isWritable: false,
    },
    tokenMinter: { value: input.tokenMinter ?? null, isWritable: false },
    tokenPair: { value: input.tokenPair ?? null, isWritable: true },
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
      getAccountMeta(accounts.payee),
      getAccountMeta(accounts.tokenController),
      getAccountMeta(accounts.tokenMinter),
      getAccountMeta(accounts.tokenPair),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getUnlinkTokenPairInstructionDataEncoder().encode(
      args as UnlinkTokenPairInstructionDataArgs
    ),
  } as UnlinkTokenPairInstruction<
    TProgramAddress,
    TAccountPayee,
    TAccountTokenController,
    TAccountTokenMinter,
    TAccountTokenPair,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type UnlinkTokenPairInput<
  TAccountPayee extends string = string,
  TAccountTokenController extends string = string,
  TAccountTokenMinter extends string = string,
  TAccountTokenPair extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  payee: TransactionSigner<TAccountPayee>;
  tokenController: TransactionSigner<TAccountTokenController>;
  tokenMinter: Address<TAccountTokenMinter>;
  tokenPair: Address<TAccountTokenPair>;
  eventAuthority: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  params: UnlinkTokenPairInstructionDataArgs['params'];
};

export function getUnlinkTokenPairInstruction<
  TAccountPayee extends string,
  TAccountTokenController extends string,
  TAccountTokenMinter extends string,
  TAccountTokenPair extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends
    Address = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
>(
  input: UnlinkTokenPairInput<
    TAccountPayee,
    TAccountTokenController,
    TAccountTokenMinter,
    TAccountTokenPair,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): UnlinkTokenPairInstruction<
  TProgramAddress,
  TAccountPayee,
  TAccountTokenController,
  TAccountTokenMinter,
  TAccountTokenPair,
  TAccountEventAuthority,
  TAccountProgram
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    payee: { value: input.payee ?? null, isWritable: true },
    tokenController: {
      value: input.tokenController ?? null,
      isWritable: false,
    },
    tokenMinter: { value: input.tokenMinter ?? null, isWritable: false },
    tokenPair: { value: input.tokenPair ?? null, isWritable: true },
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
      getAccountMeta(accounts.payee),
      getAccountMeta(accounts.tokenController),
      getAccountMeta(accounts.tokenMinter),
      getAccountMeta(accounts.tokenPair),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getUnlinkTokenPairInstructionDataEncoder().encode(
      args as UnlinkTokenPairInstructionDataArgs
    ),
  } as UnlinkTokenPairInstruction<
    TProgramAddress,
    TAccountPayee,
    TAccountTokenController,
    TAccountTokenMinter,
    TAccountTokenPair,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type ParsedUnlinkTokenPairInstruction<
  TProgram extends string = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    payee: TAccountMetas[0];
    tokenController: TAccountMetas[1];
    tokenMinter: TAccountMetas[2];
    tokenPair: TAccountMetas[3];
    eventAuthority: TAccountMetas[4];
    program: TAccountMetas[5];
  };
  data: UnlinkTokenPairInstructionData;
};

export function parseUnlinkTokenPairInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedUnlinkTokenPairInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 6) {
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
      payee: getNextAccount(),
      tokenController: getNextAccount(),
      tokenMinter: getNextAccount(),
      tokenPair: getNextAccount(),
      eventAuthority: getNextAccount(),
      program: getNextAccount(),
    },
    data: getUnlinkTokenPairInstructionDataDecoder().decode(instruction.data),
  };
}
