"use client";

import { useState } from "react";
import { TransactionExecutionError, parseUnits, Address } from "viem";
import axios from "axios";
import {
  SupportedChainId,
  CHAIN_IDS_TO_USDC_ADDRESSES,
  DESTINATION_DOMAINS,
} from "@/lib/chains";
import { toast } from "sonner";
import {
  readUsdcAllowance,
  readUsdcDecimals,
  simulateMessageTransmitterReceiveMessage,
  tokenMessagerAddress,
  useWriteUsdcApprove,
  writeMessageTransmitterReceiveMessage,
  writeTokenMessagerDepositForBurn,
} from "@/lib/wagmi/generated";
import { getAccount, getChainId, switchChain } from "wagmi/actions";
import { wagmiConfig } from "@/lib/wagmi/config";
import { AttestationMessage } from "../../global.types";

export type SupportedSourceChainId = keyof typeof tokenMessagerAddress;

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
  const { writeContractAsync: writeUsdcApprove } = useWriteUsdcApprove();

  const addLog = (message: string) =>
    setLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ${message}`,
    ]);

  const executeTransfer = async (
    sourceChainId: SupportedSourceChainId,
    destinationChainId: SupportedSourceChainId,
    amount: string,
    transferType: "fast" | "standard"
  ) => {
    try {
      const usdcDecimals = await readUsdcDecimals(wagmiConfig, {});
      const numericAmount = parseUnits(amount, usdcDecimals);
      const { address } = getAccount(wagmiConfig);
      if (!address) return;
      const defaultDestination = address;

      const usdcApproval = await readUsdcAllowance(wagmiConfig, {
        args: [tokenMessagerAddress[sourceChainId], address],
      });

      if (usdcApproval < numericAmount) {
        setCurrentStep("approving");
        await toast
          .promise(
            writeUsdcApprove({
              args: [tokenMessagerAddress[sourceChainId], numericAmount],
            }),
            {
              loading: "Approving USDC...",
              success: "USDC approved!",
              error: "Approval failed",
            }
          )
          .unwrap();
      }

      setCurrentStep("burning");
      const burnTx = await burnUSDC(
        sourceChainId,
        numericAmount,
        destinationChainId,
        defaultDestination,
        transferType
      );

      addLog(`Burn Tx: ${burnTx}`);
      setCurrentStep("waiting-attestation");
      const attestation = await retrieveAttestation(burnTx, sourceChainId);

      // const minBalance = parseEther("0.01"); // 0.01 native token
      // const balance = await getBalance(wagmiConfig.getClient(), {
      //   address: defaultDestination,
      // });
      // if (balance < minBalance) {
      //   throw new Error("Insufficient native token for gas fees");
      // }

      setCurrentStep("minting");
      const mintTx = await mintUSDC(destinationChainId, attestation, addLog);
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

async function getAttestation(
  sourceChainId: SupportedSourceChainId,
  burnTx: Address
): Promise<AttestationMessage> {
  const destinationDomain = DESTINATION_DOMAINS[sourceChainId as number];
  const url = `https://iris-api-sandbox.circle.com/v2/messages/${destinationDomain}`;
  const response = await axios.get(url, {
    params: { transactionHash: burnTx },
  });
  return response.data?.messages?.[0];
}

const burnUSDC = async (
  sourceChainId: SupportedSourceChainId,
  amount: bigint,
  destinationChainId: SupportedSourceChainId,
  destinationAddress: string,
  transferType: "fast" | "standard"
) => {
  const finalityThreshold = transferType === "fast" ? 1000 : 2000;
  const maxFee = amount - 1n;
  const mintRecipient = `0x${destinationAddress
    .replace(/^0x/, "")
    .padStart(64, "0")}` as const;

  const tx = await writeTokenMessagerDepositForBurn(wagmiConfig, {
    args: [
      amount,
      DESTINATION_DOMAINS[destinationChainId],
      mintRecipient,
      CHAIN_IDS_TO_USDC_ADDRESSES[sourceChainId],
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      maxFee,
      finalityThreshold,
    ],
  });

  return tx;
};

const retrieveAttestation = async (
  transactionHash: Address,
  sourceChainId: SupportedSourceChainId
) => {
  return new Promise<AttestationMessage>((resolve, reject) => {
    let timeout: NodeJS.Timeout;
    const interval = setInterval(async () => {
      const response = await getAttestation(sourceChainId, transactionHash);

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
      2 * 60 * 1000
    );
  });
};

const mintUSDC = async (
  destinationChainId: SupportedChainId,
  attestation: AttestationMessage,
  addLog: (message: string) => void
) => {
  const MAX_RETRIES = 3;
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const chainId = getChainId(wagmiConfig);
      if (chainId !== destinationChainId) {
        await switchChain(wagmiConfig, { chainId: destinationChainId });
      }

      const simulationResult = await simulateMessageTransmitterReceiveMessage(
        wagmiConfig,
        { args: [attestation.message, attestation.attestation] }
      );

      if (!simulationResult.result) throw new Error("Simulation failed");

      // // Add 20% buffer to gas estimate
      // const gasWithBuffer = (gasEstimate * 120n) / 100n;
      // addLog(`Gas Used: ${formatUnits(gasWithBuffer, 9)} Gwei`);

      const tx = await writeMessageTransmitterReceiveMessage(wagmiConfig, {
        args: [attestation.message, attestation.attestation],
      });

      return tx;
    } catch (err) {
      if (err instanceof TransactionExecutionError && retries < MAX_RETRIES) {
        retries++;
        addLog(`Retry ${retries}/${MAX_RETRIES}...`);
        await new Promise((resolve) => setTimeout(resolve, 2000 * retries));
        continue;
      }
      throw err;
    }
  }
};
