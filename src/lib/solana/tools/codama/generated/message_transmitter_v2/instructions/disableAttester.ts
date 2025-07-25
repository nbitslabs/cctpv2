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
import { MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';
import {
  getDisableAttesterParamsDecoder,
  getDisableAttesterParamsEncoder,
  type DisableAttesterParams,
  type DisableAttesterParamsArgs,
} from '../types';

export const DISABLE_ATTESTER_DISCRIMINATOR = new Uint8Array([
  61, 171, 131, 95, 172, 15, 227, 229,
]);

export function getDisableAttesterDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    DISABLE_ATTESTER_DISCRIMINATOR
  );
}

export type DisableAttesterInstruction<
  TProgram extends string = typeof MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountAttesterManager extends string | IAccountMeta<string> = string,
  TAccountMessageTransmitter extends string | IAccountMeta<string> = string,
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
      TAccountAttesterManager extends string
        ? ReadonlySignerAccount<TAccountAttesterManager> &
            IAccountSignerMeta<TAccountAttesterManager>
        : TAccountAttesterManager,
      TAccountMessageTransmitter extends string
        ? WritableAccount<TAccountMessageTransmitter>
        : TAccountMessageTransmitter,
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

export type DisableAttesterInstructionData = {
  discriminator: ReadonlyUint8Array;
  params: DisableAttesterParams;
};

export type DisableAttesterInstructionDataArgs = {
  params: DisableAttesterParamsArgs;
};

export function getDisableAttesterInstructionDataEncoder(): Encoder<DisableAttesterInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['params', getDisableAttesterParamsEncoder()],
    ]),
    (value) => ({ ...value, discriminator: DISABLE_ATTESTER_DISCRIMINATOR })
  );
}

export function getDisableAttesterInstructionDataDecoder(): Decoder<DisableAttesterInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['params', getDisableAttesterParamsDecoder()],
  ]);
}

export function getDisableAttesterInstructionDataCodec(): Codec<
  DisableAttesterInstructionDataArgs,
  DisableAttesterInstructionData
> {
  return combineCodec(
    getDisableAttesterInstructionDataEncoder(),
    getDisableAttesterInstructionDataDecoder()
  );
}

export type DisableAttesterAsyncInput<
  TAccountPayer extends string = string,
  TAccountAttesterManager extends string = string,
  TAccountMessageTransmitter extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  payer: TransactionSigner<TAccountPayer>;
  attesterManager: TransactionSigner<TAccountAttesterManager>;
  messageTransmitter: Address<TAccountMessageTransmitter>;
  systemProgram?: Address<TAccountSystemProgram>;
  eventAuthority?: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  params: DisableAttesterInstructionDataArgs['params'];
};

export async function getDisableAttesterInstructionAsync<
  TAccountPayer extends string,
  TAccountAttesterManager extends string,
  TAccountMessageTransmitter extends string,
  TAccountSystemProgram extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends
    Address = typeof MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS,
>(
  input: DisableAttesterAsyncInput<
    TAccountPayer,
    TAccountAttesterManager,
    TAccountMessageTransmitter,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  DisableAttesterInstruction<
    TProgramAddress,
    TAccountPayer,
    TAccountAttesterManager,
    TAccountMessageTransmitter,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    payer: { value: input.payer ?? null, isWritable: true },
    attesterManager: {
      value: input.attesterManager ?? null,
      isWritable: false,
    },
    messageTransmitter: {
      value: input.messageTransmitter ?? null,
      isWritable: true,
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
      getAccountMeta(accounts.attesterManager),
      getAccountMeta(accounts.messageTransmitter),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getDisableAttesterInstructionDataEncoder().encode(
      args as DisableAttesterInstructionDataArgs
    ),
  } as DisableAttesterInstruction<
    TProgramAddress,
    TAccountPayer,
    TAccountAttesterManager,
    TAccountMessageTransmitter,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type DisableAttesterInput<
  TAccountPayer extends string = string,
  TAccountAttesterManager extends string = string,
  TAccountMessageTransmitter extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  payer: TransactionSigner<TAccountPayer>;
  attesterManager: TransactionSigner<TAccountAttesterManager>;
  messageTransmitter: Address<TAccountMessageTransmitter>;
  systemProgram?: Address<TAccountSystemProgram>;
  eventAuthority: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  params: DisableAttesterInstructionDataArgs['params'];
};

export function getDisableAttesterInstruction<
  TAccountPayer extends string,
  TAccountAttesterManager extends string,
  TAccountMessageTransmitter extends string,
  TAccountSystemProgram extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends
    Address = typeof MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS,
>(
  input: DisableAttesterInput<
    TAccountPayer,
    TAccountAttesterManager,
    TAccountMessageTransmitter,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): DisableAttesterInstruction<
  TProgramAddress,
  TAccountPayer,
  TAccountAttesterManager,
  TAccountMessageTransmitter,
  TAccountSystemProgram,
  TAccountEventAuthority,
  TAccountProgram
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    payer: { value: input.payer ?? null, isWritable: true },
    attesterManager: {
      value: input.attesterManager ?? null,
      isWritable: false,
    },
    messageTransmitter: {
      value: input.messageTransmitter ?? null,
      isWritable: true,
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
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.attesterManager),
      getAccountMeta(accounts.messageTransmitter),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getDisableAttesterInstructionDataEncoder().encode(
      args as DisableAttesterInstructionDataArgs
    ),
  } as DisableAttesterInstruction<
    TProgramAddress,
    TAccountPayer,
    TAccountAttesterManager,
    TAccountMessageTransmitter,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type ParsedDisableAttesterInstruction<
  TProgram extends string = typeof MESSAGE_TRANSMITTER_V2_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    payer: TAccountMetas[0];
    attesterManager: TAccountMetas[1];
    messageTransmitter: TAccountMetas[2];
    systemProgram: TAccountMetas[3];
    eventAuthority: TAccountMetas[4];
    program: TAccountMetas[5];
  };
  data: DisableAttesterInstructionData;
};

export function parseDisableAttesterInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedDisableAttesterInstruction<TProgram, TAccountMetas> {
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
      payer: getNextAccount(),
      attesterManager: getNextAccount(),
      messageTransmitter: getNextAccount(),
      systemProgram: getNextAccount(),
      eventAuthority: getNextAccount(),
      program: getNextAccount(),
    },
    data: getDisableAttesterInstructionDataDecoder().decode(instruction.data),
  };
}
