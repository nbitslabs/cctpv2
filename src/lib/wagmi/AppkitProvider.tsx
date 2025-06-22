"use client";

import { createAppKit, type AppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { WagmiProvider, type Config } from "wagmi";
import { metadata, projectId, wagmiAdapter, networks } from "./config";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Set up queryClient
export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3 } },
});

function AppkitProvider({ children }: { children: ReactNode }) {
  const [appkit, setAppkit] = useState<AppKit | null>(null);

  useEffect(() => {
    setAppkit(
      createAppKit({
        featuredWalletIds: [
          "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",
        ],
        adapters: [wagmiAdapter],
        projectId,
        networks,
        defaultNetwork: networks[0],
        metadata,
        themeMode: "light",
      })
    );
  }, []);

  if (!appkit) return null;

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
