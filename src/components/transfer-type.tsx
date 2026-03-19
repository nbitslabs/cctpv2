"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransferSpeed } from "@circle-fin/bridge-kit"
import { Label } from "./ui/label"

export function TransferTypeSelector({
  value,
  onChange,
}: {
  value: TransferSpeed
  onChange: (value: TransferSpeed) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>Transfer Type</Label>
      <Tabs value={value} onValueChange={(v) => onChange(v as TransferSpeed)}>
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value={TransferSpeed.FAST}>🚀 Fast</TabsTrigger>
          <TabsTrigger value={TransferSpeed.SLOW}>🛡️ Standard</TabsTrigger>
        </TabsList>
      </Tabs>

      <p className="text-muted-foreground text-sm">
        {value === "FAST"
          ? "Completes within ~2m, with ~0.1% of the transfer amount"
          : "Completes within ~20m, free of charge"}
      </p>
    </div>
  )
}
