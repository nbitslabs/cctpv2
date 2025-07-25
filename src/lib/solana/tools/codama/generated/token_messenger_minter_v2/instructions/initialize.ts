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
  getInitializeParamsDecoder,
  getInitializeParamsEncoder,
  type InitializeParams,
  type InitializeParamsArgs,
} from '../types';

export const INITIALIZE_DISCRIMINATOR = new Uint8Array([
  175, 175, 109, 31, 13, 152, 155, 237,
]);

export function getInitializeDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(INITIALIZE_DISCRIMINATOR);
}

export type InitializeInstruction<
  TProgram extends string = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountUpgradeAuthority extends string | IAccountMeta<string> = string,
  TAccountAuthorityPda extends string | IAccountMeta<string> = string,
  TAccountTokenMessenger extends string | IAccountMeta<string> = string,
  TAccountTokenMinter extends string | IAccountMeta<string> = string,
  TAccountTokenMessengerMinterProgramData extends
    | string
    | IAccountMeta<string> = string,
  TAccountTokenMessengerMinterProgram extends
    | string
    | IAccountMeta<string> = 'CCTPV2vPZJS2u2BBsUoscuikbYjnpFmbFsvVuJdgUMQe',
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountEventAuthority extends string | IAccountMeta<string> = string,
  TAccountProgram extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountUpgradeAuthority extends string
        ? ReadonlySignerAccount<TAccountUpgradeAuthority> &
            IAccountSignerMeta<TAccountUpgradeAuthority>
        : TAccountUpgradeAuthority,
      TAccountAuthorityPda extends string
        ? ReadonlyAccount<TAccountAuthorityPda>
        : TAccountAuthorityPda,
      TAccountTokenMessenger extends string
        ? WritableAccount<TAccountTokenMessenger>
        : TAccountTokenMessenger,
      TAccountTokenMinter extends string
        ? WritableAccount<TAccountTokenMinter>
        : TAccountTokenMinter,
      TAccountTokenMessengerMinterProgramData extends string
        ? ReadonlyAccount<TAccountTokenMessengerMinterProgramData>
        : TAccountTokenMessengerMinterProgramData,
      TAccountTokenMessengerMinterProgram extends string
        ? ReadonlyAccount<TAccountTokenMessengerMinterProgram>
        : TAccountTokenMessengerMinterProgram,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountEventAuthority extends string
        ? ReadonlyAccount<TAccountEventAuthority>
        : TAccountEventAuthority,
      TAccountProgram extends string
        ? ReadonlyAccount<TAccountProgram>
        : TAccountProgram,
      ...TRemainingAccounts,
    ]
  >;

export type InitializeInstructionData = {
  discriminator: ReadonlyUint8Array;
  params: InitializeParams;
};

export type InitializeInstructionDataArgs = { params: InitializeParamsArgs };

export function getInitializeInstructionDataEncoder(): Encoder<InitializeInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['params', getInitializeParamsEncoder()],
    ]),
    (value) => ({ ...value, discriminator: INITIALIZE_DISCRIMINATOR })
  );
}

export function getInitializeInstructionDataDecoder(): Decoder<InitializeInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['params', getInitializeParamsDecoder()],
  ]);
}

export function getInitializeInstructionDataCodec(): Codec<
  InitializeInstructionDataArgs,
  InitializeInstructionData
> {
  return combineCodec(
    getInitializeInstructionDataEncoder(),
    getInitializeInstructionDataDecoder()
  );
}

export type InitializeAsyncInput<
  TAccountPayer extends string = string,
  TAccountUpgradeAuthority extends string = string,
  TAccountAuthorityPda extends string = string,
  TAccountTokenMessenger extends string = string,
  TAccountTokenMinter extends string = string,
  TAccountTokenMessengerMinterProgramData extends string = string,
  TAccountTokenMessengerMinterProgram extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  payer: TransactionSigner<TAccountPayer>;
  upgradeAuthority: TransactionSigner<TAccountUpgradeAuthority>;
  authorityPda?: Address<TAccountAuthorityPda>;
  tokenMessenger?: Address<TAccountTokenMessenger>;
  tokenMinter?: Address<TAccountTokenMinter>;
  tokenMessengerMinterProgramData: Address<TAccountTokenMessengerMinterProgramData>;
  tokenMessengerMinterProgram?: Address<TAccountTokenMessengerMinterProgram>;
  systemProgram?: Address<TAccountSystemProgram>;
  eventAuthority?: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  params: InitializeInstructionDataArgs['params'];
};

