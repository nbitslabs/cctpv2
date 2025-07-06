import { useWalletAccountTransactionSigner } from "@solana/react";
import { useWallets } from "@wallet-standard/react";

export function useSolanaAccount() {
  const wallets = useWallets();
  const selected = wallets.find((wallet) => wallet.accounts.length > 0);
  const account = selected?.accounts[0];
  return account;
}

export function useSolanaSigner() {
  const account = useSolanaAccount();
  if (!account) throw new Error("No Solana account found");
  const messageSigner = useWalletAccountTransactionSigner(
    account,
    "solana:mainnet"
  );

  return messageSigner;
}
