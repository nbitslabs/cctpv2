import { evmNetworkAdapters } from "./evm";
import { CctpNetworkAdapterId } from "./type";

export * from "./type";

export const networkAdapters = [...evmNetworkAdapters];

export function findNetworkAdapter(networkId?: CctpNetworkAdapterId) {
  if (!networkId) return undefined;
  return networkAdapters.find((n) => n.id.toString() === networkId.toString());
}
