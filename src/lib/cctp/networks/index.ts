import { evmNetworkAdapters } from "./evm"
import type { CctpNetworkAdapterId } from "./type"

export * from "./type"

export const networkAdapters = [...evmNetworkAdapters]

/**
 * @deprecated Use `findBlockchain` from `@circle-fin/bridge-kit` instead
 */
export function findNetworkAdapter(networkId?: CctpNetworkAdapterId) {
  if (!networkId) {
    return undefined
  }
  return networkAdapters.find((n) => n.id.toString() === networkId.toString())
}
