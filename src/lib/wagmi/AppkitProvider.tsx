"use client";

import { createAppKit, ThemeMode } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, type ReactNode } from "react";
import { WagmiProvider, type Config } from "wagmi";
import { metadata, projectId, wagmiAdapter, networks } from "./config";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { solanaAdapter } from "../solana/config";
import { useTheme } from "next-themes";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3 } },
});

const appkit = createAppKit({
  adapters: [wagmiAdapter, solanaAdapter],
  projectId,
  networks,
  metadata,
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
