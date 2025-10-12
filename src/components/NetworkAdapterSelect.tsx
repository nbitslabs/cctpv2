"use client"

import { useNativeBalance, useUsdcBalance } from "@/hooks/useBalance"
import {
  findNetworkAdapter,
  networkAdapters,
  type CctpNetworkAdapterId,
} from "@/lib/cctp/networks"
import { cn } from "@/lib/utils"
import { ChainNamespace, solana } from "@reown/appkit/networks"
import { Loader, RotateCw } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
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
  chainId: CctpNetworkAdapterId | undefined
  setChainId: (chain: CctpNetworkAdapterId) => void
  address: string
  setAddress?: (address: string) => void
  label: string
  exceptAdapterIds?: CctpNetworkAdapterId[]
  addressReadonly?: boolean
  hideAddress?: boolean
  children?: React.ReactNode
}

export function useNetworkAdapterBalance(
  chainId: CctpNetworkAdapterId | undefined,
  address: string | undefined
) {
  const usdcBalance = useUsdcBalance(chainId, address)
  const nativeBalance = useNativeBalance(chainId, address)
  const networkAdapter = findNetworkAdapter(chainId)
  const nativeCurrency = networkAdapter?.nativeCurrency

  return {
    networkAdapter,
    usdcBalance,
    nativeBalance,
    nativeCurrency,
  }
}

export default function NetworkAdapterSelect({
  chainId: chain,
  setChainId,
  address,
  setAddress,
  label,
  exceptAdapterIds,
  addressReadonly,
  hideAddress,
  children,
}: NetworkAdapterSelectProps) {
  const { usdcBalance, nativeBalance, nativeCurrency } =
    useNetworkAdapterBalance(chain, address)
  const [isPending, setIsPending] = useState(false)
  const namespace: ChainNamespace = chain === solana.id ? "solana" : "eip155"

  return (
    <div className="space-y-2">
      <Label className="font-serif">{label} Chain</Label>
      <Select value={chain?.toString()} onValueChange={setChainId}>
        <SelectTrigger>
          <SelectValue placeholder="Select destination chain" />
        </SelectTrigger>
        <SelectContent>
          {networkAdapters
            .filter((chain) => !exceptAdapterIds?.includes(chain.id))
            .toSorted((a, b) => a.name.localeCompare(b.name))
            .map((chain) => (
              <SelectItem key={chain.id} value={String(chain.id)}>
                <div className="flex items-center gap-2">
                  <Image
                    src={chain.logoUrl}
                    alt={chain.name}
                    className="size-6 rounded-full"
                    width={24}
                    height={24}
                  />
                  {chain.name}
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
              <p className="text-sm text-muted-foreground">
                {usdcBalance.isLoading ? (
                  <Loader className="animate-spin inline-block size-3" />
                ) : (
                  <TooltipWrapNumber
                    amount={usdcBalance.data?.formatted ?? 0}
                    format={{ maximumFractionDigits: 2 }}
                  />
                )}{" "}
                USDC •{" "}
                {nativeBalance.isLoading ? (
                  <Loader className="animate-spin inline-block size-3" />
                ) : (
                  <TooltipWrapNumber
                    amount={nativeBalance.data?.formatted ?? 0}
                    format={{ maximumFractionDigits: 4 }}
                  />
                )}{" "}
                {nativeCurrency?.symbol}
                {!nativeBalance.isLoading && (
                  <Button
                    variant="ghost"
                    onClick={async () => {
                      setIsPending(true)
                      await Promise.all([
                        usdcBalance.refetch(),
                        nativeBalance.refetch(),
                      ])
                      setIsPending(false)
                    }}
                    className={cn(
                      "!size-4.5 rounded-sm !p-0.5 ml-1 translate-y-px",
                      isPending && "animate-spin"
                    )}
                  >
                    <RotateCw className="inline-block !size-3" />
                  </Button>
                )}
              </p>
              {!nativeBalance.isLoading && !nativeBalance.data?.formatted && (
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
