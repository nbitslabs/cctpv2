"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConfettiCelebration from "@/components/ConfettiCelebration";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProgressSteps } from "@/components/progress-step";
import { TransferLog } from "@/components/transfer-log";
import { Timer } from "@/components/timer";
import { TransferTypeSelector } from "@/components/transfer-type";
import {
  RequiredExecuteTransferParams,
  TransferStep,
  useCrossChainTransfer,
} from "@/hooks/useCrossChainTransfer";
import { cn } from "@/lib/utils";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
} from "@reown/appkit/react";
import { toast } from "sonner";
import { CctpNetworkAdapterId, CctpV2TransferType } from "@/lib/cctp/networks";
import { useActiveNetwork } from "@/lib/cctp/providers/ActiveNetworkProvider";
import { AlertTriangle, Loader2, Moon, Sun, Wallet } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExternalLink from "@/components/ui2/ExternalLink";
import { NumericFormat } from "react-number-format";
import { Checkbox } from "@/components/ui/checkbox";
import { solana } from "@reown/appkit/networks";
import NetworkAdapterSelect, {
  useNetworkAdapterBalance,
} from "@/components/NetworkAdapterSelect";
import { TransactionSigner } from "gill";
import SetSolanaSigner from "@/components/SolanaTransferButton";
import { useChainId } from "wagmi";
import ConnectedWallet from "@/components/ConnectedWallet";
import { useAddressOfAdapterId } from "@/hooks/useAddressOfAdapter";
import { TooltipWrap, TooltipWrapNumber } from "@/components/TooltipWrap";
import { useSolanaAccount } from "@/hooks/useSolanaSigner";
import { formatDestinationAddress } from "@/lib/cctp/networks/util";
import { useTheme } from "next-themes";
import { getAccount } from "wagmi/actions";
import { wagmiConfig } from "@/lib/wagmi/config";
import TransactionHistory from "@/components/transaction-history";
import Footer from "@/components/Footer";

