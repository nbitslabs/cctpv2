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
  type WritableSignerAccount,
} from '@solana/kit';
import { MESSAGE_TRANSMITTER_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';
import {
  getReplaceMessageParamsDecoder,
  getReplaceMessageParamsEncoder,
  type ReplaceMessageParams,
  type ReplaceMessageParamsArgs,
} from '../types';

export const REPLACE_MESSAGE_DISCRIMINATOR = new Uint8Array([
  189, 189, 210, 163, 149, 205, 69, 229,
]);

export function getReplaceMessageDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    REPLACE_MESSAGE_DISCRIMINATOR
  );
}

export type ReplaceMessageInstruction<
  TProgram extends string = typeof MESSAGE_TRANSMITTER_PROGRAM_ADDRESS,
  TAccountEventRentPayer extends string | IAccountMeta<string> = string,
  TAccountSenderAuthorityPda extends string | IAccountMeta<string> = string,
  TAccountMessageTransmitter extends string | IAccountMeta<string> = string,
  TAccountMessageSentEventData extends string | IAccountMeta<string> = string,
  TAccountSenderProgram extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountEventRentPayer extends string
        ? WritableSignerAccount<TAccountEventRentPayer> &
            IAccountSignerMeta<TAccountEventRentPayer>
        : TAccountEventRentPayer,
      TAccountSenderAuthorityPda extends string
        ? ReadonlySignerAccount<TAccountSenderAuthorityPda> &
            IAccountSignerMeta<TAccountSenderAuthorityPda>
        : TAccountSenderAuthorityPda,
      TAccountMessageTransmitter extends string
        ? WritableAccount<TAccountMessageTransmitter>
        : TAccountMessageTransmitter,
      TAccountMessageSentEventData extends string
        ? WritableSignerAccount<TAccountMessageSentEventData> &
            IAccountSignerMeta<TAccountMessageSentEventData>
        : TAccountMessageSentEventData,
      TAccountSenderProgram extends string
        ? ReadonlyAccount<TAccountSenderProgram>
        : TAccountSenderProgram,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts,
    ]
  >;

export type ReplaceMessageInstructionData = {
  discriminator: ReadonlyUint8Array;
  params: ReplaceMessageParams;
};

export type ReplaceMessageInstructionDataArgs = {
  params: ReplaceMessageParamsArgs;
};

export function getReplaceMessageInstructionDataEncoder(): Encoder<ReplaceMessageInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['params', getReplaceMessageParamsEncoder()],
    ]),
    (value) => ({ ...value, discriminator: REPLACE_MESSAGE_DISCRIMINATOR })
  );
}

export function getReplaceMessageInstructionDataDecoder(): Decoder<ReplaceMessageInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['params', getReplaceMessageParamsDecoder()],
  ]);
}

export function getReplaceMessageInstructionDataCodec(): Codec<
  ReplaceMessageInstructionDataArgs,
  ReplaceMessageInstructionData
> {
  return combineCodec(
    getReplaceMessageInstructionDataEncoder(),
    getReplaceMessageInstructionDataDecoder()
  );
}

export type ReplaceMessageInput<
  TAccountEventRentPayer extends string = string,
  TAccountSenderAuthorityPda extends string = string,
  TAccountMessageTransmitter extends string = string,
  TAccountMessageSentEventData extends string = string,
  TAccountSenderProgram extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  eventRentPayer: TransactionSigner<TAccountEventRentPayer>;
  senderAuthorityPda: TransactionSigner<TAccountSenderAuthorityPda>;
  messageTransmitter: Address<TAccountMessageTransmitter>;
  messageSentEventData: TransactionSigner<TAccountMessageSentEventData>;
  senderProgram: Address<TAccountSenderProgram>;
  systemProgram: Address<TAccountSystemProgram>;
  params: ReplaceMessageInstructionDataArgs['params'];
};

export function getReplaceMessageInstruction<
  TAccountEventRentPayer extends string,
  TAccountSenderAuthorityPda extends string,
  TAccountMessageTransmitter extends string,
  TAccountMessageSentEventData extends string,
  TAccountSenderProgram extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof MESSAGE_TRANSMITTER_PROGRAM_ADDRESS,
>(
  input: ReplaceMessageInput<
    TAccountEventRentPayer,
    TAccountSenderAuthorityPda,
    TAccountMessageTransmitter,
    TAccountMessageSentEventData,
    TAccountSenderProgram,
    TAccountSystemProgram
  >,
  config?: { programAddress?: TProgramAddress }
): ReplaceMessageInstruction<
  TProgramAddress,
  TAccountEventRentPayer,
  TAccountSenderAuthorityPda,
  TAccountMessageTransmitter,
  TAccountMessageSentEventData,
  TAccountSenderProgram,
  TAccountSystemProgram
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? MESSAGE_TRANSMITTER_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    eventRentPayer: { value: input.eventRentPayer ?? null, isWritable: true },
    senderAuthorityPda: {
      value: input.senderAuthorityPda ?? null,
      isWritable: false,
    },
    messageTransmitter: {
      value: input.messageTransmitter ?? null,
      isWritable: true,
    },
    messageSentEventData: {
      value: input.messageSentEventData ?? null,
      isWritable: true,
    },
    senderProgram: { value: input.senderProgram ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
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
      getAccountMeta(accounts.eventRentPayer),
      getAccountMeta(accounts.senderAuthorityPda),
      getAccountMeta(accounts.messageTransmitter),
      getAccountMeta(accounts.messageSentEventData),
      getAccountMeta(accounts.senderProgram),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getReplaceMessageInstructionDataEncoder().encode(
      args as ReplaceMessageInstructionDataArgs
    ),
  } as ReplaceMessageInstruction<
    TProgramAddress,
    TAccountEventRentPayer,
    TAccountSenderAuthorityPda,
    TAccountMessageTransmitter,
    TAccountMessageSentEventData,
    TAccountSenderProgram,
    TAccountSystemProgram
  >;

  return instruction;
}

export type ParsedReplaceMessageInstruction<
  TProgram extends string = typeof MESSAGE_TRANSMITTER_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    eventRentPayer: TAccountMetas[0];
    senderAuthorityPda: TAccountMetas[1];
    messageTransmitter: TAccountMetas[2];
    messageSentEventData: TAccountMetas[3];
    senderProgram: TAccountMetas[4];
    systemProgram: TAccountMetas[5];
  };
  data: ReplaceMessageInstructionData;
};

export function parseReplaceMessageInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedReplaceMessageInstruction<TProgram, TAccountMetas> {
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
      eventRentPayer: getNextAccount(),
      senderAuthorityPda: getNextAccount(),
      messageTransmitter: getNextAccount(),
      messageSentEventData: getNextAccount(),
      senderProgram: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getReplaceMessageInstructionDataDecoder().decode(instruction.data),
  };
}
