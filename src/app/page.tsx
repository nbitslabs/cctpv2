"use client"
import Footer from "@/components/Footer"
import NetworkAdapterSelect, {
  useNetworkAdapterBalance,
} from "@/components/NetworkAdapterSelect"
import { ProgressSteps } from "@/components/progress-step"
import SetSolanaSigner from "@/components/SolanaTransferButton"
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
import { FeeEstimates } from "@/components/FeeEstimates"
import { useAddressOfAdapterId } from "@/hooks/useAddressOfAdapter"
import {
  useCrossChainTransfer,
  type RequiredExecuteTransferParams,
  type TransferStep,
} from "@/hooks/useCrossChainTransfer"
import { useSolanaAccount } from "@/hooks/useSolanaSigner"
import {
  CctpV2TransferType,
  type CctpNetworkAdapterId,
} from "@/lib/cctp/networks"
import { formatDestinationAddress } from "@/lib/cctp/networks/util"
import { useActiveNetwork } from "@/lib/cctp/providers/ActiveNetworkProvider"
import { cn } from "@/lib/utils"
import { wagmiConfig } from "@/lib/wagmi/config"
import { solana } from "@reown/appkit/networks"
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
} from "@reown/appkit/react"
import type { TransactionSigner } from "@solana/kit"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, Info, Loader, Wallet } from "lucide-react"
import { useEffect, useState } from "react"
import { NumericFormat } from "react-number-format"
import { toast } from "sonner"
import { getAccount } from "wagmi/actions"

