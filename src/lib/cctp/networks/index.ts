import { evmNetworkAdapters } from "./evm";
import { CctpNetworkAdapterId } from "./type";
import { solanaNetworkAdapters } from "./solana";

export * from "./type";

export const networkAdapters = [
  ...evmNetworkAdapters,
  ...solanaNetworkAdapters,
];

export function findNetworkAdapter(networkId?: CctpNetworkAdapterId) {
  if (!networkId) return undefined;
  return networkAdapters.find((n) => n.id.toString() === networkId.toString());
}
