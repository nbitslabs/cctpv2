import { Toaster } from "@/components/ui/sonner"
import { networkAdapters } from "@/lib/cctp/networks"
import { deployedUrl } from "@/lib/constants"
import type { Metadata } from "next"
import { Inter, Rye } from "next/font/google"
import "./globals.css"
import Providers from "./Providers"

const funnelSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
const funnelDisplay = Rye({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
})

export const metadata: Metadata = {
  title:
    "Cross-Chain USDC Transfers | CCTP v2 on Ethereum, Solana, Arbitrum, Base & More",
  description: `Seamless USDC transfers across top blockchains with CCTP v2. Secure, fast, and low-cost cross-chain settlements. Instantly bridge between ${networkAdapters
    .map((adapter) => adapter.name)
    .join(", ")}, and more. `,
  metadataBase: new URL(deployedUrl),
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${funnelSans.variable} ${funnelDisplay.variable} antialiased font-sans`}
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
  )
}