export default function Home() {
  const { open } = useAppKit()
  const { isConnected } = useAppKitAccount()
  const solanaAccount = useSolanaAccount()
  const { currentStep, logs, error, transferAmount, executeTransfer, reset } =
    useCrossChainTransfer()
  const isCompleted = currentStep === "completed"
  const { activeNetwork, setActiveNetwork } = useActiveNetwork()
  const { chainId } = useAppKitNetwork()
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
  const [solanaSigner, setSolanaSigner] = useState<TransactionSigner>()
  const [isCustomDestAddress, setIsCustomDestAddress] = useState(false)

  const [sourceChain, setSourceChain] = useState<CctpNetworkAdapterId>(
    chainId ?? activeNetwork.id
  )
  const sourceAddress = useAddressOfAdapterId(sourceChain)
  const {
    usdcBalance: sourceUsdcBalance,
    nativeBalance: sourceNativeBalance,
    nativeCurrency: sourceNativeCurrency,
    networkAdapter: sourceAdapter,
  } = useNetworkAdapterBalance(sourceChain, sourceAddress)

  const [destAddress, setDestAddress] = useState("")
  const [destChain, setDestChain] = useState<CctpNetworkAdapterId>()
  const {
    nativeBalance: destNativeBalance,
    usdcBalance: destUsdcBalance,
    nativeCurrency: destNativeCurrency,
    networkAdapter: destAdapter,
  } = useNetworkAdapterBalance(destChain, destAddress)

  const hasZeroNativeBalanceOnSource =
    !sourceNativeBalance.isLoading && !sourceNativeBalance.data?.formatted
  const hasZeroNativeBalanceOnDestination =
    destChain &&
    !destNativeBalance.isLoading &&
    !destNativeBalance.data?.formatted

  const handleStartTransfer = async () => {
    if (!isConnected) {
      return open()
    }
    if (!sourceAdapter) {
      return toast.error("Please select a source chain")
    }
    if (!destAdapter) {
      return toast.error("Please select a destination chain")
    }
    if (!destAddress) {
      return toast.error("Please enter a destination address")
    }

    const requiredParams: RequiredExecuteTransferParams = {
      sourceChainId: sourceChain,
      destinationChainId: destAdapter.id,
      mintRecipient: await formatDestinationAddress(destAddress, {
        source: sourceAdapter.type,
        destination: destAdapter.type,
      }),
      solanaSigner,
      isSendingToSelf: !isCustomDestAddress,
    }

    if (isMintOnly) {
      if (!burnTxHash) {
        return toast.error("Please enter a burn tx hash")
      }
    } else {
      if (!amount) {
        return toast.error("Please enter an amount")
      }
      if (Number(amount) > Number(sourceUsdcBalance.data?.formatted)) {
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
    ;[
      sourceUsdcBalance,
      destUsdcBalance,
      sourceNativeBalance,
      destNativeBalance,
    ].map((balance) => balance.refetch())
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
    if (sourceChain && activeNetwork.id !== sourceChain) {
      setActiveNetwork(sourceChain)
    }
    // oxlint-disable-next-line exhaustive-deps
  }, [sourceChain])

  useEffect(() => {
    if (isCustomDestAddress) {
      return
    }
    setDestAddress(
      (destAdapter?.type === "solana"
        ? solanaAccountState?.address
        : getAccount(wagmiConfig).address) ?? ""
    )
    // oxlint-disable-next-line exhaustive-deps
  }, [destAdapter, isCustomDestAddress])

  // Reset scroll position on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setUnderstand(isMintOnly)
  }, [isMintOnly])

  return (
    <div className="min-h-screen w-full pb-8 sm:p-8">
      <Card className="max-w-4xl mx-auto border-0 bg-foreground/3 sm:border pt-10 sm:pt-4 relative">
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
              <p className="text-sm text-muted-foreground">
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
          <div className="grid sm:grid-cols-2 gap-4">
            <NetworkAdapterSelect
              label="Source Chain"
              chainId={sourceChain}
              setChainId={setSourceChain}
              address={sourceAddress ?? ""}
              addressReadonly
              hideAddress={isMintOnly}
            />

            <NetworkAdapterSelect
              label="Destination Chain"
              chainId={destChain}
              setChainId={(chainId) => {
                if (chainId === solana.id && !solanaAccountState.isConnected) {
                  open({ namespace: "solana" })
                }
                setDestChain(chainId)
              }}
              address={destAddress}
              setAddress={setDestAddress}
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
                      setDestAddress("")
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
              "space-y-2 text-center sm:w-1/2 sm:mx-auto",
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
                  className="text-xl font-bold text-center h-12"
                />
                {burnTxHash && (
                  <p className="text-sm text-muted-foreground">
                    Check your burn transaction on{" "}
                    <ExternalLink
                      href={`${sourceAdapter?.explorer?.url}/tx/${burnTxHash}`}
                      withIcon
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
                <Label className="font-serif">Amount in USDC</Label>
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
                      <Loader className="animate-spin inline-block size-3" />
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
          <FeeEstimates
            source={sourceChain}
            destination={destChain}
            showSource={!isMintOnly}
          />
          {error && <div className="text-destructive text-center">{error}</div>}

          {!isMintOnly && (
            <Alert variant="warning">
              <AlertCircle className="!size-4.5 stroke-3" />
              <AlertDescription>
                <h4 className="font-semibold font-serif mb-2 mt-px tracking-wide">
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
                      <span className="text-destructive inline-flex items-center text-[13px] translate-y-px">
                        <Info className="mr-1 size-3" />
                        Error: AlreadyProcessed{" "}
                      </span>
                    </TooltipWrap>
                    , you can use the <strong>Mint Only</strong> option to mint
                    USDC on the destination chain. The latest burn transaction
                    is always available in the source explorer (
                    <ExternalLink
                      href={`${sourceAdapter?.explorer?.url}/tx/${burnTxHash}`}
                      withIcon
                    >
                      {sourceAdapter?.explorer?.name}
                    </ExternalLink>
                    ).
                  </li>
                  {hasZeroNativeBalanceOnDestination && (
                    <li className="text-destructive">
                      You need some{" "}
                      <strong>{destNativeCurrency?.symbol}</strong> on the{" "}
                      <strong>{destAdapter?.name}</strong> to receive the USDC.
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
                You need some <strong>{sourceNativeCurrency?.symbol}</strong> on
                the <strong>{sourceAdapter?.name}</strong> to pay for the burn
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
      {solanaAccount && (
        <SetSolanaSigner
          setSolanaSigner={setSolanaSigner}
          solanaAccount={solanaAccount}
        />
      )}
      {/* Success Dialog */}
      {isCompleted && sourceAdapter && destAdapter && (
        <SuccessDialog
          source={{
            networkAdapter: sourceAdapter,
            address: sourceAddress ?? "",
            usdcBalance: sourceUsdcBalance.data?.formatted ?? 0,
          }}
          destination={{
            networkAdapter: destAdapter,
            address: destAddress,
            usdcBalance: destUsdcBalance.data?.formatted ?? 0,
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
