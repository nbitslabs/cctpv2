import { Address } from "viem";

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
