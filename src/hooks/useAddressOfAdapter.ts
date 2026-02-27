import { Blockchain } from "@circle-fin/bridge-kit"
import { useAppKitAccount } from "@reown/appkit/react"
import { findBlockchain } from "./bridgeKit"

export function useAddressOfAdapterId(adapterId: Blockchain | undefined) {
  const blockchain = findBlockchain(adapterId)
  const { address } = useAppKitAccount({
    namespace: blockchain?.type === "solana" ? "solana" : "eip155",
  })

  if (!blockchain) return undefined
  return address
}
