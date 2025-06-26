type TxHash = string;

export enum CctpV2TransferType {
  Standard = "standard",
  Fast = "fast",
}

type CctpNetworkVersion = { support: boolean };

export type CctpFunctionOpts = {
  version: "v1" | "v2";
};

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
  readAllowanceForTokenMessager: (
    address: string,
    cctpOpts?: CctpFunctionOpts
  ) => Promise<{
    raw: string;
    formatted: number;
  }>;
  writeApproveForTokenMessager: (
    amount: number,
    cctpOpts?: CctpFunctionOpts
  ) => Promise<TxHash>;
  writeTokenMessagerDepositForBurn: (
    amount: number,
    destinationDomain: CctpNetworkAdapter["domain"],
    options?: {
      mintRecipient?: string;
      maxFee?: bigint;
      finalityThreshold?: number;
      transferType?: CctpV2TransferType;
    },
    cctpOpts?: CctpFunctionOpts
  ) => Promise<TxHash>;
  simulateMessageTransmitterReceiveMessage: (
    message: string,
    attestation: string,
    cctpOpts?: CctpFunctionOpts
  ) => Promise<boolean>;
  writeMessageTransmitterReceiveMessage: (
    message: string,
    attestation: string,
    cctpOpts?: CctpFunctionOpts
  ) => Promise<TxHash>;
  switchNetwork: () => Promise<void>;
}

export type CctpNetworkAdapterId = CctpNetworkAdapter["id"];
