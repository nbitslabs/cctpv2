import { useQuery } from "@tanstack/react-query"
import {
  cctpBridgeKit,
  RequiredExecuteTransferParams,
  useBridgeKitParams,
} from "./useCrossChainTransfer"
import { keyBy, uniq } from "lodash-es"
import { getNativeTokenUsdPrice } from "@/lib/pricing/native"

export function useFeeEstimatesV2(params: RequiredExecuteTransferParams) {
  const bridgeKitParams = useBridgeKitParams(params)
  return useQuery({
    queryKey: ["fee-estimates", params],
    queryFn: async () => {
      const result = await cctpBridgeKit.estimate(bridgeKitParams!)
      const prices = await Promise.all(
        uniq(result.gasFees.map((fee) => fee.token).filter(Boolean)).map(
          async (t) => ({
            token: t,
            price: await getNativeTokenUsdPrice(t),
          })
        )
      )
      const priceByToken: Record<string, { price?: number; token: string }> =
        keyBy(prices, "token")
      return {
        ...result,
        gasFees: result.gasFees.map((fee) => ({
          ...fee,
          usdFee:
            Number(fee.fees?.fee || 0) * (priceByToken[fee.token]?.price ?? 0),
        })),
      }
    },
    enabled: !!bridgeKitParams,
  })
}
