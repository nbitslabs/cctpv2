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
import { RequiredExecuteTransferParams } from "@/hooks/useCrossChainTransfer"
import { useFeeEstimatesV2 } from "@/hooks/useFeeEstimatesV2"
import { formatNumber, getChainImageUrl } from "@/lib/utils"
import { Blockchain } from "@circle-fin/bridge-kit"
import { ChevronDown, Loader } from "lucide-react"
import Image from "next/image"

const format3Decimal = (value: number) =>
  formatNumber(value, { maximumFractionDigits: 3, minimumFractionDigits: 3 })

export function FeeEstimates({
  showSource,
  ...params
}: RequiredExecuteTransferParams & { showSource: boolean }) {
  const { data, isLoading } = useFeeEstimatesV2(params)
  const totalUsd = "0"

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
        <CardContent className="space-y-2 p-5 pt-0">
          <CollapsibleContent>
            {isLoading ? (
              <div className="space-y-1">
                <div className="bg-foreground/10 h-10 w-full animate-pulse rounded-md" />
                <div className="bg-foreground/10 h-10 w-full animate-pulse rounded-md" />
              </div>
            ) : (
              <div className="space-y-1">
                {/* {showSource  && (
                  <FeeRow
                    adapterId={params.sourceChainId}
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
                )} */}

                <br />
                <strong>Fees</strong>
                <ul>
                  {data?.fees.map((fee) => (
                    <li key={fee.type}>
                      Type: {fee.type}
                      <br />
                      Token: {fee.token}
                      <br />
                      Amount: {fee.amount}
                    </li>
                  )) ?? (
                    <li className="text-muted-foreground text-sm">
                      No fee estimates available
                    </li>
                  )}
                </ul>

                <br />
                <strong>Gas Fees</strong>
                <ul>
                  {data?.gasFees.map((fee, i) => (
                    <li key={i}>
                      Blockchain: {fee.blockchain}
                      <br />
                      Fee: {fee.fees?.fee}
                      <br />
                      Gas Price: {fee.fees?.gasPrice}
                      <br />
                      Gas: {fee.fees?.gas}
                      <br />
                      Fee Name: {fee.name}
                      <br />
                      Token: {fee.token}
                    </li>
                  )) ?? (
                    <li className="text-muted-foreground text-sm">
                      No fee estimates available
                    </li>
                  )}
                </ul>
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
  adapterId: Blockchain
  label: string
  value: string
  secondary?: string
}) {
  const blockchain = findBlockchain(adapterId)
  if (!blockchain) return null
  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <div className="flex items-center gap-2">
        <Image
          src={getChainImageUrl(blockchain.chain)}
          alt={blockchain.name}
          className="border-border/40 size-7 rounded-full border"
        />
        <div className="flex flex-col">
          <span className="text-sm leading-none font-medium">{label}</span>
          <span className="text-muted-foreground text-xs">
            {blockchain.name}
          </span>
        </div>
      </div>
      <div className="text-right text-sm">
        <div className="font-medium">{value}</div>
        {secondary && (
          <div className="text-muted-foreground text-xs">{secondary}</div>
        )}
      </div>
    </div>
  )
}
