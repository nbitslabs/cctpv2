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
  CctpFunctionOpts,
  CctpNetworkAdapter,
  CctpNetworkAdapterId,
  findNetworkAdapter,
} from "@/lib/cctp/networks";
import { useAppKitAccount } from "@reown/appkit/react";
import { AlertCircle, CheckCircle } from "lucide-react";
import ExternalLink from "@/components/ui2/ExternalLink";
import { shortenAddress } from "@/lib/utils";
import CopyIconTooltip from "@/components/ui2/CopyIconTooltip";
import { nativeChainIds, wormhole, Wormhole } from "@wormhole-foundation/sdk";
import { getEvmSignerForSigner } from "@wormhole-foundation/sdk-evm";
import { getSolanaSignAndSendSigner } from "@wormhole-foundation/sdk-solana";
import evm from "@wormhole-foundation/sdk/evm";
import solana from "@wormhole-foundation/sdk/solana";
import { parseUnits } from "viem";
import { USDC_DECIMALS } from "@/lib/cctp/networks/constants";
import { startCase } from "lodash-es";
import { clientToSigner } from "@/lib/wagmi/util";
import { getWalletClient } from "wagmi/actions";
import { wagmiConfig } from "@/lib/wagmi/config";
import { generateKeyPair } from "gill";

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
      ({ amount: string } | { burnTxHash: string })
  ) => {
    if (!address) throw new Error("No account found");
    const {
      sourceChainId,
      destinationChainId,
      mintRecipient,
      version,
      solanaSigner,
    } = params;

    let wh: Wormhole<"Mainnet">;
    if (version === "v1") {
      if ("burnTxHash" in params) throw new Error("Burn tx hash not supported");

      wh = await wormhole("Mainnet", [evm, solana]);
      const sourceNetwork = await setActiveNetwork(sourceChainId);
      const wormholeSourceChain =
        nativeChainIds.platformNativeChainIdToNetworkChain(
          startCase(sourceNetwork.type) as "Evm" | "Solana",
          typeof sourceChainId === "number"
            ? `bigint(${sourceChainId})`
            : sourceChainId
        );
      const destinationNetwork = findNetworkAdapter(destinationChainId);
      if (!destinationNetwork) throw new Error("Destination network not found");
      const wormholeDestinationChain =
        nativeChainIds.platformNativeChainIdToNetworkChain(
          startCase(destinationNetwork.type) as "Evm" | "Solana",
          typeof destinationChainId === "number"
            ? `bigint(${destinationChainId})`
            : destinationChainId
        );
      if (!wormholeSourceChain) throw new Error("Invalid source chain");
      const sendChain = wh.getChain(wormholeSourceChain[1]);

      const amountBigInt = parseUnits(params.amount, USDC_DECIMALS);
      const xfer = await wh.circleTransfer(
        amountBigInt,
        Wormhole.chainAddress(wormholeSourceChain[1], params.fromAddress),
        Wormhole.chainAddress(wormholeDestinationChain[1], mintRecipient),
        true
      );

      const wallet = await generateKeyPair();

      const signer =
        sourceNetwork.type === "evm"
          ? await getEvmSignerForSigner(
              clientToSigner(await getWalletClient(wagmiConfig)) as never
            )
          : await getSolanaSignAndSendSigner(await sendChain.getRpc());
      return;
    }

    const sourceNetwork = await setActiveNetwork(sourceChainId);
    try {
      let burnTx: string;
      if ("burnTxHash" in params) {
        burnTx = params.burnTxHash;
      } else {
        const { amount } = params;
        const numericAmount = Number(amount);

        addLog(`Initiating deposit for burn ${amount} USDC...`);
        setCurrentStep("burning");
        const destination = findNetworkAdapter(destinationChainId);
        if (!destination) throw new Error("Destination network not found");

        burnTx = await sourceNetwork.writeTokenMessagerDepositForBurn(
          { address, amount: numericAmount, destination, mintRecipient },
          { version, solanaSigner }
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

      // setCurrentStep("completed");
      setCurrentStep("minting");
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
    attestation,
    executeTransfer,
    reset,
    setCurrentStep,
    addLog,
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

export type RequiredExecuteTransferParams = CctpFunctionOpts & {
  sourceChainId: CctpNetworkAdapterId;
  destinationChainId: CctpNetworkAdapterId;
  mintRecipient: string;
};
