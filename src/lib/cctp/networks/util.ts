import {
  CctpV1SupportedChainId,
  CctpV2SupportedChainId,
  messageTransmitterV1Addresses,
  messageTransmitterV2Addresses,
  tokenMessagerV1Addresses,
  tokenMessagerV2Addresses,
  usdcAddresses,
} from "@/lib/wagmi/config";
import {
  CctpFunctionOpts,
  CctpNetworkAdapter,
  CctpNetworkAdapterId,
} from "./type";
import { getBase58Encoder, address as solAddress } from "gill";
import { bytesToHex } from "viem";
import { getATA2 } from "@/lib/solana/utils";
import { solana } from "@reown/appkit/networks";

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
  chainId: CctpNetworkAdapterId
) {
  return cctpOpts.version === "v1"
    ? messageTransmitterV1Addresses[chainId as CctpV1SupportedChainId]
    : messageTransmitterV2Addresses[chainId as CctpV2SupportedChainId];
}

export function getEvmAddressFromSolanaAddress(address: string) {
  return bytesToHex(
    getBase58Encoder().encode(solAddress(address)) as Uint8Array
  );
}

export async function formatDestinationAddress(
  address: string,
  {
    source,
    destination,
  }: Record<"source" | "destination", CctpNetworkAdapter["type"]>
) {
  if (source === "evm" && destination === "solana") {
    const userTokenAddress = await getATA2(usdcAddresses[solana.id], address);
    return getEvmAddressFromSolanaAddress(userTokenAddress);
  }
  return address;
}
