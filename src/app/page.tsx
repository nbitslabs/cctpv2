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
import {
  SupportedChainId,
  SUPPORTED_CHAINS,
  CHAIN_TO_CHAIN_NAME,
} from "@/lib/chains";
import { ProgressSteps } from "@/components/progress-step";
import { TransferLog } from "@/components/transfer-log";
import { Timer } from "@/components/timer";
import { TransferTypeSelector } from "@/components/transfer-type";
import { useCrossChainTransfer } from "@/hooks/use-cross-chain-transfer";
import { useErc20Amount } from "@/lib/wagmi/hooks/erc20";
import { formatNumber } from "@/lib/utils";
import { useAppKitAccount } from "@reown/appkit/react";
import { useSwitchChain } from "wagmi";
import { toast } from "sonner";
import { SwitchChainError } from "viem";
import { usdcAddress } from "@/lib/wagmi/generated";

export default function Home() {
  const { switchChainAsync } = useSwitchChain();
  const { isConnected } = useAppKitAccount();
  const { currentStep, logs, error, executeTransfer, reset } =
    useCrossChainTransfer();
  const [sourceChain, setSourceChain] = useState(SupportedChainId.ETH_SEPOLIA);
  const [destChain, setDestChain] = useState(SupportedChainId.AVAX_FUJI);
  const [amount, setAmount] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTransferring, setIsTransferring] = useState(false);
  const [showFinalTime, setShowFinalTime] = useState(false);
  const [transferType, setTransferType] = useState<"fast" | "standard">("fast");
  const { data: balance } = useErc20Amount(usdcAddress[sourceChain]);

  const handleStartTransfer = async () => {
    setIsTransferring(true);
    setShowFinalTime(false);
    setElapsedSeconds(0);

    await executeTransfer(sourceChain, destChain, amount, transferType);
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
    const newDestinationChain = SUPPORTED_CHAINS.find(
      (chainId) => chainId !== sourceChain
    );

    if (newDestinationChain) {
      setDestChain(newDestinationChain);
    }
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
              {transferType === "fast"
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
                    await switchChainAsync({ chainId: Number(value) });
                    setSourceChain(Number(value));
                  } catch (error) {
                    toast.error((error as SwitchChainError).details as string);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source chain" />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_CHAINS.map((chainId) => (
                    <SelectItem key={chainId} value={String(chainId)}>
                      {CHAIN_TO_CHAIN_NAME[chainId]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Destination Chain</Label>
              <Select
                value={String(destChain)}
                onValueChange={(value) => setDestChain(Number(value))}
                disabled={!sourceChain}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination chain" />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_CHAINS.filter(
                    (chainId) => chainId !== sourceChain
                  ).map((chainId) => (
                    <SelectItem key={chainId} value={String(chainId)}>
                      {CHAIN_TO_CHAIN_NAME[chainId]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Amount (USDC)</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="0"
              max={balance}
              step="any"
            />
            <p className="text-sm text-muted-foreground">
              {formatNumber(balance)} available
            </p>
          </div>

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

          {error && <div className="text-red-500 text-center">{error}</div>}

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
        </CardContent>
      </Card>
    </div>
  );
}
