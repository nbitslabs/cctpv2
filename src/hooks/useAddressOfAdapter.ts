import { Blockchain } from "@circle-fin/bridge-kit"
import { useAppKitAccount } from "@reown/appkit/react"
import { useEffect } from "react"
import { findBlockchain } from "./bridgeKit"

export function useAddressOfAdapterId(adapterId: Blockchain) {
  const blockchain = findBlockchain(adapterId)
  const { address } = useAppKitAccount({
    namespace: blockchain?.type === "solana" ? "solana" : "eip155",
  })

  useEffect(() => {
    if (!blockchain) {
      console.warn(`No adapter found for id ${adapterId}`)
    }
  }, [blockchain, adapterId])

  if (!blockchain) return undefined
  return address
}
