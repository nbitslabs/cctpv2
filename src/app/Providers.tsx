'use client';

import { AlertDialogProvider } from '@/components/ui2/PromiseAlertDialog';
import AptosProvider from '@/lib/aptos/aptos/AptosProvider';
import { ActiveNetworkProvider } from '@/lib/cctp/providers/ActiveNetworkProvider';
import AppkitProvider from '@/lib/wagmi/AppkitProvider';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppkitProvider>
        <ActiveNetworkProvider>
          <AptosProvider>
            <AlertDialogProvider>{children}</AlertDialogProvider>
          </AptosProvider>
        </ActiveNetworkProvider>
      </AppkitProvider>
    </ThemeProvider>
  );
}
