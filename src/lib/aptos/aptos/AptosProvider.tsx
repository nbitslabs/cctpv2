import { PropsWithChildren } from 'react';
import { AptosJSCoreProvider } from '@aptos-labs/react';
import { useWalletAdapterCore } from '@aptos-labs/react/connectors';
import {
  AptosWalletAdapterProvider,
  useWallet,
} from '@aptos-labs/wallet-adapter-react';
import { Network } from '@aptos-labs/ts-sdk';

function AptosCoreProvider({ children }: PropsWithChildren) {
  const wallet = useWallet();

  const core = useWalletAdapterCore({ wallet });

  return <AptosJSCoreProvider core={core}>{children}</AptosJSCoreProvider>;
}

export default function AptosProvider({ children }: PropsWithChildren) {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{
        network: Network.MAINNET,
        aptosApiKeys: {
          mainnet: process.env.APTOS_API_KEY_MAINNET,
        },
      }}
      onError={(error) => {
        console.log('error', error);
      }}
    >
      <AptosCoreProvider>{children}</AptosCoreProvider>
    </AptosWalletAdapterProvider>
  );
}