export async function getInitializeInstructionAsync<
  TAccountPayer extends string,
  TAccountUpgradeAuthority extends string,
  TAccountAuthorityPda extends string,
  TAccountTokenMessenger extends string,
  TAccountTokenMinter extends string,
  TAccountTokenMessengerMinterProgramData extends string,
  TAccountTokenMessengerMinterProgram extends string,
  TAccountSystemProgram extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends
    Address = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
>(
  input: InitializeAsyncInput<
    TAccountPayer,
    TAccountUpgradeAuthority,
    TAccountAuthorityPda,
    TAccountTokenMessenger,
    TAccountTokenMinter,
    TAccountTokenMessengerMinterProgramData,
    TAccountTokenMessengerMinterProgram,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  InitializeInstruction<
    TProgramAddress,
    TAccountPayer,
    TAccountUpgradeAuthority,
    TAccountAuthorityPda,
    TAccountTokenMessenger,
    TAccountTokenMinter,
    TAccountTokenMessengerMinterProgramData,
    TAccountTokenMessengerMinterProgram,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    payer: { value: input.payer ?? null, isWritable: true },
    upgradeAuthority: {
      value: input.upgradeAuthority ?? null,
      isWritable: false,
    },
    authorityPda: { value: input.authorityPda ?? null, isWritable: false },
    tokenMessenger: { value: input.tokenMessenger ?? null, isWritable: true },
    tokenMinter: { value: input.tokenMinter ?? null, isWritable: true },
    tokenMessengerMinterProgramData: {
      value: input.tokenMessengerMinterProgramData ?? null,
      isWritable: false,
    },
    tokenMessengerMinterProgram: {
      value: input.tokenMessengerMinterProgram ?? null,
      isWritable: false,
    },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
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
  if (!accounts.authorityPda.value) {
    accounts.authorityPda.value = await getProgramDerivedAddress({
      programAddress,
      seeds: [
        getBytesEncoder().encode(
          new Uint8Array([
            115, 101, 110, 100, 101, 114, 95, 97, 117, 116, 104, 111, 114, 105,
            116, 121,
          ])
        ),
      ],
    });
  }
  if (!accounts.tokenMessenger.value) {
    accounts.tokenMessenger.value = await getProgramDerivedAddress({
      programAddress,
      seeds: [
        getBytesEncoder().encode(
          new Uint8Array([
            116, 111, 107, 101, 110, 95, 109, 101, 115, 115, 101, 110, 103, 101,
            114,
          ])
        ),
      ],
    });
  }
  if (!accounts.tokenMinter.value) {
    accounts.tokenMinter.value = await getProgramDerivedAddress({
      programAddress,
      seeds: [
        getBytesEncoder().encode(
          new Uint8Array([
            116, 111, 107, 101, 110, 95, 109, 105, 110, 116, 101, 114,
          ])
        ),
      ],
    });
  }
  if (!accounts.tokenMessengerMinterProgram.value) {
    accounts.tokenMessengerMinterProgram.value =
      'CCTPV2vPZJS2u2BBsUoscuikbYjnpFmbFsvVuJdgUMQe' as Address<'CCTPV2vPZJS2u2BBsUoscuikbYjnpFmbFsvVuJdgUMQe'>;
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }
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
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.upgradeAuthority),
      getAccountMeta(accounts.authorityPda),
      getAccountMeta(accounts.tokenMessenger),
      getAccountMeta(accounts.tokenMinter),
      getAccountMeta(accounts.tokenMessengerMinterProgramData),
      getAccountMeta(accounts.tokenMessengerMinterProgram),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getInitializeInstructionDataEncoder().encode(
      args as InitializeInstructionDataArgs
    ),
  } as InitializeInstruction<
    TProgramAddress,
    TAccountPayer,
    TAccountUpgradeAuthority,
    TAccountAuthorityPda,
    TAccountTokenMessenger,
    TAccountTokenMinter,
    TAccountTokenMessengerMinterProgramData,
    TAccountTokenMessengerMinterProgram,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type InitializeInput<
  TAccountPayer extends string = string,
  TAccountUpgradeAuthority extends string = string,
  TAccountAuthorityPda extends string = string,
  TAccountTokenMessenger extends string = string,
  TAccountTokenMinter extends string = string,
  TAccountTokenMessengerMinterProgramData extends string = string,
  TAccountTokenMessengerMinterProgram extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  payer: TransactionSigner<TAccountPayer>;
  upgradeAuthority: TransactionSigner<TAccountUpgradeAuthority>;
  authorityPda: Address<TAccountAuthorityPda>;
  tokenMessenger: Address<TAccountTokenMessenger>;
  tokenMinter: Address<TAccountTokenMinter>;
  tokenMessengerMinterProgramData: Address<TAccountTokenMessengerMinterProgramData>;
  tokenMessengerMinterProgram?: Address<TAccountTokenMessengerMinterProgram>;
  systemProgram?: Address<TAccountSystemProgram>;
  eventAuthority: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  params: InitializeInstructionDataArgs['params'];
};

