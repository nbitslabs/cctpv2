"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CctpTransferType } from "@/lib/cctp/networks";

export function TransferTypeSelector({
  value,
  onChange,
}: {
  value: CctpTransferType;
  onChange: (value: CctpTransferType) => void;
}) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as CctpTransferType)}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={CctpTransferType.Fast}>🚀 V2 Fast</TabsTrigger>
        <TabsTrigger value={CctpTransferType.Standard}>
          🛡️ V1 Standard
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
