"use client";

import { createAppKit, type AppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { WagmiProvider, type Config } from "wagmi";
import { metadata, projectId, wagmiAdapter, networks } from "./config";
import { sepolia } from "viem/chains";

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
        defaultNetwork: sepolia,
        metadata,
        themeMode: "light",
      })
    );
  }, []);

  if (!appkit) return null;

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default AppkitProvider;
