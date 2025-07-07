"use client";

import { useSolanaSigner } from "@/hooks/useSolanaSigner";
import { TransactionSigner } from "gill";
import { useEffect } from "react";

// This component is to prevent using `useSolanaSigner` while solana wallet is not active
export default function SetSolanaSigner({
  setSolanaSigner,
}: {
  setSolanaSigner: (solanaSigner?: TransactionSigner) => void;
}) {
  const solanaSigner = useSolanaSigner();

  useEffect(() => {
    setSolanaSigner(solanaSigner);
  }, []);

  return null;
}
