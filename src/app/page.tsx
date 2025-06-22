"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ProgressSteps } from "@/components/progress-step";
import { TransferLog } from "@/components/transfer-log";
import { Timer } from "@/components/timer";
import { TransferTypeSelector } from "@/components/transfer-type";
import { useCrossChainTransfer } from "@/hooks/use-cross-chain-transfer";
import { formatNumber } from "@/lib/utils";
import { useAppKitAccount } from "@reown/appkit/react";
import { toast } from "sonner";
import { SwitchChainError } from "viem";
import {
  CctpNetworkAdapterId,
  CctpV2TransferType,
  findNetworkAdapter,
  networkAdapters,
} from "@/lib/cctp/networks";
import { useActiveNetwork } from "@/lib/cctp/providers/ActiveNetworkProvider";
import {
  useMyNativeBalance,
  useMyUsdcBalance,
  useNativeBalance,
  useUsdcBalance,
} from "@/hooks/useBalance";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { isConnected } = useAppKitAccount();
  const { currentStep, logs, error, executeTransfer, reset } =
    useCrossChainTransfer();
  const { activeNetwork, setActiveNetwork } = useActiveNetwork();
  const sourceChain = activeNetwork.id;

  const [destChain, setDestChain] = useState<CctpNetworkAdapterId>();
  const [amount, setAmount] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTransferring, setIsTransferring] = useState(false);
  const [showFinalTime, setShowFinalTime] = useState(false);
  const [transferType, setTransferType] = useState<CctpV2TransferType>(
    CctpV2TransferType.Fast
  );
  const myUsdcBalance = useMyUsdcBalance();
  const myNativeBalance = useMyNativeBalance();
  const sourceNativeCurrency = activeNetwork.nativeCurrency;

  const destUsdcBalance = useUsdcBalance(destChain);
  const destNativeBalance = useNativeBalance(destChain);
  const destNativeCurrency = findNetworkAdapter(destChain)?.nativeCurrency;

  const handleStartTransfer = async () => {
    if (!destChain) {
      toast.error("Please select a destination chain");
      return;
    }

    setIsTransferring(true);
    setShowFinalTime(false);
    setElapsedSeconds(0);
    await executeTransfer(destChain, amount, transferType);
    [myUsdcBalance, destUsdcBalance, myNativeBalance, destNativeBalance].map(
      (balance) => balance.refetch()
    );
    setIsTransferring(false);
    setShowFinalTime(true);
  };

  const handleReset = () => {
    reset();
    setIsTransferring(false);
    setShowFinalTime(false);
    setElapsedSeconds(0);
  };

  useEffect(() => {
    if (destChain === sourceChain) setDestChain(undefined);
  }, [sourceChain, showFinalTime]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="items-center">
          <CardTitle className="text-center">
            Cross-Chain USDC Transfer
          </CardTitle>
          {isConnected ? <appkit-account-button /> : <appkit-connect-button />}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Transfer Type</Label>
            <TransferTypeSelector
              value={transferType}
              onChange={setTransferType}
            />
            <p className="text-sm text-muted-foreground">
              {transferType === CctpV2TransferType.Fast
                ? "Faster transfers with lower finality threshold (1000 blocks)"
                : "Standard transfers with higher finality (2000 blocks)"}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Source Chain</Label>
              <Select
                value={String(sourceChain)}
                onValueChange={async (value) => {
                  try {
                    setActiveNetwork(value);
                  } catch (error) {
                    toast.error((error as SwitchChainError).details as string);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source chain" />
                </SelectTrigger>
                <SelectContent>
                  {networkAdapters.map((chain) => (
                    <SelectItem key={chain.id} value={String(chain.id)}>
                      {chain.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                {myUsdcBalance.isLoading ? (
                  <Loader2 className="animate-spin inline-block size-3" />
                ) : (
                  formatNumber(myUsdcBalance.data?.formatted ?? 0)
                )}{" "}
                USDC •{" "}
                {myNativeBalance.isLoading ? (
                  <Loader2 className="animate-spin inline-block size-3" />
                ) : (
                  formatNumber(myNativeBalance.data?.formatted ?? 0, {
                    maximumFractionDigits: 4,
                  })
                )}{" "}
                {sourceNativeCurrency.symbol}
              </p>
              <p className="text-xs text-red-600">
                {[myUsdcBalance.error?.message, myNativeBalance.error?.message]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Destination Chain</Label>
              <Select
                value={String(destChain)}
                onValueChange={(value) => setDestChain(value)}
                disabled={!sourceChain}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination chain" />
                </SelectTrigger>
                <SelectContent>
                  {networkAdapters
                    .filter((chain) => chain.id !== sourceChain)
                    .map((chain) => (
                      <SelectItem key={chain.id} value={String(chain.id)}>
                        {chain.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                {destUsdcBalance.isLoading ? (
                  <Loader2 className="animate-spin inline-block size-3" />
                ) : (
                  formatNumber(destUsdcBalance.data?.formatted ?? 0)
                )}{" "}
                USDC •{" "}
                {destNativeBalance.isLoading ? (
                  <Loader2 className="animate-spin inline-block size-3" />
                ) : (
                  formatNumber(destNativeBalance.data?.formatted ?? 0, {
                    maximumFractionDigits: 4,
                  })
                )}{" "}
                {destNativeCurrency?.symbol}
              </p>
              <p className="text-xs text-red-600">
                {[
                  destUsdcBalance.error?.message,
                  destNativeBalance.error?.message,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-center sm:w-1/2 sm:mx-auto">
            <Label>Amount (USDC)</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="0"
              max={myUsdcBalance.data?.formatted}
              step="any"
              className="text-2xl font-bold text-center h-auto"
            />
            <p className="text-sm text-muted-foreground">
              {myUsdcBalance.isLoading ? (
                <Loader2 className="animate-spin inline-block size-3" />
              ) : (
                formatNumber(myUsdcBalance.data?.formatted ?? 0)
              )}{" "}
              available
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={() => setAmount(myUsdcBalance.data?.raw ?? "0")}
                className="ml-1"
              >
                Max
              </Button>
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              onClick={handleStartTransfer}
              disabled={isTransferring || currentStep === "completed"}
            >
              {currentStep === "completed"
                ? "Transfer Complete"
                : "Start Transfer"}
            </Button>

            {(currentStep === "completed" || currentStep === "error") && (
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            )}
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}

          <div className="text-center">
            {showFinalTime ? (
              <div className="text-2xl font-mono">
                <span>
                  {Math.floor(elapsedSeconds / 60)
                    .toString()
                    .padStart(2, "0")}
                </span>
                :
                <span>{(elapsedSeconds % 60).toString().padStart(2, "0")}</span>
              </div>
            ) : (
              <Timer
                isRunning={isTransferring}
                initialSeconds={elapsedSeconds}
                onTick={setElapsedSeconds}
              />
            )}
          </div>

          <ProgressSteps currentStep={currentStep} />

          <TransferLog logs={logs} />
        </CardContent>
      </Card>
    </div>
  );
}
