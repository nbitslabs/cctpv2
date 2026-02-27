"use client"
import { alchemySolanaRpcUrl } from "@/lib/constants"
import {
  createSolanaAdapterFromProvider,
  CreateSolanaAdapterFromProviderParams,
} from "@circle-fin/adapter-solana"
import {
  createViemAdapterFromProvider,
  CreateViemAdapterFromProviderParams,
} from "@circle-fin/adapter-viem-v2"
import { Blockchain, BridgeKit } from "@circle-fin/bridge-kit"
import type { Provider as SolanaProvider } from "@reown/appkit-adapter-solana/react"
import { Connection } from "@solana/web3.js"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useAccount } from "wagmi"

export const cctpBridgeKit = new BridgeKit()

export function useBridgeKitEvmAdapter() {
  const { connector } = useAccount()
  return useQuery({
    queryKey: ["evmAdapter"],
    queryFn: async () => {
      const evmProvider = await connector?.getProvider()
      return createViemAdapterFromProvider({
        provider:
          evmProvider as CreateViemAdapterFromProviderParams["provider"],
      })
    },
    enabled: !!connector,
  })
}

declare global {
  interface Window {
    solana?: SolanaProvider
  }
}
export function useBridgeKitSolanaAdapter() {
  return useQuery({
    queryKey: ["solanaAdapter"],
    queryFn: () => {
      return createSolanaAdapterFromProvider({
        provider:
          window.solana as unknown as CreateSolanaAdapterFromProviderParams["provider"],
        connection: new Connection(alchemySolanaRpcUrl, {
          commitment: "confirmed",
        }),
      })
    },
    enabled: window?.solana !== undefined,
  })
}

export function useBridgeKitAdapterByBlockchainId(
  blockchainId: Blockchain | undefined
) {
  const { data: evmAdapter } = useBridgeKitEvmAdapter()
  const { data: solanaAdapter } = useBridgeKitSolanaAdapter()
  const blockchain = findBlockchain(blockchainId)

  return useMemo(() => {
    if (!blockchain) return undefined
    if (blockchain.type === "solana") return solanaAdapter
    return evmAdapter
  }, [blockchain, evmAdapter, solanaAdapter])
}

export function findBlockchain(blockchainId: Blockchain | undefined) {
  const supportedChains = cctpBridgeKit.getSupportedChains({ isTestnet: false })
  return supportedChains.find(({ chain }) => chain === blockchainId)
}