export default function Home() {
  const { open } = useAppKit();
  const { isConnected } = useAppKitAccount();
  const solanaAccount = useSolanaAccount();
  const eip155ChainId = useChainId();
  const { currentStep, logs, error, executeTransfer, reset } =
    useCrossChainTransfer();
  const { activeNetwork, setActiveNetwork } = useActiveNetwork();
  const { chainId } = useAppKitNetwork();
  const { theme, setTheme } = useTheme();

  const [method, setMethod] = useState<"mintOnly" | "transfer">("transfer");
  const isMintOnly = method === "mintOnly";
  const [amount, setAmount] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTransferring, setIsTransferring] = useState(false);
  const [showFinalTime, setShowFinalTime] = useState(false);
  const [transferType, setTransferType] = useState<CctpV2TransferType>(
    CctpV2TransferType.Fast
  );
  const [burnTxHash, setBurnTxHash] = useState("");
  const [understand, setUnderstand] = useState(false);
  const [solanaSigner, setSolanaSigner] = useState<TransactionSigner>();

  const [sourceChain, setSourceChain] = useState<CctpNetworkAdapterId>(
    chainId ?? activeNetwork.id
  );
  const sourceAddress = useAddressOfAdapterId(sourceChain);
  const {
    usdcBalance: sourceUsdcBalance,
    nativeBalance: sourceNativeBalance,
    nativeCurrency: sourceNativeCurrency,
    networkAdapter: sourceAdapter,
  } = useNetworkAdapterBalance(sourceChain, sourceAddress);

  const [destAddress, setDestAddress] = useState("");
  const [destChain, setDestChain] = useState<CctpNetworkAdapterId>();
  const {
    nativeBalance: destNativeBalance,
    usdcBalance: destUsdcBalance,
    nativeCurrency: destNativeCurrency,
    networkAdapter: destAdapter,
  } = useNetworkAdapterBalance(destChain, destAddress);

  const hasZeroNativeBalanceOnSource =
    !sourceNativeBalance.isLoading && !sourceNativeBalance.data?.formatted;
  const hasZeroNativeBalanceOnDestination =
    destChain &&
    !destNativeBalance.isLoading &&
    !destNativeBalance.data?.formatted;

  const handleStartTransfer = async () => {
    if (!isConnected) return open();
    if (!sourceAdapter) return toast.error("Please select a source chain");
    if (!destAdapter) return toast.error("Please select a destination chain");
    if (!destAddress) return toast.error("Please enter a destination address");

    const requiredParams: RequiredExecuteTransferParams = {
      sourceChainId: sourceChain,
      destinationChainId: destAdapter.id,
      mintRecipient: await formatDestinationAddress(destAddress, {
        source: sourceAdapter.type,
        destination: destAdapter.type,
      }),
      solanaSigner,
    };

    if (isMintOnly) {
      if (!burnTxHash) return toast.error("Please enter a burn tx hash");
    } else {
      if (!amount) return toast.error("Please enter an amount");
      if (Number(amount) > Number(sourceUsdcBalance.data?.formatted))
        return toast.error("Insufficient balance");
    }

    setIsTransferring(true);
    setShowFinalTime(false);
    setElapsedSeconds(0);

    await executeTransfer({
      ...requiredParams,
      ...(isMintOnly ? { burnTxHash } : { amount, transferType }),
    });

    [
      sourceUsdcBalance,
      destUsdcBalance,
      sourceNativeBalance,
      destNativeBalance,
    ].map((balance) => balance.refetch());
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
    if (destChain === sourceChain) {
      toast.warning("Destination chain must ≠ source chain", {
        description: "Please select a different destination chain to continue",
      });
      setDestChain(undefined);
    }
    if (sourceChain && activeNetwork.id !== sourceChain)
      setActiveNetwork(sourceChain);
  }, [sourceChain]);

  return (
    <div className="min-h-screen p-8">
      <ConfettiCelebration isCompleted={currentStep === "completed"} />
      <Card className="max-w-5xl mx-auto bg-foreground/3">
        <CardHeader className="items-center relative">
          <CardTitle className="text-center">
            Cross-Chain USDC Transfer
          </CardTitle>

          <div className="absolute top-4 right-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            >
              {theme === "dark" ? <Moon /> : <Sun />}
            </Button>
          </div>
          {isConnected ? (
            <>
              <appkit-account-button />
              <div className="flex flex-col gap-2 lg:flex-row">
                <ConnectedWallet namespace="eip155" adapterId={eip155ChainId} />
                <ConnectedWallet namespace="solana" adapterId={solana.id} />
              </div>
            </>
          ) : (
            <appkit-connect-button />
          )}
        </CardHeader>
        <CardContent className="space-y-4">
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
                <TabsTrigger value={"transfer"}>Transfer</TabsTrigger>
                <TabsTrigger value={"mintOnly"}>Mint Only</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          {!isMintOnly && (
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <div className="space-y-2">
                <Label>Transfer Type</Label>
                <p className="text-sm text-muted-foreground">
                  {transferType === CctpV2TransferType.Fast
                    ? "Faster transfers with lower finality threshold (1000 blocks)"
                    : "Standard transfers with higher finality (2000 blocks)"}
                </p>
              </div>
              <TransferTypeSelector
                value={transferType}
                onChange={setTransferType}
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <NetworkAdapterSelect
              label="Source Chain"
              chainId={sourceChain}
              setChainId={setSourceChain}
              address={sourceAddress ?? ""}
            />

            <NetworkAdapterSelect
              label="Destination Chain"
              chainId={destChain}
              setChainId={setDestChain}
              address={destAddress}
              setAddress={setDestAddress}
              exceptAdapterIds={[sourceChain]}
            >
              <TooltipWrap content="Use connected wallet" asChild>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="shrink-0"
                  onClick={() =>
                    setDestAddress(
                      (destAdapter?.type === "solana"
                        ? solanaAccount?.address
                        : getAccount(wagmiConfig).address) ?? ""
                    )
                  }
                >
                  <Wallet />
                </Button>
              </TooltipWrap>
            </NetworkAdapterSelect>
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
                <Label>
                  Burn Transaction Hash
                  {sourceAdapter && (
                    <TransactionHistory chainAdapter={sourceAdapter} />
                  )}
                </Label>
                <Input
                  value={burnTxHash}
                  onChange={(e) => setBurnTxHash(e.target.value)}
                  placeholder="0x..."
                  className="text-xl font-bold text-center h-12"
                />
                {burnTxHash && (
                  <p className="text-sm text-muted-foreground">
                    Check your burn transaction on{" "}
                    <ExternalLink
                      href={`${sourceAdapter?.explorer?.url}/tx/${burnTxHash}`}
                      className="font-bold"
                    >
                      {sourceAdapter?.explorer?.name}
                    </ExternalLink>
                    . This will be used to mint the USDC on the destination
                    chain.
                  </p>
                )}
              </>
            ) : (
              <>
                <Label>Amount (USDC)</Label>
                <NumericFormat
                  id={"input-amount"}
                  name={"input-amount"}
                  placeholder="Enter amount"
                  value={amount}
                  onValueChange={(values) => setAmount(values.value)}
                  className="appearance-none border border-input rounded-md bg-transparent font-bold text-center text-xl outline-none w-full autofill:shadow-[inset_0_0_0px_1000px_rgb(245,245,245)] h-10 transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                  thousandSeparator=","
                  allowNegative={false}
                />
                {isConnected && (
                  <p className="text-sm text-muted-foreground">
                    {sourceUsdcBalance.isLoading ? (
                      <Loader2 className="animate-spin inline-block size-3" />
                    ) : (
                      <>
                        <TooltipWrapNumber
                          amount={sourceUsdcBalance.data?.formatted ?? 0}
                        />{" "}
                        USDC
                      </>
                    )}{" "}
                    available
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      onClick={() =>
                        setAmount(sourceUsdcBalance.data?.raw ?? "0")
                      }
                      className="ml-1"
                    >
                      Max
                    </Button>
                  </p>
                )}
              </>
            )}
          </div>
          {error && <div className="text-destructive text-center">{error}</div>}

          <Alert className="bg-destructive/5 max-w-xl mx-auto border-destructive/50">
            <AlertTitle className="uppercase text-destructive">
              <AlertTriangle className="size-8" /> Be aware!
            </AlertTitle>
            <AlertDescription className="text-foreground">
              <ul className="list-disc list-inside">
                <li>
                  After burn, the transaction may take a while to complete. You
                  always can check it under <strong>Transaction History</strong>{" "}
                  of the source chain, then use <strong>Mint Only</strong>{" "}
                  option to mint the USDC on the destination chain.
                </li>
                {hasZeroNativeBalanceOnSource && (
                  <li className="text-destructive">
                    You need some{" "}
                    <strong>{sourceNativeCurrency?.symbol}</strong> on the{" "}
                    <strong>{sourceAdapter?.name}</strong> to pay for the burn
                    action.
                  </li>
                )}
                {hasZeroNativeBalanceOnDestination && (
                  <li className="text-destructive">
                    You need some <strong>{destNativeCurrency?.symbol}</strong>{" "}
                    on the <strong>{destAdapter?.name}</strong> to receive the
                    USDC.
                  </li>
                )}
              </ul>
            </AlertDescription>
          </Alert>

          <Label
            htmlFor="understand"
            className="flex items-center justify-center gap-2"
          >
            <Checkbox
              id="understand"
              className="border-primary/50"
              checked={understand}
              onCheckedChange={(checked) =>
                setUnderstand(checked === "indeterminate" ? false : checked)
              }
            />
            I have read all the warnings and understand the risks.
          </Label>
          <div className="flex justify-center gap-4">
            {!isConnected ? (
              <Button onClick={() => open()}>Connect Wallet</Button>
            ) : (
              <Button
                onClick={handleStartTransfer}
                disabled={
                  isTransferring ||
                  currentStep === "completed" ||
                  currentStep === "error" ||
                  !understand
                }
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    {buttonLabel[currentStep]}
                  </motion.span>
                </AnimatePresence>
              </Button>
            )}

            {(currentStep === "completed" || currentStep === "error") && (
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            )}
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
        </CardContent>
      </Card>
      <Footer />

      {solanaAccount && <SetSolanaSigner setSolanaSigner={setSolanaSigner} />}
    </div>
  );
}

const buttonLabel: Record<TransferStep, string> = {
  idle: "Start Transfer",
  approving: "Approving...",
  burning: "Burning...",
  "waiting-attestation": "Waiting for Attestation...",
  minting: "Minting...",
  completed: "Transfer Completed 🎉",
  error: "Error ❌",
};
