import { Address, erc20Abi, formatUnits } from "viem";
import { getAccount } from "wagmi/actions";
import { createUseReadContract } from "wagmi/codegen";
import { wagmiConfig } from "../config";
import { erc20Decimals } from "@/lib/constants";
import { parseNumber } from "@/lib/utils";

/**
 * Return human-readable balance of the ERC20 token for the given address
 * Defaults to the current account address
 */
export const useErc20Amount = (
  erc20Address?: Address,
  trackingAddress = getAccount(wagmiConfig).address
) => {
  const { data: decimals, isLoading } = createUseReadContract({
    abi: erc20Abi,
    address: erc20Address as Address,
    functionName: "decimals",
  })({ query: { enabled: !!erc20Address } });

  const { data: rawBalance, ...rest } = createUseReadContract({
    abi: erc20Abi,
    address: erc20Address as Address | undefined,
    functionName: "balanceOf",
  })({
    args: [trackingAddress!],
    query: { enabled: !!erc20Address && !!trackingAddress },
  });
  const balanceStr = rawBalance
    ? formatUnits(rawBalance, Number(decimals ?? erc20Decimals))
    : "0";
  return {
    ...rest,
    data: parseNumber(balanceStr),
    isLoading: rest.isLoading || isLoading,
  };
};
