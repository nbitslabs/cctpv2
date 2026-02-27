"use client"
import {
  findBlockchain,
  useBridgeKitAdapterByBlockchainId,
} from "@/hooks/bridgeKit"
import { cctpBridgeKit } from "@/hooks/useCrossChainTransfer"
import { USDC_DECIMALS } from "@/lib/cctp/networks/constants"
import { cn, getChainImageUrl } from "@/lib/utils"
import { Blockchain, EVMChainDefinition } from "@circle-fin/bridge-kit"
import { ChainNamespace } from "@reown/appkit/networks"
import { useQuery } from "@tanstack/react-query"
import { Loader, RotateCw } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { formatUnits } from "viem"
import { TooltipWrapNumber } from "./TooltipWrap"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import FiatDepositButton from "./ui2/FiatDepositButton"
import { LifiButton } from "./ui2/LifiWidget"

export interface NetworkAdapterSelectProps {
  chainId: Blockchain | undefined
  setChainId: (chain: Blockchain) => void
  address: string
  setAddress?: (address: string) => void
  label: string
  exceptAdapterIds?: Blockchain[]
  addressReadonly?: boolean
  hideAddress?: boolean
  children?: React.ReactNode
}

export function useNetworkAdapterBalance(
  chainId: Blockchain | undefined,
  address: string | undefined
) {
  const blockchain = findBlockchain(chainId)
  const adapter = useBridgeKitAdapterByBlockchainId(chainId)
  const balance = useQuery({
    queryKey: ["balance", chainId, address],
    queryFn: async () => {
      if (!adapter || !address)
        throw new Error("Adapter or address not available")
      if (!chainId || !blockchain) throw new Error("Chain ID not available")

      const usdcBalancePromise = await adapter
        .prepareAction(
          "usdc.balanceOf",
          { walletAddress: address },
          { chain: chainId }
        )
        .then((a) => a.execute())
      const nativeBalancePromise = adapter.readNativeBalance(
        address,
        blockchain as EVMChainDefinition
      )

      const [usdcRaw, nativeRaw] = await Promise.all([
        usdcBalancePromise,
        nativeBalancePromise,
      ])

      const usdc = Number(formatUnits(BigInt(usdcRaw), USDC_DECIMALS))
      const native = Number(
        formatUnits(nativeRaw, blockchain.nativeCurrency.decimals)
      )

      return { native, usdc }
    },
    enabled: !!adapter && !!address && !!chainId,
  })

  return { blockchain, balance }
}

export default function NetworkAdapterSelect({
  chainId,
  setChainId,
  address,
  setAddress,
  label,
  exceptAdapterIds,
  addressReadonly,
  hideAddress,
  children,
}: NetworkAdapterSelectProps) {
  const { blockchain, balance } = useNetworkAdapterBalance(chainId, address)
  const [isPending, setIsPending] = useState(false)
  const namespace: ChainNamespace =
    chainId === Blockchain.Solana ? "solana" : "eip155"
  const supportedChains = cctpBridgeKit.getSupportedChains({ isTestnet: false })

  return (
    <div className="space-y-2">
      <Label className="font-serif">{label} Chain</Label>
      <Select value={chainId?.toString()} onValueChange={setChainId}>
        <SelectTrigger>
          <SelectValue placeholder="Select destination chain" />
        </SelectTrigger>
        <SelectContent>
          {supportedChains
            .filter(({ chain }) => !exceptAdapterIds?.includes(chain))
            .toSorted((a, b) => a.name.localeCompare(b.name))
            .map(({ chain }) => (
              <SelectItem key={chain} value={String(chain)}>
                <div className="flex items-center gap-2">
                  <Image
                    src={getChainImageUrl(chain)}
                    alt={chain}
                    className="size-6 rounded-full"
                    width={24}
                    height={24}
                  />
                  {chain}
                </div>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      {!hideAddress && (
        <>
          <div>
            <Label className="font-serif">{label} Address</Label>
            <div className="flex items-center gap-2">
              <Input
                value={address}
                onChange={(e) => setAddress?.(e.target.value)}
                placeholder={`Enter address...`}
                readOnly={addressReadonly}
                className={cn(
                  "text-sm",
                  addressReadonly && "bg-primary/5 text-foreground/70"
                )}
              />
              {children}
            </div>
          </div>
          {address && (
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground text-sm">
                {balance.isLoading ? (
                  <Loader className="inline-block size-3 animate-spin" />
                ) : (
                  <TooltipWrapNumber
                    amount={balance.data?.usdc ?? 0}
                    format={{ maximumFractionDigits: 2 }}
                  />
                )}{" "}
                USDC •{" "}
                {balance.isLoading ? (
                  <Loader className="inline-block size-3 animate-spin" />
                ) : (
                  <TooltipWrapNumber
                    amount={(!!balance.data && balance.data.native) || 0}
                    format={{ maximumFractionDigits: 4 }}
                  />
                )}{" "}
                {blockchain?.nativeCurrency.symbol}
                {!balance.isLoading && (
                  <Button
                    variant="ghost"
                    onClick={async () => {
                      setIsPending(true)
                      await balance.refetch()
                      setIsPending(false)
                    }}
                    className={cn(
                      "ml-1 size-4.5! translate-y-px rounded-sm p-0.5!",
                      isPending && "animate-spin"
                    )}
                  >
                    <RotateCw className="inline-block size-3!" />
                  </Button>
                )}
              </p>
              {!balance.isLoading && !balance.data?.native && (
                <>
                  <LifiButton />
                  <FiatDepositButton namespace={namespace}>
                    Fiat
                  </FiatDepositButton>
                </>
              )}
              {/* <TransactionHistory
            transactions={transfers.data}
            isLoading={transfers.isLoading}
            explorerUrl={networkAdapter?.explorer?.url ?? ""}
          /> */}
            </div>
          )}
        </>
      )}
    </div>
  )
}
