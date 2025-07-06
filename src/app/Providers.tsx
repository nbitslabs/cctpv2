"use client";

import AppkitProvider from "@/lib/wagmi/AppkitProvider";
import { ActiveNetworkProvider } from "@/lib/cctp/providers/ActiveNetworkProvider";
import { AlertDialogProvider } from "@/components/ui2/PromiseAlertDialog";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppkitProvider>
      <ActiveNetworkProvider>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        <AlertDialogProvider>{children}</AlertDialogProvider>
        {/* </ThemeProvider> */}
      </ActiveNetworkProvider>
    </AppkitProvider>
  );
}
