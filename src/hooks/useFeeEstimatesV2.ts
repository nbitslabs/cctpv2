import { useQuery } from "@tanstack/react-query"
import {
  cctpBridgeKit,
  RequiredExecuteTransferParams,
  useBridgeKitParams,
} from "./useCrossChainTransfer"

export function useFeeEstimatesV2(params: RequiredExecuteTransferParams) {
  const bridgeKitParams = useBridgeKitParams(params)
  return useQuery({
    queryKey: ["fee-estimates", params],
    queryFn: () => cctpBridgeKit.estimate(bridgeKitParams!),
    enabled: !!bridgeKitParams,
  })
}