export function getInitializeInstruction<
  TAccountPayer extends string,
  TAccountUpgradeAuthority extends string,
  TAccountAuthorityPda extends string,
  TAccountTokenMessenger extends string,
  TAccountTokenMinter extends string,
  TAccountTokenMessengerMinterProgramData extends string,
  TAccountTokenMessengerMinterProgram extends string,
  TAccountSystemProgram extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends
    Address = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
>(
  input: InitializeInput<
    TAccountPayer,
    TAccountUpgradeAuthority,
    TAccountAuthorityPda,
    TAccountTokenMessenger,
    TAccountTokenMinter,
    TAccountTokenMessengerMinterProgramData,
    TAccountTokenMessengerMinterProgram,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): InitializeInstruction<
  TProgramAddress,
  TAccountPayer,
  TAccountUpgradeAuthority,
  TAccountAuthorityPda,
  TAccountTokenMessenger,
  TAccountTokenMinter,
  TAccountTokenMessengerMinterProgramData,
  TAccountTokenMessengerMinterProgram,
  TAccountSystemProgram,
  TAccountEventAuthority,
  TAccountProgram
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    payer: { value: input.payer ?? null, isWritable: true },
    upgradeAuthority: {
      value: input.upgradeAuthority ?? null,
      isWritable: false,
    },
    authorityPda: { value: input.authorityPda ?? null, isWritable: false },
    tokenMessenger: { value: input.tokenMessenger ?? null, isWritable: true },
    tokenMinter: { value: input.tokenMinter ?? null, isWritable: true },
    tokenMessengerMinterProgramData: {
      value: input.tokenMessengerMinterProgramData ?? null,
      isWritable: false,
    },
    tokenMessengerMinterProgram: {
      value: input.tokenMessengerMinterProgram ?? null,
      isWritable: false,
    },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
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
  if (!accounts.tokenMessengerMinterProgram.value) {
    accounts.tokenMessengerMinterProgram.value =
      'CCTPV2vPZJS2u2BBsUoscuikbYjnpFmbFsvVuJdgUMQe' as Address<'CCTPV2vPZJS2u2BBsUoscuikbYjnpFmbFsvVuJdgUMQe'>;
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.upgradeAuthority),
      getAccountMeta(accounts.authorityPda),
      getAccountMeta(accounts.tokenMessenger),
      getAccountMeta(accounts.tokenMinter),
      getAccountMeta(accounts.tokenMessengerMinterProgramData),
      getAccountMeta(accounts.tokenMessengerMinterProgram),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getInitializeInstructionDataEncoder().encode(
      args as InitializeInstructionDataArgs
    ),
  } as InitializeInstruction<
    TProgramAddress,
    TAccountPayer,
    TAccountUpgradeAuthority,
    TAccountAuthorityPda,
    TAccountTokenMessenger,
    TAccountTokenMinter,
    TAccountTokenMessengerMinterProgramData,
    TAccountTokenMessengerMinterProgram,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type ParsedInitializeInstruction<
  TProgram extends string = typeof TOKEN_MESSENGER_MINTER_V2_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    payer: TAccountMetas[0];
    upgradeAuthority: TAccountMetas[1];
    authorityPda: TAccountMetas[2];
    tokenMessenger: TAccountMetas[3];
    tokenMinter: TAccountMetas[4];
    tokenMessengerMinterProgramData: TAccountMetas[5];
    tokenMessengerMinterProgram: TAccountMetas[6];
    systemProgram: TAccountMetas[7];
    eventAuthority: TAccountMetas[8];
    program: TAccountMetas[9];
  };
  data: InitializeInstructionData;
};

export function parseInitializeInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedInitializeInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 10) {
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
      payer: getNextAccount(),
      upgradeAuthority: getNextAccount(),
      authorityPda: getNextAccount(),
      tokenMessenger: getNextAccount(),
      tokenMinter: getNextAccount(),
      tokenMessengerMinterProgramData: getNextAccount(),
      tokenMessengerMinterProgram: getNextAccount(),
      systemProgram: getNextAccount(),
      eventAuthority: getNextAccount(),
      program: getNextAccount(),
    },
    data: getInitializeInstructionDataDecoder().decode(instruction.data),
  };
}
