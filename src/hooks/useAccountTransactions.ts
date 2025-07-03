import { getAccountTransactions } from "@/lib/alchemy/account";
import { CctpNetworkAdapterId } from "@/lib/cctp/networks";
import { solana } from "@reown/appkit/networks";
import { useQuery } from "@tanstack/react-query";

export function useAccountTransactions(
  networkAdapterId: CctpNetworkAdapterId | undefined,
  address: string | undefined
) {
  return useQuery({
    queryKey: ["transfers", networkAdapterId, address],
    queryFn: () => getAccountTransactions(networkAdapterId!, address!),
    enabled:
      (!!address && !!networkAdapterId) || networkAdapterId !== solana.id,
  });
}
