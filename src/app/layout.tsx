import type { Metadata } from "next";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import Providers from "./Providers";

const funnelSans = Funnel_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const funnelDisplay = Funnel_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "USDC Cross-Chain Transfer",
  description: "USDC Cross-Chain Transfer, support EVM and Solana in CCTP V2",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${funnelSans.variable} ${funnelDisplay.variable} antialiased`}
      >
        <Providers>{children}</Providers>
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
