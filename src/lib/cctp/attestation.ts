import { Address } from "viem";
import { CctpNetworkAdapter } from "./networks";
import axios from "axios";

const apiUrl =
  process.env.NEXT_PUBLIC_TESTNET === "true"
    ? "https://iris-api-sandbox.circle.com/v2"
    : "https://iris-api.circle.com/v2";

export async function getAttestation(
  sourceDomain: CctpNetworkAdapter["domain"],
  burnTx: string
): Promise<AttestationMessage> {
  const url = `${apiUrl}/messages/${sourceDomain}`;
  const response = await axios.get(url, {
    params: { transactionHash: burnTx },
  });
  return response.data?.messages?.[0];
}

export interface AttestationMessage {
  // Only available after status='complete'
  attestation: Address;
  message: Address;
  eventNonce: Address;
  cctpVersion: number;
  status: "complete" | "pending_confirmations";
  decodedMessage: AttestationDecodedMessage | null;
}

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
