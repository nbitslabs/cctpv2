'use client';

import { SolanaAdapter } from '@reown/appkit-adapter-solana/react';
import { createAppKit, ThemeMode } from '@reown/appkit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useTheme } from 'next-themes';
import { useEffect, type ReactNode } from 'react';
import { WagmiProvider, type Config } from 'wagmi';
import {
  codex,
  hyperEvm,
  metadata,
  networks,
  projectId,
  wagmiAdapter,
} from './config';

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3 } },
});

const appkit = createAppKit({
  adapters: [wagmiAdapter, new SolanaAdapter()],
  projectId,
  networks,
  metadata,
  chainImages: {
    [codex.id]: codex.assets.imageUrl,
    [hyperEvm.id]: hyperEvm.assets.imageUrl,
  },
});

function AppkitProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    appkit.setThemeMode(resolvedTheme as ThemeMode);
  }, [resolvedTheme]);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default AppkitProvider;
