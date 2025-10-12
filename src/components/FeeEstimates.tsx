import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type CctpNetworkAdapterId,
  findNetworkAdapter,
} from "@/lib/cctp/networks"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { formatNumber } from "@/lib/utils"
import { useFeeEstimates } from "@/hooks/useFeeEstimates"
import Image from "next/image"
import { ChevronDown, Loader } from "lucide-react"

const format3Decimal = (value: number) =>
  formatNumber(value, { maximumFractionDigits: 3, minimumFractionDigits: 3 })

export function FeeEstimates({
  source,
  destination,
  showSource,
}: {
  source?: CctpNetworkAdapterId
  destination?: CctpNetworkAdapterId
  showSource: boolean
}) {
  const {
    source: sourceFee,
    destination: destinationFee,
    totalUsd,
    isLoading,
  } = useFeeEstimates({
    sourceChainId: source,
    destinationChainId: destination,
    includeSource: showSource,
    includeDestination: Boolean(destination),
  })

  if (!showSource && !destination) {
    return null
  }

  const renderSecondary = (fee?: { usdValue?: number }) => {
    if (!fee) {
      return "Estimation unavailable"
    }
    if (typeof fee.usdValue === "number") {
      return `≈ ${format3Decimal(fee.usdValue)} USDC`
    }
    return "USDC conversion unavailable"
  }

  return (
    <Collapsible>
      <Card className="bg-foreground/5 border-dashed shadow-none">
        <CardHeader className="pt-5 pb-1">
          <CardTitle className="text-sm font-semibold font-serif tracking-wide flex justify-between items-center">
            Estimated Network Fees
            <CollapsibleTrigger className="inline-flex items-center gap-1 cursor-pointer">
              <span className="font-normal text-foreground shrink-0">
                {isLoading ? (
                  <Loader className="animate-spin size-4" />
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
        <CardContent className="space-y-2 p-5 pt-0">
          <CollapsibleContent>
            {isLoading ? (
              <div className="space-y-1">
                <div className="h-10 w-full rounded-md bg-muted/50 animate-pulse" />
                <div className="h-10 w-full rounded-md bg-muted/50 animate-pulse" />
              </div>
            ) : (
              <div className="space-y-1">
                {showSource && source && (
                  <FeeRow
                    adapterId={source}
                    label="Source chain"
                    value={sourceFee?.nativeFormatted ?? "—"}
                    secondary={renderSecondary(sourceFee)}
                  />
                )}
                {destination && (
                  <FeeRow
                    adapterId={destination}
                    label="Destination chain"
                    value={destinationFee?.nativeFormatted ?? "—"}
                    secondary={renderSecondary(destinationFee)}
                  />
                )}
              </div>
            )}
          </CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  )
}

function FeeRow({
  adapterId,
  label,
  value,
  secondary,
}: {
  adapterId: CctpNetworkAdapterId
  label: string
  value: string
  secondary?: string
}) {
  const adapter = findNetworkAdapter(adapterId)
  if (!adapter) return null
  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <div className="flex items-center gap-2">
        <Image
          src={adapter.logoUrl}
          alt={adapter.name}
          className="size-7 rounded-full border border-border/40"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium leading-none">{label}</span>
          <span className="text-xs text-muted-foreground">{adapter.name}</span>
        </div>
      </div>
      <div className="text-right text-sm">
        <div className="font-medium">{value}</div>
        {secondary && (
          <div className="text-xs text-muted-foreground">{secondary}</div>
        )}
      </div>
    </div>
  )
}
