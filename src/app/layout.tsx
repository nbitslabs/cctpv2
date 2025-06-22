import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AppkitProvider from "@/lib/wagmi/AppkitProvider";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { ActiveNetworkProvider } from "@/lib/cctp/providers/ActiveNetworkProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "USDC Cross-Chain Transfer",
  description: "USDC Cross-Chain Transfer",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <AppkitProvider>
          <ActiveNetworkProvider>{children}</ActiveNetworkProvider>
        </AppkitProvider>
        <Toaster
          style={{ "--width": "20rem" } as never}
          toastOptions={{
            duration: 10_000,
            classNames: {
              error: "bg-red-200 border-red-700",
              success: "bg-green-300 border-green-700",
              warning: "bg-orange-400 border-orange-600",
              info: "bg-blue-200 border-blue-700",
              loading: "bg-background border-foreground/50",
            },
          }}
        />
      </body>
    </html>
  );
}
