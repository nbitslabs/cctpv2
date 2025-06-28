"use client";

import AppkitProvider from "@/lib/wagmi/AppkitProvider";
import { ActiveNetworkProvider } from "@/lib/cctp/providers/ActiveNetworkProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppkitProvider>
      <ActiveNetworkProvider>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        {children}
        {/* </ThemeProvider> */}
      </ActiveNetworkProvider>
    </AppkitProvider>
  );
}
