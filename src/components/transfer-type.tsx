"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CctpV2TransferType } from "@/lib/cctp/networks";

export function TransferTypeSelector({
  value,
  onChange,
}: {
  value: CctpV2TransferType;
  onChange: (value: CctpV2TransferType) => void;
}) {
  return (
    <Tabs
      value={value}
      onValueChange={(v) => onChange(v as CctpV2TransferType)}
    >
      <TabsList className="grid w-fit grid-cols-2">
        <TabsTrigger value={CctpV2TransferType.Fast}>🚀 V2 Fast</TabsTrigger>
        <TabsTrigger value={CctpV2TransferType.Standard}>
          🛡️ V1 Standard
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
