import { texts } from "@/lib/wagmi/texts"
import { ChainNamespace } from "@reown/appkit/networks"
import Image from "next/image"
import meldPng from "../../../public/images/brands/meld.png"
import { TooltipWrap } from "../TooltipWrap"
import { Button } from "../ui/button"
import { useAppKit } from "@reown/appkit/react"
import { useState } from "react"
import { delay } from "@/lib/utils"

export default function FiatDepositButton({
  namespace,
  children,
}: {
  namespace: ChainNamespace
  children?: React.ReactNode
}) {
  const { openDialog, fakeLoading } = useOpenAppkitDialogWithLoading()
  return (
    <TooltipWrap content={texts.tooltip.fiat}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => openDialog("OnRampProviders", namespace)}
        disabled={!!fakeLoading}
        loading={fakeLoading === "OnRampProviders"}
      >
        <Image src={meldPng} alt="Meld" className="inline-block size-3.5" />
        {children}
      </Button>
    </TooltipWrap>
  )
}

type SupportedViews = "Swap" | "OnRampProviders"
export function useOpenAppkitDialogWithLoading() {
  const { open } = useAppKit()
  const [fakeLoading, setFakeLoading] = useState<SupportedViews>()

  const openDialog = async (
    view: SupportedViews,
    namespace: ChainNamespace
  ) => {
    setFakeLoading(view)
    open({ view, namespace })
    await delay(500)
    setFakeLoading(undefined)
  }

  return { openDialog, fakeLoading }
}
