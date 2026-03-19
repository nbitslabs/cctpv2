import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { findBlockchain } from "@/hooks/bridgeKit"
import { RequiredExecuteTransferParams } from "@/hooks/useBridgeKitParams"
import { useFeeEstimatesV2 } from "@/hooks/useFeeEstimatesV2"
import { cn, formatNumber, getChainImageUrl } from "@/lib/utils"
import { ChevronDown, DollarSign, Loader, Zap } from "lucide-react"
import Image from "next/image"
import { useMemo } from "react"
import { TooltipWrapNumber } from "./TooltipWrap"
import { Skeleton } from "./ui/skeleton"

const format3Decimal = (value: number) =>
  formatNumber(value, { maximumFractionDigits: 3, minimumFractionDigits: 3 })

type FeeEstimatesV2Result = NonNullable<
  ReturnType<typeof useFeeEstimatesV2>["data"]
>

export function FeeEstimates({
  showSource: _showSource,
  ...params
}: RequiredExecuteTransferParams & { showSource: boolean }) {
  const { data, isLoading, error } = useFeeEstimatesV2(params)

  const totalUsd = useMemo(() => {
    if (!data) return null
    const feeUsd =
      data.fees?.reduce((sum, fee) => sum + (Number(fee.amount) ?? 0), 0) ?? 0
    const gasUsd =
      data.gasFees?.reduce((sum, fee) => sum + (fee.usdFee ?? 0), 0) ?? 0
    return feeUsd + gasUsd
  }, [data])

  return (
    <Collapsible>
      <Card className="bg-foreground/5 border-dashed shadow-none">
        <CardHeader className="pt-5 pb-1">
          <CardTitle className="flex items-center justify-between font-serif text-sm font-semibold tracking-wide">
            Estimated Network Fees
            <CollapsibleTrigger className="inline-flex cursor-pointer items-center gap-1">
              <span className="text-foreground shrink-0 font-normal">
                {isLoading ? (
                  <Loader className="size-4 animate-spin" />
                ) : typeof totalUsd === "number" ? (
                  `≈ ${format3Decimal(totalUsd)} USDC`
                ) : (
                  "—"
                )}
              </span>
              <ChevronDown className="size-4 transition-transform data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
          </CardTitle>
          <CardDescription className="text-xs text-balance">
            Fees are estimates based on current gas prices and may change before
            confirmation.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <CollapsibleContent>
            {isLoading ? (
              <div className="mt-2 grid grid-cols-3 gap-3">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </div>
            ) : error ? (
              <div className="text-destructive bg-destructive/10 mt-2 rounded p-3 text-sm">
                {error.message || "Failed to load fee estimates"}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Fees Section */}
                {data?.fees && data.fees.length > 0 && (
                  <div
                    className={cn(
                      data.fees.length === 1 && "flex justify-between"
                    )}
                  >
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                      <DollarSign className="size-4 text-green-600" />
                      Service Fees (may include CCTP relayer fees, etc.)
                    </h3>
                    <div className="space-y-2">
                      {data.fees.length > 1 ? (
                        data.fees.map((fee) => (
                          <FeeItem key={fee.type} fee={fee} />
                        ))
                      ) : (
                        <span className="text-muted-foreground text-xs">
                          {data.fees[0].amount} {data.fees[0].token}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Gas Fees Section */}
                {data?.gasFees && data.gasFees.length > 0 && (
                  <div className="border-foreground/10 border-t pt-6">
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                      <Zap className="size-4 text-amber-600" />
                      Gas Fees
                    </h3>
                    <ul className="grid grid-cols-3 gap-3">
                      {data.gasFees.map((fee, i) => (
                        <GasFeeItem key={i} gasFee={fee} />
                      ))}
                    </ul>
                  </div>
                )}

                {!data?.fees && !data?.gasFees && (
                  <div className="text-muted-foreground py-4 text-center text-sm">
                    No fee estimates available
                  </div>
                )}
              </div>
            )}
          </CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  )
}

function FeeItem({ fee }: { fee: FeeEstimatesV2Result["fees"][number] }) {
  return (
    <div className="bg-foreground/30 border-border/50 rounded-lg border p-3">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium capitalize">{fee.type}</p>
          <p className="text-muted-foreground text-xs">{fee.token}</p>
        </div>
        <Badge variant="outline" className="shrink-0">
          {fee.amount ?? "—"}
        </Badge>
      </div>
    </div>
  )
}

function GasFeeItem({
  gasFee,
}: {
  gasFee: FeeEstimatesV2Result["gasFees"][number]
}) {
  const blockchain = findBlockchain(gasFee.blockchain)

  return (
    <li className="bg-muted mb-3 flex flex-col items-center gap-2 rounded-lg border p-3">
      {blockchain && (
        <Image
          src={getChainImageUrl(blockchain.chain)}
          alt={blockchain.name}
          width={20}
          height={20}
          className="border-border/40 size-5 rounded-full border"
        />
      )}
      <p className="text-muted-foreground flex-1 text-xs">
        {gasFee.name} transaction on{" "}
        <span className="text-foreground font-medium">
          {blockchain?.name || gasFee.blockchain}
        </span>
      </p>
      {gasFee.fees && (
        <div className="space-y-1 text-xs">
          <TooltipWrapNumber amount={Number(gasFee.fees.fee)} /> {gasFee.token}{" "}
          (
          {gasFee.usdFee < 0.01
            ? "< $0.01"
            : "~ $".concat(format3Decimal(gasFee.usdFee))}
          )
        </div>
      )}
    </li>
  )
}
