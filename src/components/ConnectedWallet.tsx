"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CctpNetworkAdapterId, findNetworkAdapter } from "@/lib/cctp/networks";
import { NamespaceTypeMap } from "@reown/appkit-controllers";
import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
  useWalletInfo,
} from "@reown/appkit/react";
import Image from "next/image";
import CopyIconTooltip from "./ui2/CopyIconTooltip";
import { Button } from "./ui/button";
import { LogOut, User2 } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Badge } from "./ui/badge";
import ExternalLink from "./ui2/ExternalLink";
import { useConfirm } from "./ui2/PromiseAlertDialog";
import { formatNumber, shortenAddress } from "@/lib/utils";
import { useNativeBalance } from "@/hooks/useBalance";

export default function ConnectedWallet({
  namespace,
  adapterId,
}: {
  namespace: keyof NamespaceTypeMap;
  adapterId: CctpNetworkAdapterId;
}) {
  const { open } = useAppKit();
  const activeAccount = useAppKitAccount();
  const accountState = useAppKitAccount({ namespace });
  const { walletInfo } = useWalletInfo(namespace);
  const adapter = findNetworkAdapter(adapterId);
  const { disconnect } = useDisconnect();
  const confirm = useConfirm();
  const { data: balance } = useNativeBalance(adapterId, accountState.address);

  const handleDisconnect = async () => {
    const result = await confirm({
      title: `Disconnect "${walletInfo?.name}" Wallet`,
      body: "Are you sure you want to disconnect your wallet?",
      actionButton: "Disconnect",
      cancelButton: "Cancel",
      cancelButtonVariant: "outline",
    });
    if (result) {
      disconnect({ namespace });
    }
  };

  if (!accountState.isConnected) return null;
  const isActiveAccount = activeAccount.address === accountState.address;

  return (
    <>
      <Card className="w-full max-w-2xl bg-foreground/5">
        <CardHeader className="p-2 sm:p-4">
          <CardTitle className="flex items-center gap-2">
            <Badge
              variant={isActiveAccount ? "default" : "secondary"}
              className="font-medium"
            >
              {adapter?.name}
            </Badge>
            <span className="hidden sm:inline">Connected Wallet</span>
            <Button
              variant="ghost"
              size="iconSm"
              className="ml-auto"
              onClick={() => open({ view: "Account", namespace })}
            >
              <User2 />
            </Button>
            <Button
              variant="destructive-outline"
              size="iconSm"
              onClick={handleDisconnect}
              className="sm:hidden"
            >
              <LogOut />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-2 sm:px-4 pb-4">
          <div className="flex items-center justify-between">
            {walletInfo && (
              <div className="flex items-center gap-3">
                <Image
                  src={walletInfo.icon || "/placeholder.svg"}
                  alt={walletInfo.name}
                  className="size-7 rounded-sm hidden sm:block"
                  width={24}
                  height={24}
                />
                <div className="flex flex-col">
                  <p className="text-sm sm:text-base font-semibold flex items-center">
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
                    <p className="text-sm font-mono text-muted-foreground">
                      {formatNumber(balance.formatted, {
                        maximumFractionDigits: 6,
                      })}{" "}
                      {adapter?.nativeCurrency.symbol}
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDisconnect}
                className="gap-2 hidden sm:flex"
              >
                <LogOut />
                Disconnect
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-2">
            <ExternalLink
              href={`${adapter?.explorer?.url}/address/${accountState.address}`}
              className="text-primary hover:underline font-mono text-sm"
            >
              {shortenAddress(accountState.address ?? "")}
            </ExternalLink>
            <CopyIconTooltip text={accountState.address ?? ""} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
