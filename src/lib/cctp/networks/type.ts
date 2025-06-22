type TxHash = string;

export enum CctpTransferType {
  Standard = "standard",
  Fast = "fast",
}

export interface CctpNetworkAdapter {
  id: number | string;
  name: string;
  supportV1: boolean;
  supportV2: boolean;
  domain: number;
  type: "evm";
  nativeCurrency: {
    symbol: string;
    decimals: number;
    name: string;
  };

  usdcAddress: string;
  tokenMessagerAddress: string;
  messageTransmitterAddress: string;

  readNativeBalance: () => Promise<{ raw: string; formatted: number }>;
  readUsdcBalance: () => Promise<{ raw: string; formatted: number }>;
  readAllowanceForTokenMessager: () => Promise<{
    raw: string;
    formatted: number;
  }>;
  writeApproveForTokenMessager: (amount: number) => Promise<TxHash>;
  writeTokenMessagerDepositForBurn: (
    amount: number,
    destinationDomain: CctpNetworkAdapter["domain"],
    options?: {
      mintRecipient?: string;
      maxFee?: bigint;
      finalityThreshold?: number;
      transferType?: CctpTransferType;
    }
  ) => Promise<TxHash>;
  simulateMessageTransmitterReceiveMessage: (
    message: string,
    attestation: string
  ) => Promise<boolean>;
  writeMessageTransmitterReceiveMessage: (
    message: string,
    attestation: string
  ) => Promise<TxHash>;
  switchNetwork: () => Promise<void>;
}

export type CctpNetworkAdapterId = CctpNetworkAdapter["id"];
