import { useWalletAccountTransactionSigner } from "@solana/react";
import { useWallets } from "@wallet-standard/react";

export function useSolanaSigner() {
  const wallets = useWallets();
  const selected = wallets.find((wallet) => wallet.accounts.length > 0);
  const account = selected?.accounts[0];

  const messageSigner = useWalletAccountTransactionSigner(
    account!,
    "solana:mainnet"
  );

  return messageSigner;
}
