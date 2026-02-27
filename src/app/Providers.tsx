"use client"

import { LifiWidgetProvider } from "@/components/ui2/LifiWidget"
import { AlertDialogProvider } from "@/components/ui2/PromiseAlertDialog"
import AppkitProvider from "@/lib/wagmi/AppkitProvider"
import { ThemeProvider } from "next-themes"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppkitProvider>
        <LifiWidgetProvider>
          <AlertDialogProvider>{children}</AlertDialogProvider>
        </LifiWidgetProvider>
      </AppkitProvider>
    </ThemeProvider>
  )
}
