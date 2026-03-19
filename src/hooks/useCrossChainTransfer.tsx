"use client"

import CopyIconTooltip from "@/components/ui2/CopyIconTooltip"
import ExternalLink from "@/components/ui2/ExternalLink"
import { getAttestation } from "@/lib/cctp/attestation"
import { alchemySolanaRpcUrl, USDC_DECIMALS } from "@/lib/constants"
import { shortenAddress } from "@/lib/utils"
import {
  ActionHandler,
  BridgeKit,
  ChainDefinition,
  getErrorMessage,
} from "@circle-fin/bridge-kit"
import { useAppKitAccount } from "@reown/appkit/react"
import { AlertCircle, CheckCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { formatUnits, Hash } from "viem"
import { findBlockchain } from "./bridgeKit"
import {
  RequiredExecuteTransferParams,
  useBridgeKitParams,
} from "./useBridgeKitParams"

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

  const executeTransfer = async (props: { burnTxHash?: string }) => {
    try {
      if (!bridgeKitParams) throw new Error("Bridge parameters not ready")

      if ("burnTxHash" in props && props.burnTxHash) {
        const sourceChain = findBlockchain(params.sourceChainId)
        if (!sourceChain?.cctp) throw new Error("Source network not found")
        const attestationMessage = await getAttestation(
          sourceChain.cctp.domain,
          props.burnTxHash
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
