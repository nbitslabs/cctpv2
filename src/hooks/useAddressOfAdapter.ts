import {
  CctpNetworkAdapter,
  CctpNetworkAdapterId,
  findNetworkAdapter,
} from "@/lib/cctp/networks";
import { useAppKitAccount } from "@reown/appkit/react";

export function useAddressOfAdapter(adapter: CctpNetworkAdapter) {
  const { address } = useAppKitAccount({
    namespace: adapter.type === "evm" ? "eip155" : "solana",
  });
  return address;
}

export function useAddressOfAdapterId(adapterId: CctpNetworkAdapterId) {
  const adapter = findNetworkAdapter(adapterId);
  if (!adapter) throw new Error(`Adapter ${adapterId} not found`);
  return useAddressOfAdapter(adapter!);
}
