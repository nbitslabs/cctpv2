"use client"

import { useSolanaSigner } from "@/hooks/useSolanaSigner"
import type { TransactionSigner } from "@solana/kit"
import type { UiWalletAccount } from "@wallet-standard/react"
import { useEffect } from "react"

// This component is to prevent using `useSolanaSigner` while solana wallet is not active
export default function SetSolanaSigner({
  setSolanaSigner,
  solanaAccount,
}: {
  setSolanaSigner: (solanaSigner?: TransactionSigner) => void
  solanaAccount: UiWalletAccount
}) {
  const solanaSigner = useSolanaSigner(solanaAccount)

  useEffect(() => {
    setSolanaSigner(solanaSigner)
    // oxlint-disable-next-line exhaustive-deps
  }, [])

  return null
}
