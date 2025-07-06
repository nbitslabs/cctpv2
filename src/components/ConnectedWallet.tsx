"use client";

import { CctpNetworkAdapterId, findNetworkAdapter } from "@/lib/cctp/networks";
import { NamespaceTypeMap } from "@reown/appkit-controllers";
import {
  useAppKitAccount,
  useDisconnect,
  useWalletInfo,
} from "@reown/appkit/react";
import Image from "next/image";
import ExternalLink from "./ui2/ExternalLink";
import { shortenAddress } from "@/lib/utils";
import CopyIconTooltip from "./ui2/CopyIconTooltip";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function ConnectedWallet({
  namespace,
  adapterId,
}: {
  namespace: keyof NamespaceTypeMap;
  adapterId: CctpNetworkAdapterId;
}) {
  const accountState = useAppKitAccount({ namespace });
  const { walletInfo } = useWalletInfo(namespace);
  const adapter = findNetworkAdapter(adapterId);
  const { disconnect } = useDisconnect();
  if (!accountState.isConnected) return null;

  return (
    <p className="flex justify-center gap-1">
      You are connected to{" "}
      <ExternalLink
        href={`${adapter?.explorer?.url}/address/${accountState.address}`}
        className="text-primary"
      >
        {accountState.address && shortenAddress(accountState.address)}
      </ExternalLink>
      <CopyIconTooltip text={accountState.address ?? ""} />
      on <strong className="text-primary">{adapter?.name}</strong>
      via{" "}
      {walletInfo && (
        <span className="inline-flex items-center gap-1">
          <Image
            src={walletInfo.icon ?? ""}
            alt={walletInfo.name ?? ""}
            className="size-4 rounded-full"
            width={16}
            height={16}
          />
          {walletInfo.name}
        </span>
      )}
      <Button
        variant={"destructive"}
        size={"iconSm"}
        onClick={() => disconnect({ namespace })}
      >
        <LogOut />
      </Button>
    </p>
  );
}
