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
  if (!accountState.isConnected) return null;

  const isActiveAccount = activeAccount.address === accountState.address;

  return (
    <>
      <Card className="w-full max-w-2xl">
        <CardHeader className="p-4">
          <CardTitle className="flex items-center gap-2">
            <Badge
              variant={isActiveAccount ? "default" : "secondary"}
              className="font-medium"
            >
              {adapter?.name}
            </Badge>
            Connected Wallet
            <Button
              variant="ghost"
              size="iconSm"
              className="ml-auto"
              onClick={() => open({ view: "Account", namespace })}
            >
              <User2 />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-4 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {walletInfo && (
                <div className="flex items-center gap-2">
                  <Image
                    src={walletInfo.icon || "/placeholder.svg"}
                    alt={walletInfo.name}
                    className="size-7 rounded-sm"
                    width={24}
                    height={24}
                  />
                  <span className="font-medium">{walletInfo.name}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant="secondary"
                size="sm"
                onClick={async () => {
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
                }}
                className="gap-2"
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
              {accountState.address ?? ""}
            </ExternalLink>
            <CopyIconTooltip text={accountState.address ?? ""} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
