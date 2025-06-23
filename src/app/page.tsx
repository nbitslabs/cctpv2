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
import { cn, formatNumber } from "@/lib/utils";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getAccountTransactions } from "@/lib/alchemy/account";
import TransactionHistory from "@/components/transaction-history";

export default function Home() {
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();
  const { currentStep, logs, error, executeTransfer, reset } =
    useCrossChainTransfer();
  const { activeNetwork, setActiveNetwork } = useActiveNetwork();
  const sourceChain = activeNetwork.id;

  const [destChain, setDestChain] = useState<CctpNetworkAdapterId>();
  const [method, setMethod] = useState<"mintOnly" | "transfer">("transfer");
  const isMintOnly = method === "mintOnly";
  const [amount, setAmount] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTransferring, setIsTransferring] = useState(false);
  const [showFinalTime, setShowFinalTime] = useState(false);
  const [transferType, setTransferType] = useState<CctpV2TransferType>(
    CctpV2TransferType.Fast
  );
  const [burnTxHash, setBurnTxHash] = useState<string>();
  const myUsdcBalance = useMyUsdcBalance();
  const myNativeBalance = useMyNativeBalance();
  const sourceNativeCurrency = activeNetwork.nativeCurrency;

  const destUsdcBalance = useUsdcBalance(destChain);
  const destNativeBalance = useNativeBalance(destChain);
  const destination = findNetworkAdapter(destChain);
  const destNativeCurrency = destination?.nativeCurrency;

  const originTranfers = useQuery({
    queryKey: ["transfers", sourceChain, address],
    queryFn: () => getAccountTransactions(sourceChain, address!),
    enabled: !!address,
  });

  const destTransfers = useQuery({
    queryKey: ["transfers", destChain, address],
    queryFn: () => getAccountTransactions(destChain!, address!),
    enabled: !!address && !!destChain,
  });

  const handleStartTransfer = async () => {
    if (!isConnected) return open();

    if (!destChain) {
      toast.error("Please select a destination chain");
      return;
    }

    setIsTransferring(true);
    setShowFinalTime(false);
    setElapsedSeconds(0);
    if (isMintOnly) {
      if (!burnTxHash) {
        toast.error("Please enter a burn tx hash");
        return;
      }
      await executeTransfer({
        destinationChainId: destChain,
        burnTxHash: burnTxHash,
      });
    } else {
      await executeTransfer({
        destinationChainId: destChain,
        amount,
        transferType,
      });
    }
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
      <Card className="max-w-5xl mx-auto">
        <CardHeader className="items-center">
          <CardTitle className="text-center">
            Cross-Chain USDC Transfer
          </CardTitle>
          {isConnected ? <appkit-account-button /> : <appkit-connect-button />}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Transfer Method</Label>
            <Tabs
              value={method}
              onValueChange={(v) => setMethod(v as "mintOnly" | "transfer")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value={"mintOnly"}>Mint Only</TabsTrigger>
                <TabsTrigger value={"transfer"}>Transfer</TabsTrigger>
              </TabsList>
            </Tabs>
            <p className="text-sm text-muted-foreground">
              {method === "mintOnly"
                ? "Provides a burn transaction hash to mint on the destination chain"
                : "Transfer and mint from the origin to the destination"}
            </p>
          </div>
          {!isMintOnly && (
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
          )}
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
              {address && (
                <>
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
                    {[
                      myUsdcBalance.error?.message,
                      myNativeBalance.error?.message,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  <TransactionHistory
                    transactions={originTranfers.data}
                    isLoading={originTranfers.isLoading}
                    explorerUrl={activeNetwork.explorer?.url ?? ""}
                  />
                </>
              )}
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

              {destChain && (
                <>
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
                  <TransactionHistory
                    transactions={destTransfers.data}
                    isLoading={destTransfers.isLoading}
                    explorerUrl={destination?.explorer?.url ?? ""}
                  />
                </>
              )}
            </div>
          </div>

          <div
            className={cn(
              "space-y-2 text-center sm:w-1/2 sm:mx-auto",
              isMintOnly && "sm:w-full"
            )}
          >
            {isMintOnly ? (
              <>
                {" "}
                <Label>Burn Tx Hash</Label>
                <Input
                  value={burnTxHash}
                  onChange={(e) => setBurnTxHash(e.target.value)}
                  placeholder="Enter burn tx hash"
                  className="text-2xl font-bold text-center h-auto"
                />
                {burnTxHash && (
                  <p className="text-sm text-muted-foreground">
                    Check your burn transaction on{" "}
                    <Link
                      href={`${activeNetwork.explorer?.url}/tx/${burnTxHash}`}
                      target="_blank"
                      className="text-primary font-bold"
                    >
                      {activeNetwork.explorer?.name}
                    </Link>
                    . This will mint the USDC on the destination chain.
                  </p>
                )}
              </>
            ) : (
              <>
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
                {address && (
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
                )}
              </>
            )}
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
