"use client";

import { useState } from "react";
import {
  AttestationMessage,
  AttestationMessageSuccess,
  getAttestation,
  getAttestationUrl,
} from "@/lib/cctp/attestation";
import { useActiveNetwork } from "@/lib/cctp/providers/ActiveNetworkProvider";
import {
  CctpNetworkAdapter,
  CctpNetworkAdapterId,
  CctpV2TransferType,
  findNetworkAdapter,
} from "@/lib/cctp/networks";
import { useAppKitAccount } from "@reown/appkit/react";
import { TransactionSigner } from "gill";
import { AlertCircle, CheckCircle } from "lucide-react";
import ExternalLink from "@/components/ui2/ExternalLink";
import { shortenAddress } from "@/lib/utils";
import CopyIconTooltip from "@/components/ui2/CopyIconTooltip";

export type TransferStep =
  | "idle"
  | "approving"
  | "burning"
  | "waiting-attestation"
  | "minting"
  | "completed"
  | "error";

export function useCrossChainTransfer() {
  const [currentStep, setCurrentStep] = useState<TransferStep>("idle");
  const [logs, setLogs] = useState<React.ReactNode[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setActiveNetwork } = useActiveNetwork();
  const { address } = useAppKitAccount();
  const [attestation, setAttestation] =
    useState<AttestationMessageSuccess | null>(null);

  const addLog = (message: React.ReactNode) =>
    setLogs((prev) => [
      ...prev,
      <li key={prev.length} className="flex items-center gap-1">
        [{new Date().toLocaleTimeString()}] {message}
      </li>,
    ]);

  const executeTransfer = async (
    params: RequiredExecuteTransferParams &
      (
        | { amount: string; transferType: CctpV2TransferType }
        | { burnTxHash: string }
      )
  ) => {
    if (!address) throw new Error("No account found");
    const { sourceChainId, destinationChainId, mintRecipient } = params;
    const sourceNetwork = findNetworkAdapter(sourceChainId);
    if (!sourceNetwork) throw new Error("Source network not found");

    const destNetwork = findNetworkAdapter(destinationChainId);
    if (!destNetwork) throw new Error("Destination network not found");

    try {
      let burnTx: string;
      if ("burnTxHash" in params) {
        burnTx = params.burnTxHash;
      } else {
        const { amount, transferType } = params;
        const numericAmount = Number(amount);

        addLog(`Initiating deposit for burn ${amount} USDC...`);
        setCurrentStep("burning");
        const destination = findNetworkAdapter(destinationChainId);
        if (!destination) throw new Error("Destination network not found");

        await setActiveNetwork(sourceChainId);
        burnTx = await sourceNetwork.writeTokenMessagerDepositForBurn(
          {
            address,
            amount: numericAmount,
            destination,
            transferType,
            mintRecipient,
          },
          { version: "v2", solanaSigner: params.solanaSigner }
        );
        addLog(
          <>
            <CheckCircle className="size-4 text-green-600" />
            Burn transaction:{" "}
            <ExternalLink
              href={`${sourceNetwork.explorer?.url}/tx/${burnTx}`}
              className=" font-mono text-sm"
            >
              {shortenAddress(burnTx, 6)}
            </ExternalLink>
            <CopyIconTooltip text={burnTx} />
          </>
        );
      }

      setCurrentStep("waiting-attestation");
      addLog("Waiting for attestation...");
      const { url, result: attestation } = await retrieveAttestation(
        burnTx,
        sourceNetwork.domain
      );
      addLog(
        <>
          <CheckCircle className="size-4 text-green-600" />
          Attestation received.{" "}
          <ExternalLink href={url} className=" text-sm">
            {shortenAddress(attestation.attestation, 8)}
          </ExternalLink>
          <CopyIconTooltip text={attestation.attestation} />
        </>
      );
      setAttestation(attestation);

      // Switch network before request "receiveMessage" transaction
      await setActiveNetwork(destinationChainId);

      setCurrentStep("minting");
      const simulationResult =
        await destNetwork.simulateMessageTransmitterReceiveMessage(
          attestation.message,
          attestation.attestation,
          { version: "v2", solanaSigner: params.solanaSigner }
        );
      if (!simulationResult) throw new Error("Simulation failed");
      addLog("Waiting for mint...");
      if (!sourceNetwork) throw new Error("Source adapter not found");
      const mintTx = await destNetwork.writeMessageTransmitterReceiveMessage(
        attestation.message,
        attestation.attestation,
        sourceNetwork,
        { version: "v2", solanaSigner: params.solanaSigner }
      );

      addLog(
        <>
          <CheckCircle className="size-4 text-green-600" />
          Mint Tx:{" "}
          <ExternalLink
            href={`${destNetwork.explorer?.url}/tx/${mintTx}`}
            className="text-sm"
          >
            {shortenAddress(mintTx, 6)}
          </ExternalLink>
          <CopyIconTooltip text={mintTx} />
        </>
      );

      setCurrentStep("completed");
    } catch (error) {
      console.log(error);

      setCurrentStep("error");
      addLog(
        <>
          <AlertCircle className="size-4 text-red-500" />
          Error: {error instanceof Error ? error.message : "Unknown error"}
        </>
      );
    }
  };

  const reset = () => {
    setCurrentStep("idle");
    setLogs([]);
    setError(null);
  };

  return {
    currentStep,
    logs,
    error,
    executeTransfer,
    reset,
  };
}

const retrieveAttestation = async (
  transactionHash: string,
  sourceChainDomain: CctpNetworkAdapter["domain"]
) => {
  return new Promise<{ url: string; result: AttestationMessageSuccess }>(
    async (resolve, reject) => {
      async function resolveWhenComplete(cleanup?: () => void) {
        const response = await getAttestation(
          sourceChainDomain,
          transactionHash
        ).catch(
          (e) =>
            ({
              status: "error",
              error: e.message,
            }) satisfies AttestationMessage
        );
        if (response.status === "complete") {
          cleanup?.();
          resolve({
            url: getAttestationUrl(sourceChainDomain, transactionHash),
            result: response,
          });
        }
      }

      await resolveWhenComplete();
      let timeout: NodeJS.Timeout;
      const interval = setInterval(async () => {
        resolveWhenComplete(() => {
          clearInterval(interval);
          clearTimeout(timeout);
        });
      }, 5000);

      timeout = setTimeout(
        () => {
          clearInterval(interval);
          reject(new Error("Timeout waiting for attestation"));
        },
        5 * 60 * 1000
      );
    }
  );
};

export type RequiredExecuteTransferParams = {
  sourceChainId: CctpNetworkAdapterId;
  destinationChainId: CctpNetworkAdapterId;
  mintRecipient: string;
  solanaSigner?: TransactionSigner;
};
