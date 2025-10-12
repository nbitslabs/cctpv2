"use client"

import type { WidgetConfig, WidgetDrawer } from "@lifi/widget"
import { LiFiWidget } from "@lifi/widget"
import Image from "next/image"
import type { PropsWithChildren, RefObject } from "react"
import { createContext, useContext, useRef } from "react"
import { Button } from "../ui/button"
import { ClientOnly } from "./ClientOnly"
import { TooltipWrap } from "../TooltipWrap"
import { texts } from "@/lib/wagmi/texts"

const LifiWidgetContext = createContext<RefObject<WidgetDrawer | null> | null>(
  null
)

export function LifiWidgetProvider({ children }: PropsWithChildren) {
  const drawerRef = useRef<WidgetDrawer>(null)
  const config = {
    walletConfig: {
      autoConnect: true,
      forceInternalWalletManagement: true,
    },
    variant: "drawer",
  } as Partial<WidgetConfig>

  return (
    <LifiWidgetContext.Provider value={drawerRef}>
      {children}
      <ClientOnly fallback={null}>
        <LiFiWidget ref={drawerRef} config={config} integrator="cctpv2" />
      </ClientOnly>
    </LifiWidgetContext.Provider>
  )
}

export function LifiButton() {
  const drawer = useContext(LifiWidgetContext)
  const toggleWidget = () => {
    drawer?.current?.toggleDrawer()
  }
  return (
    <TooltipWrap content={texts.tooltip.bridge}>
      <Button variant="outline" size="sm" onClick={toggleWidget}>
        <Image
          src={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAQlBMVEX3wv/7xf/Ln9GyjLf/yf8UDxQAAAC4kb7Up9u7k8H9x//Yqt8yJzTCmMjpt/CVdZrtuvXAl8b/yv/hsel2XXq+lcTHQRfoAAAAl0lEQVR4AWKgBwD0Shc6DAJREEW7ZXpxh///1ealPki8g3Oyvimd2DXTMd7IdWQFUOoAS4C8Oi4JddpVNYGtY+qquNdAr2r45Y5RUXSknzQyf6sWHlrV0giLvnBqgDb+JLVAMxk+ykY5Qy08dAqzatNMhCwjQnf5TrXyldUmSSWP2PSaPsw1J3KwaCqtnJW1cqZmvsH+kDvYBgZl6U6ZYQAAAABJRU5ErkJggg=="
          }
          alt="LiFi"
          width={14}
          height={14}
          className="rounded-full"
        />
        LiFi
      </Button>
    </TooltipWrap>
  )
}
