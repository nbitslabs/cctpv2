"use client";

import { createAppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { WagmiProvider, type Config } from "wagmi";
import { metadata, projectId, wagmiAdapter, networks } from "./config";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { solanaAdapter } from "../solana/config";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3 } },
});

createAppKit({
  adapters: [wagmiAdapter, solanaAdapter],
  projectId,
  networks,
  metadata,
  themeMode: "light",
});

function AppkitProvider({ children }: { children: ReactNode }) {
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
