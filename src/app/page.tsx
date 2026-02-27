"use client"
import { FeeEstimates } from "@/components/FeeEstimates"
import Footer from "@/components/Footer"
import NetworkAdapterSelect, {
  useNetworkAdapterBalance,
} from "@/components/NetworkAdapterSelect"
import { ProgressSteps } from "@/components/progress-step"
import StickyWallets from "@/components/StickyWallets"
import SuccessDialog from "@/components/SuccessDialog"
import { Timer } from "@/components/timer"
import { TooltipWrap, TooltipWrapNumber } from "@/components/TooltipWrap"
import TransactionHistory from "@/components/transaction-history"
import { TransferLog } from "@/components/transfer-log"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ExternalLink from "@/components/ui2/ExternalLink"
import { useAddressOfAdapterId } from "@/hooks/useAddressOfAdapter"
import {
  useCrossChainTransfer,
  type TransferStep,
} from "@/hooks/useCrossChainTransfer"
import { CctpV2TransferType } from "@/lib/cctp/networks"
import { cn } from "@/lib/utils"
import { Blockchain } from "@circle-fin/bridge-kit"
import { useAppKit, useAppKitAccount } from "@reown/appkit/react"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, Info, Loader, Wallet } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { NumericFormat } from "react-number-format"
import { toast } from "sonner"

