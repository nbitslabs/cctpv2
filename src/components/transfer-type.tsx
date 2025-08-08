"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CctpFunctionOpts } from "@/lib/cctp/networks";

export function TransferTypeSelector({
  value,
  onChange,
}: {
  value: CctpFunctionOpts["version"];
  onChange: (value: CctpFunctionOpts["version"]) => void;
}) {
  return (
    <Tabs
      value={value}
      onValueChange={(v) => onChange(v as CctpFunctionOpts["version"])}
    >
      <TabsList className="grid w-fit grid-cols-2">
        <TabsTrigger value={"v1"}>🚀 Fast</TabsTrigger>
        <TabsTrigger value={"v2"}>🛡️ Standard</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
