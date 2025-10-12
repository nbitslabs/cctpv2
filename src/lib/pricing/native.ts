import axios from "axios"

const priceCache = new Map<string, { price: number; fetchedAt: number }>()
const CACHE_TTL = 60 * 1000 // 1 minute

const coingeckoIdBySymbol: Record<string, string> = {
  ETH: "ethereum",
  AVAX: "avalanche-2",
  OP: "optimism",
  ARB: "arbitrum",
  POL: "matic-network",
  SEI: "sei-network",
  SOL: "solana",
  XDC: "xdce-crowd-sale",
  HYPE: "hyperliquid",
  INK: "ink",
  PLUME: "plume",
  WLD: "worldcoin",
  S: "sonic-3",
}

function getPriceCacheKey(id: string) {
  return `coingecko:${id}`
}

export async function getNativeTokenUsdPrice(symbol?: string) {
  if (!symbol) return undefined

  const coingeckoId = coingeckoIdBySymbol[symbol.toUpperCase()]
  if (!coingeckoId) return undefined

  const cacheKey = getPriceCacheKey(coingeckoId)
  const cached = priceCache.get(cacheKey)
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) return cached.price

  const url = `https://coins.llama.fi/prices/current/${cacheKey}`
  const response = await axios.get<{
    coins: Record<string, { price: number }>
  }>(url)
  const price = response.data?.coins?.[cacheKey]?.price
  if (typeof price !== "number") return undefined

  priceCache.set(cacheKey, { price, fetchedAt: Date.now() })
  return price
}
