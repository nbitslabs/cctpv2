import {
  type CctpNetworkAdapter,
  findNetworkAdapter,
} from "@/lib/cctp/networks"
import { getNativeTokenUsdPrice } from "@/lib/pricing/native"
import { formatNumber } from "@/lib/utils"
import { wagmiConfig } from "@/lib/wagmi/config"
import { useQuery } from "@tanstack/react-query"
import { formatUnits } from "viem"
import { estimateFeesPerGas } from "wagmi/actions"

// Sonic 135439
// HyperEVM 138722
// Base 136335
const DEFAULT_EVM_DEPOSIT_GAS_UNITS = 145_000n
// Base 156538
const DEFAULT_EVM_RECEIVE_GAS_UNITS = 200_000n

const SOLANA_LAMPORTS_PER_SOL = 1_000_000_000
const DEFAULT_SOLANA_DEPOSIT_LAMPORTS = 2_000_000n // ~0.002 SOL
const DEFAULT_SOLANA_RECEIVE_LAMPORTS = 1_500_000n // ~0.0015 SOL

type FeeType = "deposit" | "receive"

type FeeEstimate = {
  nativeFormatted: string
  nativeValue: number
  usdValue?: number
  symbol: string
}

type FeeEstimateResult = {
  source?: FeeEstimate
  destination?: FeeEstimate
  totalUsd?: number
  isLoading: boolean
  isError: boolean
}

type Params = {
  sourceChainId?: CctpNetworkAdapter["id"]
  destinationChainId?: CctpNetworkAdapter["id"]
  includeSource?: boolean
  includeDestination?: boolean
}

const formatNative = (value: number, symbol: string) =>
  `${formatNumber(value, { maximumFractionDigits: 6 })} ${symbol}`

async function estimateEvmFee(adapter: CctpNetworkAdapter, type: FeeType) {
  const chainId = Number(adapter.id)
  if (!Number.isFinite(chainId)) {
    return undefined
  }
  const gasUnits =
    type === "deposit"
      ? DEFAULT_EVM_DEPOSIT_GAS_UNITS
      : DEFAULT_EVM_RECEIVE_GAS_UNITS

  const gasPrice = await estimateFeesPerGas(wagmiConfig, { chainId })
  if (!gasPrice) return undefined

  const fee = gasPrice.maxFeePerGas * gasUnits
  const nativeValue = Number(formatUnits(fee, adapter.nativeCurrency.decimals))
  const price = await getNativeTokenUsdPrice(adapter.nativeCurrency.symbol)
  const usdValue = price ? nativeValue * price : undefined

  return {
    nativeFormatted: formatNative(nativeValue, adapter.nativeCurrency.symbol),
    nativeValue,
    usdValue,
    symbol: adapter.nativeCurrency.symbol,
  } satisfies FeeEstimate
}

async function estimateSolanaFee(adapter: CctpNetworkAdapter, type: FeeType) {
  const lamports =
    type === "deposit"
      ? DEFAULT_SOLANA_DEPOSIT_LAMPORTS
      : DEFAULT_SOLANA_RECEIVE_LAMPORTS
  const nativeValue = Number(lamports) / SOLANA_LAMPORTS_PER_SOL
  const price = await getNativeTokenUsdPrice(adapter.nativeCurrency.symbol)
  const usdValue = price ? nativeValue * price : undefined
  return {
    nativeFormatted: formatNative(nativeValue, adapter.nativeCurrency.symbol),
    nativeValue,
    usdValue,
    symbol: adapter.nativeCurrency.symbol,
  } satisfies FeeEstimate
}

async function estimateFee(adapter: CctpNetworkAdapter, type: FeeType) {
  if (adapter.type === "evm") return estimateEvmFee(adapter, type)
  if (adapter.type === "solana") return estimateSolanaFee(adapter, type)
  return undefined
}

export function useFeeEstimates({
  sourceChainId,
  destinationChainId,
  includeSource = true,
  includeDestination = true,
}: Params): FeeEstimateResult {
  const sourceAdapter = includeSource
    ? findNetworkAdapter(sourceChainId)
    : undefined
  const destinationAdapter = includeDestination
    ? findNetworkAdapter(destinationChainId)
    : undefined

  const sourceQuery = useQuery({
    queryKey: ["fee-estimate", sourceAdapter?.id, "deposit"],
    queryFn: () => estimateFee(sourceAdapter!, "deposit"),
    enabled: !!sourceAdapter,
    staleTime: 60_000,
  })

  const destinationQuery = useQuery({
    queryKey: ["fee-estimate", destinationAdapter?.id, "receive"],
    queryFn: () => estimateFee(destinationAdapter!, "receive"),
    enabled: !!destinationAdapter,
    staleTime: 60_000,
  })

  const source = sourceQuery.data
  const destination = destinationQuery.data

  const totalUsd = [source?.usdValue, destination?.usdValue].every(
    (value) => typeof value === "number"
  )
    ? (source?.usdValue ?? 0) + (destination?.usdValue ?? 0)
    : undefined

  return {
    source,
    destination,
    totalUsd,
    isLoading: sourceQuery.isFetching || destinationQuery.isFetching,
    isError: sourceQuery.isError || destinationQuery.isError,
  }
}
