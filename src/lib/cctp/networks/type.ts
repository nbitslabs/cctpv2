import { BridgeChainIdentifier } from "@circle-fin/bridge-kit"
import type { Address, Signature, TransactionSigner } from "@solana/kit"
import type { StaticImageData } from "next/image"
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

/**
 * @deprecated Use `Blockchain` from `@circle-fin/bridge-kit` instead.
 * The self-made adapters have been replaced by the official Circle Finance adapter implementations.
 */
export interface CctpNetworkAdapter {
  id: number | string
  name: string
  bridgeChainKey: BridgeChainIdentifier
  domain: number
  type: "evm" | "solana"
  logoUrl: StaticImageData
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
    message: EvmAddress,
    attestation: string,
    source: CctpNetworkAdapter,
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

/**
 * @deprecated Use `Blockchain` from `@circle-fin/bridge-kit` instead.
 * The self-made adapter IDs have been replaced by the official Circle Finance adapter implementations.
 */
export type CctpNetworkAdapterId = CctpNetworkAdapter["id"]
