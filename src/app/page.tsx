"use client";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProgressSteps } from "@/components/progress-step";
import { TransferLog } from "@/components/transfer-log";
import { Timer } from "@/components/timer";
import { TransferTypeSelector } from "@/components/transfer-type";
import { useCrossChainTransfer } from "@/hooks/useCrossChainTransfer";
import { cn, formatNumber, shortenAddress } from "@/lib/utils";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useWalletInfo,
} from "@reown/appkit/react";
import { toast } from "sonner";
import {
  CctpNetworkAdapterId,
  CctpV2TransferType,
  findNetworkAdapter,
} from "@/lib/cctp/networks";
import { useActiveNetwork } from "@/lib/cctp/providers/ActiveNetworkProvider";
import { useMyUsdcBalance } from "@/hooks/useBalance";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import ExternalLink from "@/components/ui2/ExternalLink";
import { NumericFormat } from "react-number-format";
import { Checkbox } from "@/components/ui/checkbox";
import { solana } from "@reown/appkit/networks";
import NetworkAdapterSelect, {
  useNetworkAdapterBalance,
} from "@/components/ChainSelect";
import Image from "next/image";
import { TransactionSigner } from "gill";
import SolanaTransferButton from "@/components/SolanaTransferButton";

export default function Home() {
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();
  const eip155AccountState = useAppKitAccount({ namespace: "eip155" });
  const solanaAccountState = useAppKitAccount({ namespace: "solana" });
  const { walletInfo: eip155WalletInfo } = useWalletInfo("eip155");
  const { walletInfo: solanaWalletInfo } = useWalletInfo("solana");
  const { currentStep, logs, error, executeTransfer, reset } =
    useCrossChainTransfer();
  const { activeNetwork, setActiveNetwork } = useActiveNetwork();
  const { chainId } = useAppKitNetwork();

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
  const myUsdcBalance = useMyUsdcBalance();
  const [understand, setUnderstand] = useState(false);

  const [sourceChain, setSourceChain] = useState<CctpNetworkAdapterId>(
    chainId ?? activeNetwork.id
  );
  const {
    usdcBalance: sourceUsdcBalance,
    nativeBalance: sourceNativeBalance,
    nativeCurrency: sourceNativeCurrency,
    transfers: originTranfers,
    networkAdapter: sourceAdapter,
  } = useNetworkAdapterBalance(sourceChain, address);

  const [destAddress, setDestAddress] = useState("");
  const [destChain, setDestChain] = useState<CctpNetworkAdapterId | undefined>(
    solana.id
  );
  const {
    nativeBalance: destNativeBalance,
    usdcBalance: destUsdcBalance,
    nativeCurrency: destNativeCurrency,
    transfers: destTransfers,
    networkAdapter: destAdapter,
  } = useNetworkAdapterBalance(destChain, destAddress);

  const hasZeroNativeBalanceOnSource =
    !sourceNativeBalance.isLoading && !sourceNativeBalance.data?.formatted;
  const hasZeroNativeBalanceOnDestination =
    destChain &&
    !destNativeBalance.isLoading &&
    !destNativeBalance.data?.formatted;

  const solanaAdapter = findNetworkAdapter(solana.id)!;

  const handleStartTransfer = async (solanaSigner?: TransactionSigner) => {
    if (!isConnected) return open();
    if (!destChain) return toast.error("Please select a destination chain");

    if (isMintOnly) {
      if (!burnTxHash) return toast.error("Please enter a burn tx hash");

      setIsTransferring(true);
      setShowFinalTime(false);
      setElapsedSeconds(0);
      await executeTransfer({
        sourceChainId: sourceChain,
        destinationChainId: destChain,
        burnTxHash: burnTxHash,
        mintRecipient: destAddress,
        solanaSigner,
      });
    } else {
      if (!amount) return toast.error("Please enter an amount");
      if (Number(amount) > Number(myUsdcBalance.data?.formatted))
        return toast.error("Insufficient balance");

      setIsTransferring(true);
      setShowFinalTime(false);
      setElapsedSeconds(0);
      await executeTransfer({
        sourceChainId: sourceChain,
        destinationChainId: destChain,
        amount,
        transferType,
        mintRecipient: destAddress,
        solanaSigner,
      });
    }
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
  }, [sourceChain, showFinalTime]);

  useEffect(() => {
    console.log("sourceChain", sourceChain, activeNetwork);

    if (sourceChain && activeNetwork.id !== sourceChain)
      setActiveNetwork(sourceChain);
  }, [sourceChain]);

  useEffect(() => {
    if (currentStep === "waiting-attestation") originTranfers.refetch();
    if (currentStep === "completed") destTransfers.refetch();
  }, [currentStep]);

  useEffect(() => {
    if (!sourceAdapter || !destAdapter) return;

    if ([destAdapter, sourceAdapter].every(({ type }) => type === "evm")) {
      if (!destAddress && address) setDestAddress(address);
    } else setDestAddress("");
  }, [sourceAdapter, destAdapter]);

  return (
    <div className="min-h-screen bg-primary/10 p-8">
      <Card className="max-w-5xl mx-auto">
        <CardHeader className="items-center">
          <CardTitle className="text-center">
            Cross-Chain USDC Transfer
          </CardTitle>
          {isConnected ? (
            <>
              <appkit-account-button />
              {eip155AccountState.isConnected && (
                <p className="flex justify-center gap-1">
                  You are connected to{" "}
                  <ExternalLink
                    href={`${activeNetwork.explorer?.url}/address/${eip155AccountState.address}`}
                    className="text-primary"
                  >
                    {eip155AccountState.address &&
                      shortenAddress(eip155AccountState.address)}
                  </ExternalLink>
                  on{" "}
                  <strong className="text-primary">{activeNetwork.name}</strong>
                  via{" "}
                  {eip155WalletInfo && (
                    <span className="inline-flex items-center gap-1">
                      <Image
                        src={eip155WalletInfo.icon ?? ""}
                        alt={eip155WalletInfo.name ?? ""}
                        className="size-4 rounded-full"
                        width={16}
                        height={16}
                      />
                      {eip155WalletInfo.name}
                    </span>
                  )}
                </p>
              )}
              {solanaAccountState.isConnected && (
                <p className="flex justify-center gap-1">
                  You are connected to{" "}
                  <ExternalLink
                    href={`${solanaAdapter.explorer?.url}/address/${solanaAccountState.address}`}
                    className="text-primary"
                  >
                    {solanaAccountState.address &&
                      shortenAddress(solanaAccountState.address)}
                  </ExternalLink>
                  on{" "}
                  <strong className="text-primary">{solanaAdapter.name}</strong>
                  via{" "}
                  {solanaWalletInfo && (
                    <span className="inline-flex items-center gap-1">
                      <Image
                        src={solanaWalletInfo.icon ?? ""}
                        alt={solanaWalletInfo.name ?? ""}
                        className="size-4 rounded-full"
                        width={16}
                        height={16}
                      />
                      {solanaWalletInfo.name}
                    </span>
                  )}
                </p>
              )}
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
                <TabsTrigger value={"mintOnly"}>Mint Only</TabsTrigger>
                <TabsTrigger value={"transfer"}>Transfer</TabsTrigger>
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
              address={address ?? ""}
            />

            <NetworkAdapterSelect
              label="Destination Chain"
              chainId={destChain ?? solana.id}
              setChainId={setDestChain}
              address={destAddress}
              setAddress={setDestAddress}
              exceptAdapterIds={[sourceChain]}
            />
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
                <Label>Burn Transaction Hash</Label>
                <Input
                  value={burnTxHash}
                  onChange={(e) => setBurnTxHash(e.target.value)}
                  placeholder="0x..."
                  className="text-xl font-bold text-center h-12"
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
          {error && <div className="text-destructive text-center">{error}</div>}

          <Alert className="bg-primary/5 max-w-xl mx-auto border-destructive">
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
            ) : sourceAdapter?.type === "solana" ? (
              <SolanaTransferButton
                onClick={handleStartTransfer}
                disabled={
                  isTransferring || currentStep === "completed" || !understand
                }
              >
                {currentStep === "completed"
                  ? "Transfer Complete"
                  : "Start Transfer"}
              </SolanaTransferButton>
            ) : (
              <Button
                onClick={() => handleStartTransfer()}
                disabled={
                  isTransferring || currentStep === "completed" || !understand
                }
              >
                {currentStep === "completed"
                  ? "Transfer Complete"
                  : "Start Transfer"}
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
      <footer className="text-center text-sm text-muted-foreground mt-4">
        <p>
          Built with ❤️ by{" "}
          <ExternalLink
            href="https://github.com/thanhhoa214"
            className="text-primary font-semibold"
          >
            thanhhoa214 🇻🇳
          </ExternalLink>
        </p>
      </footer>
    </div>
  );
}
