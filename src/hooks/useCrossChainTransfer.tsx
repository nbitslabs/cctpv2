"use client"

import CopyIconTooltip from "@/components/ui2/CopyIconTooltip"
import ExternalLink from "@/components/ui2/ExternalLink"
import { getAttestation } from "@/lib/cctp/attestation"
import { type CctpV2TransferType } from "@/lib/cctp/networks"
import { USDC_DECIMALS } from "@/lib/cctp/networks/constants"
import { shortenAddress } from "@/lib/utils"
import { SolanaAdapter } from "@circle-fin/adapter-solana"
import { ViemAdapter } from "@circle-fin/adapter-viem-v2"
import {
  ActionHandler,
  Blockchain,
  BridgeKit,
  BridgeParams,
  ChainDefinition,
  getErrorMessage,
} from "@circle-fin/bridge-kit"
import type { Provider as SolanaProvider } from "@reown/appkit-adapter-solana/react"
import { useAppKitAccount } from "@reown/appkit/react"
import { AlertCircle, CheckCircle } from "lucide-react"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import { formatUnits, Hash } from "viem"
import {
  findBlockchain,
  useBridgeKitEvmAdapter,
  useBridgeKitSolanaAdapter,
} from "./bridgeKit"
import { alchemySolanaRpcUrl } from "@/lib/constants"

export const cctpBridgeKit = new BridgeKit()

export type TransferStep =
  | "idle"
  | "approving"
  | "burning"
  | "waiting-attestation"
  | "minting"
  | "completed"
  | "error"

export function useCrossChainTransfer(params: RequiredExecuteTransferParams) {
  const [currentStep, setCurrentStep] = useState<TransferStep>("idle")
  const [transferAmount, setTransferAmount] = useState<string>("")
  const [logs, setLogs] = useState<React.ReactNode[]>([])
  const [error, setError] = useState<string | null>(null)
  const bridgeKitParams = useBridgeKitParams(params)
  const solanaAccountState = useAppKitAccount({ namespace: "solana" })

  const addLog = (message: React.ReactNode) =>
    setLogs((prev) => [
      ...prev,
      <li key={prev.length} className="flex items-center gap-1">
        [{new Date().toLocaleTimeString()}] {message}
      </li>,
    ])

  const setMinting = () => {
    addLog("Initiating mint...")
    setCurrentStep("minting")
  }

  const setMinted = (txHash: string, explorerUrl?: string) => {
    addLog(
      <>
        <CheckCircle className="size-4 text-green-600" />
        Mint Tx:{" "}
        {explorerUrl && (
          <ExternalLink href={explorerUrl || ""} className="text-sm">
            {shortenAddress(txHash, 6)}
          </ExternalLink>
        )}
        <CopyIconTooltip text={txHash} />
      </>
    )
    setCurrentStep("completed")
  }

  const executeTransfer = async (
    params: RequiredExecuteTransferParams &
      (
        | { amount: string; transferType: CctpV2TransferType }
        | { burnTxHash: string }
      )
  ) => {
    try {
      if (!bridgeKitParams) throw new Error("Bridge parameters not ready")

      if ("burnTxHash" in params) {
        const burnTx = params.burnTxHash
        const sourceChain = findBlockchain(params.sourceChainId)
        if (!sourceChain?.cctp) throw new Error("Source network not found")
        const attestationMessage = await getAttestation(
          sourceChain.cctp.domain,
          burnTx
        )
        if (attestationMessage.status !== "complete")
          throw new Error("Attestation not complete yet")

        const fromChain = findBlockchain(bridgeKitParams.from.chain.chain)
        const toChain = findBlockchain(bridgeKitParams.to.chain.chain)
        if (!fromChain || !toChain)
          throw new Error("Required chains not supported by BridgeKit")

        if (!solanaAccountState.address)
          throw new Error("Solana account not connected")
        const overridedIfSolana =
          toChain.chain === "Solana"
            ? ({
                ...toChain,
                rpcEndpoints: [alchemySolanaRpcUrl],
              } satisfies ChainDefinition)
            : toChain

        setMinting()
        const action =
          await bridgeKitParams.to.adapter.actionRegistry.executeAction(
            "cctp.v2.receiveMessage",
            {
              attestation: attestationMessage.attestation,
              message: attestationMessage.message,
              eventNonce: attestationMessage.eventNonce,
              mintRecipient: attestationMessage.decodedMessage?.recipient,
              fromChain: fromChain as never,
              toChain: overridedIfSolana as never,
            },
            {
              chain: overridedIfSolana as never,
              address: solanaAccountState.address,
            }
          )
        const txHash = await action?.execute()
        await bridgeKitParams.to.adapter.waitForTransaction(
          txHash as Hash,
          {},
          toChain as never
        )
        setMinted(txHash, toChain.explorerUrl.replace("{txHash}", txHash))
      } else {
        const handler: ActionHandler<typeof cctpBridgeKit> = ({
          method,
          values,
        }) => {
          const txHash = values.txHash || ""
          if (values.state === "noop") return
          switch (method) {
            case "burn": {
              if (values.state === "pending") {
                addLog(`Initiating deposit for burn ${params.amount} USDC...`)
                setCurrentStep("burning")
              }
              if (values.state === "success") {
                addLog(
                  <>
                    <CheckCircle className="size-4 text-green-600" />
                    Burn transaction:{" "}
                    {values.explorerUrl && (
                      <ExternalLink
                        href={values.explorerUrl}
                        className="font-mono text-sm"
                      >
                        {shortenAddress(txHash, 6)}
                      </ExternalLink>
                    )}
                    <CopyIconTooltip text={txHash} />
                  </>
                )
              }
              if (values.state === "error") {
                addLog(
                  <>
                    <AlertCircle className="size-4 text-red-500" />
                    Burn transaction error: {values.error}
                  </>
                )
                setCurrentStep("error")
              }
              break
            }
            case "fetchAttestation": {
              if (values.state === "pending") {
                setCurrentStep("waiting-attestation")
                addLog("Waiting for attestation...")
              }
              if (values.state === "success") {
                const { attestation, decodedMessage } = values.data
                addLog(
                  <>
                    <CheckCircle className="size-4 text-green-600" />
                    Attestation received.{" "}
                    {/* <ExternalLink href={url} className="text-sm">
                  {shortenAddress(attestation.attestation, 8)}
                </ExternalLink> */}
                    {shortenAddress(attestation, 8)}
                    <CopyIconTooltip text={attestation} />
                  </>
                )
                const formattedAmount = formatUnits(
                  BigInt(decodedMessage.decodedMessageBody.amount),
                  USDC_DECIMALS
                )
                setTransferAmount(formattedAmount)
              }
              if (values.state === "error") {
                addLog(
                  <>
                    <AlertCircle className="size-4 text-red-500" />
                    Attestation error: {values.error}
                  </>
                )
                setCurrentStep("error")
              }

              break
            }
            case "mint": {
              if (values.state === "pending") {
                setMinting()
              }
              if (values.state === "success") {
                setMinted(txHash, values.explorerUrl)
              }
              if (values.state === "error") {
                addLog(
                  <>
                    <AlertCircle className="size-4 text-red-500" />
                    Mint error: {values.error}
                  </>
                )
                setCurrentStep("error")
              }
              break
            }
          }
        }
        cctpBridgeKit.on("*", handler)
        await cctpBridgeKit.bridge(bridgeKitParams)
        cctpBridgeKit.off("*", handler)
      }
    } catch (error) {
      toast.error(`Error: ${getErrorMessage(error)}`)
    } finally {
    }
  }

  const reset = () => {
    setCurrentStep("idle")
    setLogs([])
    setError(null)
    setTransferAmount("")
  }

  return {
    currentStep,
    logs,
    error,
    transferAmount,
    executeTransfer,
    reset,
  }
}

