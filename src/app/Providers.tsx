'use client';

import AppkitProvider from '@/lib/wagmi/AppkitProvider';
import { ActiveNetworkProvider } from '@/lib/cctp/providers/ActiveNetworkProvider';
import { AlertDialogProvider } from '@/components/ui2/PromiseAlertDialog';
import { ThemeProvider } from 'next-themes';
import { LifiWidgetProvider } from '@/components/ui2/LifiWidget';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppkitProvider>
        <ActiveNetworkProvider>
          <LifiWidgetProvider>
            <AlertDialogProvider>{children}</AlertDialogProvider>
          </LifiWidgetProvider>
        </ActiveNetworkProvider>
      </AppkitProvider>
    </ThemeProvider>
  );
}
