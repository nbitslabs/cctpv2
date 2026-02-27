import { getAccountTransactions } from "@/lib/alchemy/account"
import { Blockchain } from "@circle-fin/bridge-kit"
import { useQuery } from "@tanstack/react-query"

export function useAccountTransactions(
  blockchainId: Blockchain | undefined,
  address: string | undefined
) {
  return useQuery({
    queryKey: ["transfers", blockchainId, address],
    queryFn: () => getAccountTransactions(blockchainId!, address!),
    enabled:
      (!!address && !!blockchainId) || blockchainId !== Blockchain.Solana,
  })
}
