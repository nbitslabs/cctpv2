"use client"

import { TooltipWrapNumber } from "@/components/TooltipWrap"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getChainImageUrl } from "@/lib/utils"
import { ChainDefinition } from "@circle-fin/bridge-kit"
import confetti from "canvas-confetti"
import { Check, MoveRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import GitHubButton from "react-github-btn"
import usdcPng from "../../public/images/tokens/usdc.png"

interface ChainAddressBalance {
  networkAdapter: ChainDefinition
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
        <DialogHeader className="relative flex flex-col items-center gap-2 pt-2 text-center">
          <div className="flex items-center justify-center rounded-full bg-white p-1.5 dark:bg-green-600">
            <Check className="dark:text-background size-7 stroke-3 text-green-600" />
          </div>
          <DialogTitle className="mx-auto font-bold text-white dark:text-green-600">
            Transfer Success!
          </DialogTitle>
          <DialogDescription className="sr-only">
            Your cross-chain USDC transfer has been completed successfully!
          </DialogDescription>
        </DialogHeader>

        <div className="dark:bg-primary/30 absolute top-0 left-0 z-[-1] h-40 w-full bg-green-600" />

        <div className="relative space-y-4">
          {/* Transfer Flow Visualization */}
          <div className="bg-background flex items-center justify-between rounded-lg border p-4 pb-6 dark:border-none dark:bg-white dark:shadow-lg">
            {/* Source Chain */}
            <div className="flex flex-1 flex-col items-center space-y-2">
              <div className="relative flex flex-col items-center gap-0.5">
                <p className="text-muted-foreground text-xs">
                  {source.networkAdapter.name}
                </p>
                <Image
                  src={getChainImageUrl(source.networkAdapter.chain)}
                  alt={source.networkAdapter.name}
                  width={48}
                  height={48}
                  className="mt-1 rounded-full"
                />
              </div>
              <div className="text-center">
                <p className="text-muted-foreground text-xs">Current Balance</p>
                <div className="flex items-center justify-center gap-1">
                  <Image src={usdcPng} alt="USDC" className="size-4" />
                  <strong>
                    <TooltipWrapNumber amount={source.usdcBalance} />
                  </strong>
                </div>
              </div>
            </div>

            {/* Arrow with Amount */}
            <div className="mx-4 flex flex-col items-center space-y-0">
              <div className="border-amber- flex items-center gap-2 rounded-full border px-4 py-2">
                <Image src={usdcPng} alt="USDC" className="size-4" />
                <strong>{amount}</strong>
              </div>
              <MoveRight className="text-primary size-8" />
            </div>

            {/* Destination Chain */}
            <div className="flex flex-1 flex-col items-center space-y-2">
              <div className="relative flex flex-col items-center gap-0.5">
                <p className="text-muted-foreground text-xs">
                  {destination.networkAdapter.name}
                </p>
                <Image
                  src={getChainImageUrl(destination.networkAdapter.chain)}
                  alt={destination.networkAdapter.name}
                  width={48}
                  height={48}
                  className="mt-1 rounded-full"
                />
              </div>
              <div className="text-center">
                <p className="text-muted-foreground text-xs">Current Balance</p>
                <div className="flex items-center justify-center gap-2">
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
            <p className="text-primary text-lg font-bold">✈️ Coming Soon</p>
            <p className="text-muted-foreground text-sm">
              Cost tracking and analytics will be available in future updates
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex gap-3 rounded bg-linear-to-br from-blue-400/40 to-purple-600/20 p-4 dark:from-blue-50 dark:to-purple-50">
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
  const colors = ["#ff9142", "#ff61a3", "#00d2ff", "#00ff94"]
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
