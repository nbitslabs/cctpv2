import type { Address, Signature, TransactionSigner } from "@solana/kit"
import type { Address as EvmAddress } from "viem"

export enum CctpV2TransferType {
  Standard = "standard",
  Fast = "fast",
}

type CctpNetworkVersion = { support: boolean }

export type CctpFunctionOpts = {
  version: "v1" | "v2"
  solanaSigner?: TransactionSigner
}

export interface CctpNetworkAdapter {
  id: number | string
  name: string
  domain: number
  type: "evm" | "solana"
  logoUrl: string
  nativeCurrency: {
    symbol: string
    decimals: number
    name: string
  }
  explorer?: { name: string; url: string }
  usdcAddress: string

  v1: CctpNetworkVersion
  v2: CctpNetworkVersion

  readNativeBalance: (
    address: string
  ) => Promise<{ raw: string; formatted: number }>
  readUsdcBalance: (
    address: string
  ) => Promise<{ raw: string; formatted: number }>
  writeTokenMessagerDepositForBurn: (
    params: {
      address: string
      amount: number
      destination: CctpNetworkAdapter
      mintRecipient: string
      maxFee?: bigint
      finalityThreshold?: number
      transferType?: CctpV2TransferType
    },
    cctpOpts?: CctpFunctionOpts
  ) => Promise<string>
  simulateMessageTransmitterReceiveMessage: (
    message: string,
    attestation: string,
    cctpOpts?: CctpFunctionOpts
  ) => Promise<boolean>
  writeMessageTransmitterReceiveMessage: (
    message: EvmAddress,
    attestation: string,
    source: CctpNetworkAdapter,
    cctpOpts?: CctpFunctionOpts
  ) => Promise<string>

  hooks?: {
    solanaClaimEventAccount: (
      params: {
        sentEventAccount: Address
        message: string
        attestation: string
      },
      cctpOpts: CctpFunctionOpts
    ) => Promise<Signature>
  }
}

export type CctpNetworkAdapterId = CctpNetworkAdapter["id"]
