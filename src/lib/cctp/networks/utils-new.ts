/**
 * Utility functions for working with blockchain objects from @circle-fin/bridge-kit
 */
import {
  Blockchain,
  ChainDefinition,
  EVMChainDefinition,
} from "@circle-fin/bridge-kit"
import { chainsByDomain } from "@/lib/wagmi/config"

/**
 * Map of Blockchain enum values to their native currency symbols
 * Only includes supported CCTP chains - can be partial
 */
const BLOCKCHAIN_NATIVE_SYMBOLS: Partial<Record<Blockchain, string>> = {
  [Blockchain.Ethereum]: "ETH",
  [Blockchain.Avalanche]: "AVAX",
  [Blockchain.Optimism]: "ETH",
  [Blockchain.Arbitrum]: "ETH",
  [Blockchain.Base]: "ETH",
  [Blockchain.Solana]: "SOL",
  [Blockchain.Polygon]: "MATIC",
  [Blockchain.Unichain]: "ETH",
  [Blockchain.Linea]: "ETH",
  [Blockchain.Codex]: "CDX",
  [Blockchain.Sonic]: "S",
  [Blockchain.World_Chain]: "WLD",
  [Blockchain.Monad]: "MON",
  [Blockchain.Sei]: "SEI",
  [Blockchain.XDC]: "XDC",
  [Blockchain.HyperEVM]: "HYPE",
  [Blockchain.Ink]: "ETH",
  [Blockchain.Plume]: "PLUME",
}

/**
 * Map of Blockchain enum values to CCTP domain numbers
 * Only includes supported CCTP chains - can be partial
 */
const BLOCKCHAIN_TO_DOMAIN: Partial<Record<Blockchain, number>> = {
  [Blockchain.Ethereum]: 0,
  [Blockchain.Avalanche]: 1,
  [Blockchain.Optimism]: 2,
  [Blockchain.Arbitrum]: 3,
  [Blockchain.Base]: 6,
  [Blockchain.Solana]: 5,
  [Blockchain.Polygon]: 7,
  [Blockchain.Unichain]: 10,
  [Blockchain.Linea]: 11,
  [Blockchain.Codex]: 12,
  [Blockchain.Sonic]: 13,
  [Blockchain.World_Chain]: 14,
  [Blockchain.Monad]: 15,
  [Blockchain.Sei]: 16,
  [Blockchain.XDC]: 18,
  [Blockchain.HyperEVM]: 19,
  [Blockchain.Ink]: 21,
  [Blockchain.Plume]: 22,
}

/**
 * Get the native currency symbol for a blockchain
 */
export function getNativeSymbol(
  blockchain: ChainDefinition | undefined
): string {
  if (!blockchain) return ""
  return (
    BLOCKCHAIN_NATIVE_SYMBOLS[blockchain.chain] ||
    blockchain.nativeCurrency.symbol ||
    ""
  )
}

/**
 * Get the explorer URL for a blockchain
 */
export function getExplorerUrl(
  blockchain: ChainDefinition | undefined
): string | null {
  if (!blockchain) return null

  // For EVM chains, try to get from wagmi config
  if (blockchain.type === "evm") {
    const evmChain = blockchain as EVMChainDefinition
    const chainConfig = Object.values(chainsByDomain).find(
      (chain) => chain.id === evmChain.chainId
    )
    if (chainConfig?.blockExplorers?.default?.url) {
      return chainConfig.blockExplorers.default.url
    }
  }

  // For Solana
  if (blockchain.type === "solana") {
    return "https://solscan.io"
  }

  return null
}

/**
 * Get the CCTP domain number for a blockchain
 */
export function getCctpDomain(
  blockchain: ChainDefinition | undefined
): number | null {
  if (!blockchain) return null
  const domain = BLOCKCHAIN_TO_DOMAIN[blockchain.chain]
  return domain === undefined ? null : domain
}