export default function Home() {
  const { open } = useAppKit()
  const { isConnected } = useAppKitAccount()
  const solanaAccountState = useAppKitAccount({ namespace: "solana" })

  const [method, setMethod] = useState<"mintOnly" | "transfer">("transfer")
  const isMintOnly = method === "mintOnly"
  const [amount, setAmount] = useState("")
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [isTransferring, setIsTransferring] = useState(false)
  const [showFinalTime, setShowFinalTime] = useState(false)
  const [transferType] = useState<CctpV2TransferType>(CctpV2TransferType.Fast)
  const [burnTxHash, setBurnTxHash] = useState("")
  const [understand, setUnderstand] = useState(false)
  const [isCustomDestAddress, setIsCustomDestAddress] = useState(false)

  const [sourceChain, setSourceChain] = useState<Blockchain>(
    Blockchain.Ethereum
  )
  const sourceAddress = useAddressOfAdapterId(sourceChain)
  const { balance: sourceBalance, blockchain: sourceAdapter } =
    useNetworkAdapterBalance(sourceChain, sourceAddress)

  const [customDestAddress, setCustomDestAddress] = useState("")
  const [destChain, setDestChain] = useState<Blockchain>()
  const destAddress = useAddressOfAdapterId(destChain)
  const { balance: destBalance, blockchain: destAdapter } =
    useNetworkAdapterBalance(destChain, customDestAddress)
  // const { data: mintRecipient } = useQuery({
  //   queryKey: ["mint-recipient", sourceAdapter?.type, destAdapter?.type],
  //   queryFn: () =>
  //     formatDestinationAddress(destAddress, {
  //       source: sourceAdapter!.type,
  //       destination: destAdapter!.type,
  //     }),
  //   enabled: !!sourceAdapter && !!destAdapter && !!destAddress,
  // })

  const requiredParams = useMemo(
    () => ({
      sourceChainId: sourceChain,
      destinationChainId: destChain,
      mintRecipient: customDestAddress,
      isSendingToSelf: !isCustomDestAddress,
      amount,
    }),
    [sourceChain, destChain, customDestAddress, isCustomDestAddress, amount]
  )
  const { currentStep, logs, error, transferAmount, executeTransfer, reset } =
    useCrossChainTransfer(requiredParams)
  const isCompleted = currentStep === "completed"
  const hasZeroNativeBalanceOnSource =
    !sourceBalance.isLoading && !sourceBalance.data?.native
  const hasZeroNativeBalanceOnDestination =
    destChain && !destBalance.isLoading && !destBalance.data?.native

  const handleStartTransfer = async () => {
    if (!isConnected) return open()
    if (!sourceAdapter) {
      return toast.error("Please select a source chain")
    }
    if (!destAdapter) {
      return toast.error("Please select a destination chain")
    }
    // if (!destAddress) {
    //   return toast.error("Please enter a destination address")
    // }

    if (isMintOnly) {
      if (!burnTxHash) {
        return toast.error("Please enter a burn tx hash")
      }
    } else {
      if (!amount) {
        return toast.error("Please enter an amount")
      }
      if (Number(amount) > Number(sourceBalance.data?.usdc)) {
        return toast.error("Insufficient balance")
      }
    }

    setIsTransferring(true)
    setShowFinalTime(false)
    setElapsedSeconds(0)
    await executeTransfer({
      ...requiredParams,
      ...(isMintOnly ? { burnTxHash } : { amount, transferType }),
    })
    ;[sourceBalance, destBalance].map((balance) => balance.refetch())
    setIsTransferring(false)
    setShowFinalTime(true)
  }

  const handleReset = () => {
    reset()
    setIsTransferring(false)
    setShowFinalTime(false)
    setElapsedSeconds(0)
  }

  useEffect(() => {
    if (destChain === sourceChain) {
      toast.warning("Destination chain must ≠ source chain", {
        description: "Please select a different destination chain to continue",
      })
      setDestChain(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceChain])

  useEffect(() => {
    if (isCustomDestAddress) return
    setCustomDestAddress(destAddress ?? "")
  }, [destAddress, isCustomDestAddress])

  // Reset scroll position on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setUnderstand(isMintOnly)
  }, [isMintOnly])

  return (
    <div className="min-h-screen w-full pb-8 sm:p-8">
      <Card className="bg-foreground/3 relative mx-auto max-w-4xl border-0 pt-10 sm:border sm:pt-4">
        <StickyWallets />
        <CardHeader className="items-center sm:pt-2">
          <CardTitle className="text-center font-serif text-xl sm:text-2xl">
            Cross-Chain USDC Transfer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:*:w-1/2">
            <div className="flex flex-col gap-2">
              <Label className="font-serif">Transfer Method</Label>
              <Tabs
                value={method}
                onValueChange={(v) => setMethod(v as "mintOnly" | "transfer")}
              >
                <TabsList className="grid w-fit grid-cols-2">
                  <TabsTrigger value={"transfer"}>Transfer</TabsTrigger>
                  <TabsTrigger value={"mintOnly"}>Mint Only</TabsTrigger>
                </TabsList>
              </Tabs>
              <p className="text-muted-foreground text-sm">
                {method === "mintOnly"
                  ? "Provides a burn transaction hash to mint on the destination chain"
                  : "Transfer and mint from the origin to the destination"}
              </p>
            </div>
            {/* {!isMintOnly && (
              <div className="flex flex-col gap-2">
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
            )} */}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <NetworkAdapterSelect
              label="Source"
              chainId={sourceChain}
              setChainId={setSourceChain}
              address={sourceAddress ?? ""}
              addressReadonly
              hideAddress={isMintOnly}
            />

            <NetworkAdapterSelect
              label="Destination"
              chainId={destChain}
              setChainId={(chainId) => {
                if (
                  chainId === Blockchain.Solana &&
                  !solanaAccountState.isConnected
                ) {
                  open({ namespace: "solana" })
                }
                setDestChain(chainId)
              }}
              address={customDestAddress}
              setAddress={setCustomDestAddress}
              exceptAdapterIds={[sourceChain]}
              addressReadonly={!isCustomDestAddress}
              hideAddress={isMintOnly}
            >
              <TooltipWrap
                content={
                  isCustomDestAddress
                    ? "Use connected address"
                    : "Use a different address"
                }
                asChild
              >
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="shrink-0"
                  onClick={() => {
                    if (isCustomDestAddress) {
                      setIsCustomDestAddress(false)
                    } else {
                      setIsCustomDestAddress(true)
                      setCustomDestAddress("")
                    }
                  }}
                >
                  <Wallet strokeWidth={1.5} />
                </Button>
              </TooltipWrap>
            </NetworkAdapterSelect>
          </div>

          <div
            className={cn(
              "space-y-2 text-center sm:mx-auto sm:w-1/2",
              isMintOnly && "sm:w-full"
            )}
          >
            {isMintOnly ? (
              <>
                {" "}
                <Label className="font-serif">
                  Burn Transaction Hash
                  {sourceAdapter && (
                    <TransactionHistory chainAdapter={sourceAdapter} />
                  )}
                </Label>
                <Input
                  value={burnTxHash}
                  onChange={(e) => setBurnTxHash(e.target.value)}
                  placeholder="0x..."
                  className="h-12 text-center text-xl font-bold"
                />
                {burnTxHash && (
                  <p className="text-muted-foreground text-sm">
                    Check your burn transaction{" "}
                    <ExternalLink
                      href={
                        sourceAdapter?.explorerUrl.replace(
                          "{txHash}",
                          burnTxHash
                        ) ?? ""
                      }
                      withIcon
                      className="font-bold"
                    >
                      here
                    </ExternalLink>
                    . This will be used to mint the USDC on the destination
                    chain.
                  </p>
                )}
              </>
            ) : (
              <>
                <Label className="font-serif">Amount in USDC</Label>
                <NumericFormat
                  id={"input-amount"}
                  name={"input-amount"}
                  placeholder="Enter amount"
                  value={amount}
                  onValueChange={(values) => setAmount(values.value)}
                  className="border-input placeholder:text-muted-foreground focus-visible:ring-ring h-10 w-full appearance-none rounded-md border bg-transparent text-center text-xl font-bold transition-colors outline-none autofill:shadow-[inset_0_0_0px_1000px_var(--background)] focus-visible:ring-1 focus-visible:outline-hidden"
                  thousandSeparator=","
                  allowNegative={false}
                />
                {isConnected && (
                  <p className="text-muted-foreground text-sm">
                    {sourceBalance.isLoading ? (
                      <Loader className="inline-block size-3 animate-spin" />
                    ) : (
                      <>
                        <TooltipWrapNumber
                          amount={sourceBalance.data?.native ?? 0}
                        />{" "}
                        USDC
                      </>
                    )}{" "}
                    available
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      onClick={() =>
                        setAmount(sourceBalance.data?.native.toString() ?? "")
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
          <FeeEstimates {...requiredParams} showSource={!isMintOnly} />
          {error && <div className="text-destructive text-center">{error}</div>}

          {!isMintOnly && (
            <Alert variant="warning">
              <AlertCircle className="size-4.5! stroke-3" />
              <AlertDescription>
                <h4 className="mt-px mb-2 font-serif font-semibold tracking-wide">
                  Essentials
                </h4>
                <ul className="list-disc">
                  <li>
                    <ExternalLink
                      href="https://developers.circle.com/cctp"
                      withIcon
                    >
                      How CCTP V2 Works
                    </ExternalLink>{" "}
                    and{" "}
                    <ExternalLink
                      href="https://developers.circle.com/cctp/cctp-faq"
                      withIcon
                    >
                      FAQ
                    </ExternalLink>{" "}
                  </li>
                  <li>
                    After burning, if you lose progress or getting{" "}
                    <TooltipWrap content="It happens sometimes with Solana, this error means the burn transaction has already been processed.">
                      <span className="text-destructive inline-flex translate-y-px items-center text-[13px]">
                        <Info className="mr-1 size-3" />
                        Error: AlreadyProcessed{" "}
                      </span>
                    </TooltipWrap>
                    , you can use the <strong>Mint Only</strong> option to mint
                    USDC on the destination chain. The latest burn transaction
                    is always available in the source explorer (
                    <ExternalLink
                      href={
                        sourceAdapter?.explorerUrl.replace(
                          "tx/{hash}",
                          burnTxHash
                            ? `tx/${burnTxHash}`
                            : isConnected
                              ? `address/${sourceAddress}`
                              : ""
                        ) ?? ""
                      }
                      withIcon
                    >
                      here
                    </ExternalLink>
                    ).
                  </li>
                  {hasZeroNativeBalanceOnDestination && (
                    <li className="text-destructive">
                      You need some{" "}
                      <strong>{destAdapter?.nativeCurrency.symbol}</strong> on
                      the <strong>{destAdapter?.name}</strong> to receive the
                      USDC.
                    </li>
                  )}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {!isMintOnly && hasZeroNativeBalanceOnSource && (
            <Label
              htmlFor="source-zero-balance"
              className="flex items-center justify-center gap-2"
            >
              <Checkbox
                id="source-zero-balance"
                className="border-primary/50"
                checked={understand}
                onCheckedChange={(checked) =>
                  setUnderstand(checked === "indeterminate" ? false : checked)
                }
              />
              <span>
                You need some{" "}
                <strong>{sourceAdapter?.nativeCurrency.symbol}</strong> on the{" "}
                <strong>{sourceAdapter?.name}</strong> to pay for the burn
                action.
              </span>
            </Label>
          )}
          {!isMintOnly && (
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
          )}
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
                className="font-serif"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                  >
                    {buttonLabel[currentStep]}
                  </motion.span>
                </AnimatePresence>
              </Button>
            )}

            {(currentStep === "completed" || currentStep === "error") && (
              <Button
                variant="outline"
                onClick={handleReset}
                className="font-serif"
              >
                Reset
              </Button>
            )}
          </div>

          <div className="text-center">
            {showFinalTime ? (
              <div className="font-mono text-2xl">
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
      {/* Success Dialog */}
      {isCompleted && sourceAdapter && destAdapter && (
        <SuccessDialog
          source={{
            networkAdapter: sourceAdapter,
            address: sourceAddress ?? "",
            usdcBalance: sourceBalance.data?.usdc ?? 0,
          }}
          destination={{
            networkAdapter: destAdapter,
            address: customDestAddress,
            usdcBalance: destBalance.data?.usdc ?? 0,
          }}
          amount={transferAmount}
        />
      )}
    </div>
  )
}

const buttonLabel: Record<TransferStep, string> = {
  idle: "Start Transfer",
  approving: "Approving...",
  burning: "Burning...",
  "waiting-attestation": "Waiting for Attestation...",
  minting: "Minting...",
  completed: "Transfer Completed 🎉",
  error: "Error ❌",
}
