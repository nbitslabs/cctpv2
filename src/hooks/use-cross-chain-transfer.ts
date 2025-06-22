"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AttestationMessage } from "../../global.types";
import { getAttestation } from "@/lib/cctp/attestation";
import { useActiveNetwork } from "@/lib/cctp/providers/ActiveNetworkProvider";
import {
  CctpNetworkAdapter,
  CctpNetworkAdapterId,
  CctpTransferType,
  networkAdapters,
} from "@/lib/cctp/networks";

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
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { activeNetwork, setActiveNetwork } = useActiveNetwork();
  const {
    readAllowanceForTokenMessager,
    writeApproveForTokenMessager,
    writeTokenMessagerDepositForBurn,
    simulateMessageTransmitterReceiveMessage,
    writeMessageTransmitterReceiveMessage,
  } = activeNetwork;

  const addLog = (message: string) =>
    setLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ${message}`,
    ]);

  const executeTransfer = async (
    destinationChainId: CctpNetworkAdapterId,
    amount: string,
    transferType: CctpTransferType
  ) => {
    try {
      const allowance = await readAllowanceForTokenMessager();
      const numericAmount = Number(amount);
      addLog(`Allowance: ${allowance.formatted}`);
      addLog(`Amount: ${numericAmount}`);

      if (numericAmount > allowance.formatted) {
        setCurrentStep("approving");
        await toast
          .promise(writeApproveForTokenMessager(numericAmount), {
            loading: "Approving USDC...",
            success: "USDC approved!",
            error: "Approval failed",
          })
          .unwrap();
      }

      setCurrentStep("burning");
      const destination = networkAdapters.find(
        (n) => n.id === destinationChainId
      );
      if (!destination) throw new Error("Destination network not found");

      const burnTx = await writeTokenMessagerDepositForBurn(
        numericAmount,
        destination.domain,
        { transferType }
      );

      addLog(`Burn Tx: ${burnTx}`);
      setCurrentStep("waiting-attestation");
      const attestation = await retrieveAttestation(
        burnTx,
        activeNetwork.domain
      );

      setCurrentStep("minting");
      await setActiveNetwork(destinationChainId);

      const simulationResult = await simulateMessageTransmitterReceiveMessage(
        attestation.message,
        attestation.attestation
      );
      if (!simulationResult) throw new Error("Simulation failed");
      const mintTx = await writeMessageTransmitterReceiveMessage(
        attestation.message,
        attestation.attestation
      );
      addLog(`Mint Tx: ${mintTx}`);

      setCurrentStep("completed");
    } catch (error) {
      setCurrentStep("error");
      addLog(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
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
  return new Promise<AttestationMessage>((resolve, reject) => {
    let timeout: NodeJS.Timeout;
    const interval = setInterval(async () => {
      const response = await getAttestation(sourceChainDomain, transactionHash);

      if (response.status === "complete") {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve(response);
      }
    }, 5000);

    timeout = setTimeout(
      () => {
        clearInterval(interval);
        reject(new Error("Timeout waiting for attestation"));
      },
      5 * 60 * 1000
    );
  });
};
