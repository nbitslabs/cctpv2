import { CctpNetworkAdapterId, findNetworkAdapter } from "@/lib/cctp/networks";
import { useActiveNetwork } from "@/lib/cctp/providers/ActiveNetworkProvider";
import { useQuery } from "@tanstack/react-query";

export function useUsdcBalance(networkAdapterId?: CctpNetworkAdapterId) {
  return useQuery({
    queryKey: ["balance", "usdc", networkAdapterId],
    queryFn: () => {
      const network = findNetworkAdapter(networkAdapterId);
      if (!network) throw new Error(`Network ${networkAdapterId} not found`);

      return network.readUsdcBalance();
    },
    enabled: !!networkAdapterId,
  });
}

export function useMyUsdcBalance() {
  const { activeNetwork } = useActiveNetwork();
  return useUsdcBalance(activeNetwork.id);
}

export function useNativeBalance(networkAdapterId?: CctpNetworkAdapterId) {
  return useQuery({
    queryKey: ["balance", "native", networkAdapterId],
    queryFn: () => {
      const network = findNetworkAdapter(networkAdapterId);
      if (!network) throw new Error(`Network ${networkAdapterId} not found`);
      return network.readNativeBalance();
    },
    enabled: !!networkAdapterId,
  });
}

export function useMyNativeBalance() {
  const { activeNetwork } = useActiveNetwork();
  return useNativeBalance(activeNetwork.id);
}
