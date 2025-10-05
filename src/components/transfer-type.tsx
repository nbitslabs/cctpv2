"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CctpV2TransferType } from "@/lib/cctp/networks"

export function TransferTypeSelector({
  value,
  onChange,
}: {
  value: CctpV2TransferType
  onChange: (value: CctpV2TransferType) => void
}) {
  return (
    <Tabs
      value={value}
      onValueChange={(v) => onChange(v as CctpV2TransferType)}
    >
      <TabsList className="grid w-fit grid-cols-2">
        <TabsTrigger value={CctpV2TransferType.Fast}>🚀 Fast</TabsTrigger>
        <TabsTrigger value={CctpV2TransferType.Standard} disabled>
          🛡️ Standard
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
