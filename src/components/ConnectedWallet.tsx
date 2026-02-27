"use client"
import { findBlockchain } from "@/hooks/bridgeKit"
import { cn, formatNumber, getChainImageUrl, shortenAddress } from "@/lib/utils"
import { Blockchain } from "@circle-fin/bridge-kit"
import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
  useWalletInfo,
  type NamespaceTypeMap,
} from "@reown/appkit/react"
import { CopyIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { IoSwapHorizontal } from "react-icons/io5"
import { useNetworkAdapterBalance } from "./NetworkAdapterSelect"
import { TooltipWrap } from "./TooltipWrap"
import { Button } from "./ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import CopyIconTooltip from "./ui2/CopyIconTooltip"
import ExternalLink from "./ui2/ExternalLink"
import FiatDepositButton, {
  useOpenAppkitDialogWithLoading,
} from "./ui2/FiatDepositButton"
import { useConfirm } from "./ui2/PromiseAlertDialog"

export default function ConnectedWallet({
  namespace,
  adapterId,
}: {
  namespace: keyof NamespaceTypeMap
  adapterId: Blockchain
}) {
  const activeAccount = useAppKitAccount()
  const accountState = useAppKitAccount({ namespace })
  const { walletInfo } = useWalletInfo(namespace)
  const blockchain = findBlockchain(adapterId)
  const { disconnect } = useDisconnect()
  const confirm = useConfirm()
  const { balance } = useNetworkAdapterBalance(adapterId, accountState.address)
  const [isOpen, setIsOpen] = useState(false)
  const { fakeLoading, openDialog } = useOpenAppkitDialogWithLoading()
  const { open } = useAppKit()
  const explorerUrl = blockchain?.explorerUrl

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
        className="h-6.5"
        onClick={() => open({ view: "Connect", namespace })}
      >
        Connect {blockchain?.type === "evm" ? "EVM" : "Solana"}
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
            "border-foreground/10 flex items-center gap-2 rounded-sm border px-1.5 py-1",
            isActiveAccount ? "bg-primary/30 border-primary/40 pr-1" : ""
          )}
        >
          <img
            src={walletInfo?.icon || "/placeholder.svg"}
            alt={walletInfo?.name || ""}
            className="size-4 rounded-sm"
            width={16}
            height={16}
          />
          <p className="text-muted-foreground flex items-center gap-1 font-mono text-xs">
            {shortenAddress(accountState.address ?? "", 2, "..")}
            {isActiveAccount && (
              <span className="text-primary animate-pulse text-3xl leading-3">
                •
              </span>
            )}
          </p>
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <div>
          <div className="flex items-start justify-between gap-2 text-xs">
            {walletInfo && (
              <div className="flex flex-col gap-1.5">
                <p className="flex items-center font-semibold">
                  <Image
                    src={walletInfo.icon || "/placeholder.svg"}
                    alt={walletInfo.name}
                    className="mr-1.5 inline size-4 rounded-sm sm:hidden"
                    width={16}
                    height={16}
                  />
                  {walletInfo.name}
                </p>
                {balance && (
                  <p className="text-muted-foreground font-mono">
                    {formatNumber(balance.data?.native, {
                      maximumFractionDigits: 6,
                    })}{" "}
                    {blockchain?.nativeCurrency.symbol}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <div className="ml-auto flex items-center gap-1 font-medium">
                {blockchain?.name}
                {blockchain && (
                  <Image
                    src={getChainImageUrl(blockchain.chain)}
                    alt={blockchain.name}
                    className="inline size-4 rounded-sm"
                    width={16}
                    height={16}
                  />
                )}
              </div>
              {accountState.address && (
                <div className="flex items-center gap-2">
                  <ExternalLink
                    href={
                      explorerUrl?.replace(
                        "tx/{hash}",
                        "address/".concat(accountState.address)
                      ) ?? ""
                    }
                    className="text-primary font-mono hover:underline"
                  >
                    {shortenAddress(accountState.address, 3, "..")}
                  </ExternalLink>
                  <CopyIconTooltip text={accountState.address}>
                    <CopyIcon
                      size={14}
                      className="text-muted-foreground hover:text-foreground cursor-pointer"
                    />
                  </CopyIconTooltip>
                </div>
              )}
            </div>
          </div>
          <footer className="mt-2 flex items-center gap-1 border-t pt-2">
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
                disabled={!!fakeLoading}
                onClick={() => openDialog("Swap", namespace)}
                loading={fakeLoading === "Swap"}
              >
                <IoSwapHorizontal />
              </Button>
            </TooltipWrap>
            <FiatDepositButton namespace={namespace} />
          </footer>
        </div>{" "}
      </HoverCardContent>
    </HoverCard>
  )
}
