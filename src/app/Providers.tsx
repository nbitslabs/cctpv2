"use client";

import AppkitProvider from "@/lib/wagmi/AppkitProvider";
import { ActiveNetworkProvider } from "@/lib/cctp/providers/ActiveNetworkProvider";
import { AlertDialogProvider } from "@/components/ui2/PromiseAlertDialog";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppkitProvider>
        <ActiveNetworkProvider>
          <AlertDialogProvider>{children}</AlertDialogProvider>
        </ActiveNetworkProvider>
      </AppkitProvider>
    </ThemeProvider>
  );
}
