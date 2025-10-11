"use client"

import confetti from "canvas-confetti"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { CctpNetworkAdapter } from "@/lib/cctp/networks"
import { Check, MoveRight } from "lucide-react"
import Image from "next/image"
import { TooltipWrapNumber } from "@/components/TooltipWrap"
import GitHubButton from "react-github-btn"
import { useEffect, useState } from "react"
import usdcPng from "../../public/images/tokens/usdc.png"

interface ChainAddressBalance {
  networkAdapter: CctpNetworkAdapter
  address: string
  usdcBalance: number
}

interface SuccessDialogProps {
  source: ChainAddressBalance
  destination: ChainAddressBalance
  amount: string
}

export default function SuccessDialog({
  source,
  destination,
  amount,
}: SuccessDialogProps) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (open) tadaEffect()
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="overflow-hidden border-none p-4 sm:p-6"
      >
        <DialogHeader className="text-center flex flex-col items-center gap-2 relative pt-2">
          <div className="dark:bg-green-600 bg-white rounded-full p-1.5 flex items-center justify-center">
            <Check className="size-7 dark:text-background text-green-600 stroke-3" />
          </div>
          <DialogTitle className="mx-auto font-bold dark:text-green-600 text-white">
            Transfer Success!
          </DialogTitle>
          <DialogDescription className="sr-only">
            Your cross-chain USDC transfer has been completed successfully!
          </DialogDescription>
        </DialogHeader>

        <div className="dark:bg-primary/30 bg-green-600 absolute top-0 left-0 w-full h-40 z-[-1]" />

        <div className="space-y-4 relative">
          {/* Transfer Flow Visualization */}
          <div className="flex items-center justify-between bg-background border dark:bg-white dark:shadow-lg dark:border-none rounded-lg p-4 pb-6">
            {/* Source Chain */}
            <div className="flex flex-col items-center space-y-2 flex-1">
              <div className="relative flex flex-col items-center gap-0.5">
                <p className="text-xs text-muted-foreground">
                  {source.networkAdapter.name}
                </p>
                <Image
                  src={source.networkAdapter.logoUrl}
                  alt={source.networkAdapter.name}
                  width={48}
                  height={48}
                  className="rounded-full mt-1"
                />
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Current Balance</p>
                <div className="flex items-center gap-1 justify-center">
                  <Image src={usdcPng} alt="USDC" className="size-4" />
                  <strong>
                    <TooltipWrapNumber amount={source.usdcBalance} />
                  </strong>
                </div>
              </div>
            </div>

            {/* Arrow with Amount */}
            <div className="flex flex-col items-center space-y-0 mx-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber-">
                <Image src={usdcPng} alt="USDC" className="size-4" />
                <strong>{amount}</strong>
              </div>
              <MoveRight className="text-primary size-8" />
            </div>

            {/* Destination Chain */}
            <div className="flex flex-col items-center space-y-2 flex-1">
              <div className="relative flex flex-col items-center gap-0.5">
                <p className="text-xs text-muted-foreground">
                  {destination.networkAdapter.name}
                </p>
                <Image
                  src={destination.networkAdapter.logoUrl}
                  alt={destination.networkAdapter.name}
                  width={48}
                  height={48}
                  className="rounded-full mt-1"
                />
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Current Balance</p>
                <div className="flex items-center gap-2 justify-center">
                  <Image src={usdcPng} alt="USDC" className="size-4" />
                  <strong>
                    <TooltipWrapNumber amount={destination.usdcBalance} />
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Total Cost */}
          <div className="text-center">
            <p className="text-base font-semibold">Total Cost</p>
            <p className="text-lg font-bold text-primary">✈️ Coming Soon</p>
            <p className="text-sm text-muted-foreground">
              Cost tracking and analytics will be available in future updates
            </p>
          </div>

          {/* Call to Action */}
          <div className="p-4 bg-gradient-to-br dark:from-blue-50 dark:to-purple-50 from-blue-400/40 to-purple-600/20 rounded flex gap-3">
            <div className="space-y-1">
              <h3 className="font-semibold">Support Our Project! 🌟 </h3>
              <p className="text-muted-foreground mx-auto text-xs">
                We&apos;re building the future of cross-chain money and making
                it accessible to everyone.
              </p>
            </div>
            <GitHubButton
              href="https://github.com/nbitslabs/cctpv2"
              data-color-scheme="no-preference: light; light: light; dark: dark;"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star cctpv2 on GitHub"
            >
              Star
            </GitHubButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function tadaEffect() {
  const end = Date.now() + 2.5 * 1000 // 3 seconds
  const colors = ["#ff9142", "#f96d30"]
  const frame = () => {
    if (Date.now() > end) return

    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
      colors,
    })
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors,
    })

    requestAnimationFrame(frame)
  }

  frame()
}
