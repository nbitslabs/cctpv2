import { Address } from "viem";
import { CctpNetworkAdapter } from "./networks";
import axios from "axios";

const apiUrl =
  process.env.NEXT_PUBLIC_TESTNET === "true"
    ? "https://iris-api-sandbox.circle.com/v2"
    : "https://iris-api.circle.com/v2";

export const getAttestationUrl = (
  sourceDomain: CctpNetworkAdapter["domain"],
  burnTx: string
) => `${apiUrl}/messages/${sourceDomain}?transactionHash=${burnTx}`;

export async function getAttestation(
  sourceDomain: CctpNetworkAdapter["domain"],
  burnTx: string
): Promise<AttestationMessage> {
  const response = await axios.get(getAttestationUrl(sourceDomain, burnTx));
  return response.data?.messages?.[0];
}

export type AttestationMessage =
  | AttestationMessageSuccess
  | {
      status: "error";
      error: string;
    };
export type AttestationMessageSuccess = {
  // Only available after status='complete'
  attestation: Address;
  message: Address;
  eventNonce: Address;
  cctpVersion: number;
  status: "complete" | "pending_confirmations";
  decodedMessage: AttestationDecodedMessage | null;
};

type AttestationDomain = `${number}`;
interface AttestationDecodedMessage {
  sourceDomain: AttestationDomain;
  destinationDomain: AttestationDomain;
  nonce: Address;
  sender: Address;
  recipient: Address;
  destinationCaller: Address;
  minFinalityThreshold: string;
  finalityThresholdExecuted: string;
  messageBody: string;
  decodedMessageBody: {
    burnToken: string;
    mintRecipient: string;
    amount: string;
    messageSender: string;
    maxFee: string;
    feeExecuted: string;
    expirationBlock: string;
    hookData: null;
  };
}
