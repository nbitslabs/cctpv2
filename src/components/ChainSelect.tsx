"use client";

import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CctpNetworkAdapterId,
  findNetworkAdapter,
  networkAdapters,
} from "@/lib/cctp/networks";
import { useNativeBalance, useUsdcBalance } from "@/hooks/useBalance";
import { TooltipWrapNumber } from "./TooltipWrap";

export interface NetworkAdapterSelectProps {
  chainId: CctpNetworkAdapterId | undefined;
  setChainId: (chain: CctpNetworkAdapterId) => void;
  address: string;
  setAddress?: (address: string) => void;
  label: string;
  exceptAdapterIds?: CctpNetworkAdapterId[];
  children?: React.ReactNode;
}

export function useNetworkAdapterBalance(
  chainId: CctpNetworkAdapterId | undefined,
  address: string | undefined
) {
  const usdcBalance = useUsdcBalance(chainId, address);
  const nativeBalance = useNativeBalance(chainId, address);
  const networkAdapter = findNetworkAdapter(chainId);
  const nativeCurrency = networkAdapter?.nativeCurrency;

  return {
    networkAdapter,
    usdcBalance,
    nativeBalance,
    nativeCurrency,
    // transfers,
  };
}

export default function NetworkAdapterSelect({
  chainId: chain,
  setChainId,
  address,
  setAddress,
  label,
  exceptAdapterIds,
  children,
}: NetworkAdapterSelectProps) {
  const { usdcBalance, nativeBalance, nativeCurrency } =
    useNetworkAdapterBalance(chain, address);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={chain?.toString()} onValueChange={setChainId}>
        <SelectTrigger>
          <SelectValue placeholder="Select destination chain" />
        </SelectTrigger>
        <SelectContent>
          {networkAdapters
            .filter((chain) => !exceptAdapterIds?.includes(chain.id))
            .map((chain) => (
              <SelectItem key={chain.id} value={String(chain.id)}>
                {chain.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <div>
        <Label>Address</Label>
        <div className="flex items-center gap-2">
          <Input
            value={address}
            onChange={(e) => setAddress?.(e.target.value)}
            placeholder={`Enter address...`}
            readOnly={!setAddress}
            className={cn(
              "text-sm",
              !setAddress && "bg-primary/5 text-foreground/70"
            )}
          />
          {children}
        </div>
      </div>
      {address && (
        <>
          <p className="text-sm text-muted-foreground">
            {usdcBalance.isLoading ? (
              <Loader2 className="animate-spin inline-block size-3" />
            ) : (
              <TooltipWrapNumber
                amount={usdcBalance.data?.formatted ?? 0}
                format={{ maximumFractionDigits: 2 }}
              />
            )}{" "}
            USDC •{" "}
            {nativeBalance.isLoading ? (
              <Loader2 className="animate-spin inline-block size-3" />
            ) : (
              <TooltipWrapNumber
                amount={nativeBalance.data?.formatted ?? 0}
                format={{ maximumFractionDigits: 4 }}
              />
            )}{" "}
            {nativeCurrency?.symbol}
          </p>
          {/* <TransactionHistory
            transactions={transfers.data}
            isLoading={transfers.isLoading}
            explorerUrl={networkAdapter?.explorer?.url ?? ""}
          /> */}
        </>
      )}
    </div>
  );
}
