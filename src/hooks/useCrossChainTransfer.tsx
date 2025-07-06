"use client";

import { useState } from "react";
import {
  AttestationMessage,
  AttestationMessageSuccess,
  getAttestation,
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

  const addLog = (message: React.ReactNode) =>
    setLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ${message}`,
    ]);

  const executeTransfer = async (
    params: {
      sourceChainId: CctpNetworkAdapterId;
      destinationChainId: CctpNetworkAdapterId;
      mintRecipient: string;
      solanaSigner?: TransactionSigner;
    } & (
      | { amount: string; transferType: CctpV2TransferType }
      | { burnTxHash: string }
    )
  ) => {
    if (!address) throw new Error("No account found");
    const { sourceChainId, destinationChainId } = params;
    const sourceNetwork = await setActiveNetwork(sourceChainId);
    const { writeTokenMessagerDepositForBurn, domain: sourceDomain } =
      sourceNetwork;
    try {
      let burnTx: string;
      if ("burnTxHash" in params) {
        burnTx = params.burnTxHash;
      } else {
        const { amount, transferType } = params;
        const numericAmount = Number(amount);

        setCurrentStep("burning");
        const destination = findNetworkAdapter(destinationChainId);
        if (!destination) throw new Error("Destination network not found");

        burnTx = await writeTokenMessagerDepositForBurn(
          {
            address,
            amount: numericAmount,
            destination,
            transferType,
            mintRecipient: params.mintRecipient,
          },
          { version: "v2", solanaSigner: params.solanaSigner }
        );
        addLog(
          `Burn Tx: ${burnTx} (${sourceNetwork.explorer?.url}/tx/${burnTx})`
        );
      }
      setCurrentStep("waiting-attestation");
      addLog("Waiting for attestation...");
      const attestation = await retrieveAttestation(burnTx, sourceDomain);
      setCurrentStep("minting");
      const destinationNetwork = await setActiveNetwork(destinationChainId);
      const {
        simulateMessageTransmitterReceiveMessage,
        writeMessageTransmitterReceiveMessage,
      } = destinationNetwork;

      const simulationResult = await simulateMessageTransmitterReceiveMessage(
        attestation.message,
        attestation.attestation
      );
      if (!simulationResult) throw new Error("Simulation failed");
      addLog("Waiting for mint approval...");
      const mintTx = await writeMessageTransmitterReceiveMessage(
        attestation.message,
        attestation.attestation
      );
      addLog(
        `Mint Tx: ${mintTx} (${destinationNetwork.explorer?.url}/tx/${mintTx})`
      );

      setCurrentStep("completed");
    } catch (error) {
      console.log(error);

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
  return new Promise<AttestationMessageSuccess>(async (resolve, reject) => {
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
      resolve(response);
    }

    let timeout: NodeJS.Timeout;
    const interval = setInterval(async () => {
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
