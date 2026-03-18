"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransferSpeed } from "@circle-fin/bridge-kit"

export function TransferTypeSelector({
  value,
  onChange,
}: {
  value: TransferSpeed
  onChange: (value: TransferSpeed) => void
}) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as TransferSpeed)}>
      <TabsList className="grid w-fit grid-cols-2">
        <TabsTrigger value={TransferSpeed.FAST}>🚀 Fast</TabsTrigger>
        <TabsTrigger value={TransferSpeed.SLOW}>🛡️ Standard</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
