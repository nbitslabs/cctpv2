"use client";

import { AppKit, createAppKit, ThemeMode } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useEffect, type ReactNode } from "react";
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
      <AppkitInstanceContext.Provider value={appkit}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AppkitInstanceContext.Provider>
    </WagmiProvider>
  );
}

export default AppkitProvider;

const AppkitInstanceContext = createContext<AppKit | null>(null);

export function useAppkitInstance() {
  const context = useContext(AppkitInstanceContext);
  if (!context) {
    throw new Error("useAppkitInstance must be used within an AppkitProvider");
  }
  return context;
}
