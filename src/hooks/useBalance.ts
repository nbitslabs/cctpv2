import { CctpNetworkAdapterId, findNetworkAdapter } from "@/lib/cctp/networks";
import { useActiveNetwork } from "@/lib/cctp/providers/ActiveNetworkProvider";
import { useAppKitAccount } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

export function useUsdcBalance(
  networkAdapterId?: CctpNetworkAdapterId,
  address?: string
) {
  return useQuery({
    queryKey: ["balance", "usdc", networkAdapterId, address],
    queryFn: () => {
      const network = findNetworkAdapter(networkAdapterId);
      if (!network) throw new Error(`Network ${networkAdapterId} not found`);

      return network.readUsdcBalance(address as Address);
    },
    enabled: !!networkAdapterId && !!address,
  });
}

export function useMyUsdcBalance() {
  const { address } = useAppKitAccount();
  const { activeNetwork } = useActiveNetwork();
  return useUsdcBalance(activeNetwork.id, address);
}

export function useNativeBalance(
  networkAdapterId: CctpNetworkAdapterId | undefined,
  address: string | undefined
) {
  return useQuery({
    queryKey: ["balance", "native", networkAdapterId, address],
    queryFn: () => {
      const network = findNetworkAdapter(networkAdapterId);
      if (!network) throw new Error(`Network ${networkAdapterId} not found`);
      return network.readNativeBalance(address!);
    },
    enabled: !!networkAdapterId && !!address,
  });
}

export function useMyNativeBalance() {
  const { address } = useAppKitAccount();
  const { activeNetwork } = useActiveNetwork();
  return useNativeBalance(activeNetwork.id, address);
}
