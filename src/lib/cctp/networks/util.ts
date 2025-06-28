import {
  CctpV1SupportedChainId,
  CctpV2SupportedChainId,
  messageTransmitterV1Addresses,
  messageTransmitterV2Addresses,
  tokenMessagerV1Addresses,
  tokenMessagerV2Addresses,
} from "@/lib/wagmi/config";
import { CctpFunctionOpts, CctpNetworkAdapterId } from "./type";

export function getTokenMessagerAddress(
  cctpOpts: CctpFunctionOpts,
  chainId: CctpNetworkAdapterId
) {
  return cctpOpts.version === "v1"
    ? tokenMessagerV1Addresses[chainId as CctpV1SupportedChainId]
    : tokenMessagerV2Addresses[chainId as CctpV2SupportedChainId];
}

export function getMessageTransmitterAddress(
  cctpOpts: CctpFunctionOpts,
  chainId: number
) {
  return cctpOpts.version === "v1"
    ? messageTransmitterV1Addresses[chainId as CctpV1SupportedChainId]
    : messageTransmitterV2Addresses[chainId as CctpV2SupportedChainId];
}
