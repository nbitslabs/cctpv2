"use client"

import { SolanaAdapter } from "@circle-fin/adapter-solana"
import { ViemAdapter } from "@circle-fin/adapter-viem-v2"
import { Blockchain, BridgeParams, TransferSpeed } from "@circle-fin/bridge-kit"
import type { Provider as SolanaProvider } from "@reown/appkit-adapter-solana/react"
import { useMemo } from "react"
import {
  findBlockchain,
  useBridgeKitEvmAdapter,
  useBridgeKitSolanaAdapter,
} from "./bridgeKit"

export type RequiredExecuteTransferParams = {
  sourceChainId: Blockchain
  destinationChainId?: Blockchain
  mintRecipient?: string
  isSendingToSelf: boolean
  amount?: string
  transferType?: TransferSpeed
  useForwarder: boolean
}

declare global {
  interface Window {
    solana?: SolanaProvider
  }
}

export function useBridgeKitParams(params: RequiredExecuteTransferParams) {
  const {
    sourceChainId,
    destinationChainId,
    mintRecipient,
    amount,
    transferType,
    useForwarder,
  } = params
  const { data: evmAdapter } = useBridgeKitEvmAdapter()
  const { data: solanaAdapter } = useBridgeKitSolanaAdapter()

  const bridgeParams = useMemo(() => {
    const sourceNetwork = findBlockchain(sourceChainId)
    if (!sourceNetwork) return null

    const destNetwork = findBlockchain(destinationChainId)
    if (!destNetwork) return null
    if (!evmAdapter) return null

    let fromAd: ViemAdapter | SolanaAdapter = evmAdapter
    if (sourceNetwork.type === "solana") {
      if (!solanaAdapter) return null
      fromAd = solanaAdapter
    }
    let toAd: ViemAdapter | SolanaAdapter = evmAdapter
    if (destNetwork.type === "solana") {
      if (!solanaAdapter) return null
      toAd = solanaAdapter
    }

    return {
      from: { adapter: fromAd, chain: sourceNetwork },
      to: {
        adapter: toAd,
        chain: destNetwork,
        recipientAddress: mintRecipient,
        useForwarder,
      },
      amount: amount!,
      config: { transferSpeed: transferType },
    } satisfies BridgeParams
  }, [
    amount,
    destinationChainId,
    evmAdapter,
    mintRecipient,
    solanaAdapter,
    sourceChainId,
    transferType,
    useForwarder,
  ])
  return bridgeParams
}
