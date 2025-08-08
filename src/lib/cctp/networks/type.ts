import type { Address, Signature, TransactionSigner } from "gill";
import type { Address as EvmAddress } from "viem";

type CctpNetworkVersion = { support: boolean };

export type CctpFunctionOpts = {
  solanaSigner?: TransactionSigner;
} & (
  | {
      version: "v1";
      fromAddress: string;
    }
  | {
      version: "v2";
    }
);

export interface CctpNetworkAdapter {
  id: number | string;
  name: string;
  domain: number;
  type: "evm" | "solana";
  nativeCurrency: {
    symbol: string;
    decimals: number;
    name: string;
  };
  explorer?: { name: string; url: string };
  usdcAddress: string;

  v1: CctpNetworkVersion;
  v2: CctpNetworkVersion;

  readNativeBalance: (
    address: string
  ) => Promise<{ raw: string; formatted: number }>;
  readUsdcBalance: (
    address: string
  ) => Promise<{ raw: string; formatted: number }>;
  writeTokenMessagerDepositForBurn: (
    params: {
      address: string;
      amount: number;
      destination: CctpNetworkAdapter;
      mintRecipient: string;
      maxFee?: bigint;
      finalityThreshold?: number;
    },
    cctpOpts?: CctpFunctionOpts
  ) => Promise<string>;
  simulateMessageTransmitterReceiveMessage: (
    message: string,
    attestation: string,
    cctpOpts?: CctpFunctionOpts
  ) => Promise<boolean>;
  writeMessageTransmitterReceiveMessage: (
    message: EvmAddress,
    attestation: string,
    cctpOpts?: CctpFunctionOpts
  ) => Promise<string>;

  hooks?: {
    solanaClaimEventAccount: (
      params: {
        sentEventAccount: Address;
        message: string;
        attestation: string;
      },
      cctpOpts: CctpFunctionOpts
    ) => Promise<Signature>;
  };
}

export type CctpNetworkAdapterId = CctpNetworkAdapter["id"];
