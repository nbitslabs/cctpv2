import {
  CctpNetworkAdapter,
  CctpNetworkAdapterId,
  findNetworkAdapter,
} from '@/lib/cctp/networks';
import { useAppKitAccount } from '@reown/appkit/react';
import { useEffect } from 'react';

export function useAddressOfAdapter(adapter?: CctpNetworkAdapter) {
  const { address } = useAppKitAccount({
    namespace: adapter?.type === 'evm' ? 'eip155' : 'solana',
  });
  return address;
}

export function useAddressOfAdapterId(adapterId: CctpNetworkAdapterId) {
  const adapter = findNetworkAdapter(adapterId);
  const adapterAddress = useAddressOfAdapter(adapter);

  useEffect(() => {
    if (!adapter) {
      console.warn(`No adapter found for id ${adapterId}`);
    }
  }, [adapter, adapterId]);

  if (!adapter) return undefined;
  return adapterAddress;
}
