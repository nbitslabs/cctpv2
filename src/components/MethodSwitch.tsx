import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MethodSwitch({
  method,
  setMethod,
}: {
  method: "mintOnly" | "transfer";
  setMethod: (method: "mintOnly" | "transfer") => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-2">
      <div>
        <Label>Transfer Method</Label>
        <p className="text-sm text-muted-foreground">
          {method === "mintOnly"
            ? "Provides a burn transaction hash to mint on the destination chain"
            : "Transfer and mint from the origin to the destination"}
        </p>
      </div>
      <Tabs
        value={method}
        onValueChange={(v) => setMethod(v as "mintOnly" | "transfer")}
      >
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value={"mintOnly"}>Mint Only</TabsTrigger>
          <TabsTrigger value={"transfer"}>Transfer</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
