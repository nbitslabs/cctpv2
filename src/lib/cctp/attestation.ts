import type { Address } from "viem"
import axios from "axios"
import type { CCTPConfig } from "@circle-fin/bridge-kit"

const apiUrl = "https://iris-api.circle.com/v2"

export const getAttestationUrl = (
  sourceDomain: CCTPConfig["domain"],
  burnTx: string
) => `${apiUrl}/messages/${sourceDomain}?transactionHash=${burnTx}`

export async function getAttestation(
  sourceDomain: CCTPConfig["domain"],
  burnTx: string
): Promise<AttestationMessage> {
  const response = await axios.get(getAttestationUrl(sourceDomain, burnTx))
  return response.data?.messages?.[0]
}

export type AttestationMessage =
  | AttestationMessageSuccess
  | {
      status: "error"
      error: string
    }
export type AttestationMessageSuccess = {
  // Only available after status='complete'
  attestation: Address
  message: Address
  eventNonce: Address
  cctpVersion: number
  status: "complete" | "pending_confirmations"
  decodedMessage: AttestationDecodedMessage | null
}

type AttestationDomain = `${number}`
interface AttestationDecodedMessage {
  sourceDomain: AttestationDomain
  destinationDomain: AttestationDomain
  nonce: Address
  sender: Address
  recipient: Address
  destinationCaller: Address
  minFinalityThreshold: string
  finalityThresholdExecuted: string
  messageBody: string
  decodedMessageBody: {
    burnToken: string
    mintRecipient: string
    amount: string
    messageSender: string
    maxFee: string
    feeExecuted: string
    expirationBlock: string
    hookData: null
  }
}