export type RequiredExecuteTransferParams = {
  sourceChainId: Blockchain
  destinationChainId?: Blockchain
  mintRecipient?: string
  isSendingToSelf: boolean
  amount?: string
}

declare global {
  interface Window {
    solana?: SolanaProvider
  }
}

export function useBridgeKitParams(params: RequiredExecuteTransferParams) {
  const { sourceChainId, destinationChainId, mintRecipient, amount } = params
  const { data: evmAdapter } = useBridgeKitEvmAdapter()
  const { data: solanaAdapter } = useBridgeKitSolanaAdapter()

  const bridgeParams = useMemo(() => {
    const sourceNetwork = findBlockchain(sourceChainId)
    if (!sourceNetwork) return null

    const destNetwork = findBlockchain(destinationChainId)
    if (!destNetwork) return null
    if (!evmAdapter) return null

    let fromAd: ViemAdapter | SolanaAdapter = evmAdapter
    if (sourceNetwork.type === "solana") {
      if (!solanaAdapter) return null
      fromAd = solanaAdapter
    }
    let toAd: ViemAdapter | SolanaAdapter = evmAdapter
    if (destNetwork.type === "solana") {
      if (!solanaAdapter) return null
      toAd = solanaAdapter
    }

    return {
      from: { adapter: fromAd, chain: sourceNetwork },
      to: {
        adapter: toAd,
        chain: destNetwork,
        recipientAddress: mintRecipient,
      },
      amount: amount!,
    } satisfies BridgeParams
  }, [
    amount,
    destinationChainId,
    evmAdapter,
    mintRecipient,
    solanaAdapter,
    sourceChainId,
  ])
  return bridgeParams
}
