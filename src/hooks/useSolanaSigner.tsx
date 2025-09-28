import { isAddress } from "@solana/kit";
import { useWalletAccountTransactionSigner } from "@solana/react";
import { UiWalletAccount, useWallets } from "@wallet-standard/react";

export function useSolanaAccount() {
  const wallets = useWallets();
  const selected = wallets.find((wallet) => wallet.accounts.length > 0);
  const account = selected?.accounts[0];
  if (account?.address && isAddress(account.address)) return account;
  return undefined;
}

export function useSolanaSigner(account: UiWalletAccount) {
  const messageSigner = useWalletAccountTransactionSigner(
    account,
    "solana:mainnet"
  );

  return messageSigner;
}
