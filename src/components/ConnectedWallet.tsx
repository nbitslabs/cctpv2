"use client"
import {
  findNetworkAdapter,
  type CctpNetworkAdapterId,
} from "@/lib/cctp/networks"
import {
  type NamespaceTypeMap,
  useAppKit,
  useAppKitAccount,
  useDisconnect,
  useWalletInfo,
} from "@reown/appkit/react"
import Image from "next/image"
import CopyIconTooltip from "./ui2/CopyIconTooltip"
import { Button } from "./ui/button"
import { CircleCheck, CopyIcon, CreditCard } from "lucide-react"
import { Badge } from "./ui/badge"
import ExternalLink from "./ui2/ExternalLink"
import { useConfirm } from "./ui2/PromiseAlertDialog"
import { cn, formatNumber, shortenAddress } from "@/lib/utils"
import { useNativeBalance } from "@/hooks/useBalance"
import { useActiveNetwork } from "@/lib/cctp/providers/ActiveNetworkProvider"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import { TooltipWrap } from "./TooltipWrap"
import { useState } from "react"
import { IoSwapHorizontal } from "react-icons/io5"

export default function ConnectedWallet({
  namespace,
  adapterId,
}: {
  namespace: keyof NamespaceTypeMap
  adapterId: CctpNetworkAdapterId
}) {
  const { open } = useAppKit()
  const { setActiveNetwork } = useActiveNetwork()
  const activeAccount = useAppKitAccount()
  const accountState = useAppKitAccount({ namespace })
  const { walletInfo } = useWalletInfo(namespace)
  const adapter = findNetworkAdapter(adapterId)
  const { disconnect } = useDisconnect()
  const confirm = useConfirm()
  const { data: balance } = useNativeBalance(adapterId, accountState.address)
  const [isOpen, setIsOpen] = useState(false)

  const handleDisconnect = async () => {
    const result = await confirm({
      title: `Disconnect "${walletInfo?.name}" Wallet`,
      body: "Are you sure you want to disconnect your wallet?",
      actionButton: "Disconnect",
      cancelButton: "Cancel",
      cancelButtonVariant: "outline",
    })
    if (result) {
      disconnect({ namespace })
    }
  }

  if (!accountState.isConnected) {
    return (
      <Button
        size="sm"
        variant={"outline-solid"}
        className="h-[26px]"
        onClick={() => open({ view: "Connect", namespace })}
      >
        Connect {adapter?.type === "evm" ? "EVM" : "Solana"}
      </Button>
    )
  }
  const isActiveAccount = activeAccount.address === accountState.address

  return (
    <HoverCard
      openDelay={100}
      closeDelay={100}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <HoverCardTrigger asChild onTouchStart={() => setIsOpen(true)}>
        <div
          className={cn(
            "flex items-center gap-2 rounded-sm py-1 px-1.5 border border-foreground/10",
            isActiveAccount ? "bg-primary/30 pr-1 border-primary/40" : ""
          )}
        >
          <img
            src={walletInfo?.icon || "/placeholder.svg"}
            alt={walletInfo?.name || ""}
            className="size-4 rounded-sm"
            width={16}
            height={16}
          />
          <p className="text-xs font-mono text-muted-foreground flex items-center gap-1">
            {shortenAddress(accountState.address ?? "", 2, "..")}
            {isActiveAccount && (
              <span className="text-primary text-3xl leading-3 animate-pulse">
                •
              </span>
            )}
          </p>
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <div>
          <div className="flex justify-between items-start gap-2 text-xs">
            {walletInfo && (
              <div className="flex flex-col gap-1.5">
                <p className="font-semibold flex items-center">
                  <Image
                    src={walletInfo.icon || "/placeholder.svg"}
                    alt={walletInfo.name}
                    className="size-4 rounded-sm inline mr-1.5 sm:hidden"
                    width={16}
                    height={16}
                  />
                  {walletInfo.name}
                </p>
                {balance && (
                  <p className="font-mono text-muted-foreground">
                    {formatNumber(balance.formatted, {
                      maximumFractionDigits: 6,
                    })}{" "}
                    {adapter?.nativeCurrency.symbol}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <div className="ml-auto flex items-center gap-1 font-medium">
                {adapter?.name}
                {adapter?.logoUrl && (
                  <Image
                    src={adapter.logoUrl}
                    alt={adapter.name}
                    className="size-4 rounded-sm inline"
                    width={16}
                    height={16}
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <ExternalLink
                  href={`${adapter?.explorer?.url}/address/${accountState.address}`}
                  className="text-primary hover:underline font-mono"
                >
                  {shortenAddress(accountState.address ?? "", 3, "..")}
                </ExternalLink>
                <CopyIconTooltip text={accountState.address ?? ""}>
                  <CopyIcon
                    size={14}
                    className="cursor-pointer text-muted-foreground hover:text-foreground"
                  />
                </CopyIconTooltip>
              </div>
            </div>
          </div>
          <footer className="flex items-center gap-1 mt-2 border-t pt-2">
            <Button
              variant="destructive-outline"
              size="sm"
              onClick={handleDisconnect}
              className="mr-auto"
            >
              Disconnect
            </Button>
            <TooltipWrap content="Swap">
              <Button
                variant="ghost"
                size="iconSm"
                onClick={async () => {
                  await setActiveNetwork(adapterId)
                  open({ view: "Swap", namespace })
                }}
              >
                <IoSwapHorizontal />
              </Button>
            </TooltipWrap>
            <TooltipWrap content="Deposit with fiat">
              <Button
                variant="ghost"
                size="iconSm"
                onClick={async () => {
                  await setActiveNetwork(adapterId)
                  open({ view: "OnRampProviders", namespace })
                }}
              >
                <CreditCard />
              </Button>
            </TooltipWrap>
            {isActiveAccount ? (
              <Badge variant="secondary">
                <CircleCheck size={12} />
                Active
              </Badge>
            ) : (
              <Button size="sm" onClick={() => setActiveNetwork(adapterId)}>
                Set active
              </Button>
            )}
          </footer>
        </div>{" "}
      </HoverCardContent>
    </HoverCard>
  )
}
