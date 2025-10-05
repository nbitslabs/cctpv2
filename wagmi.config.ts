import { defineConfig } from "@wagmi/cli"
import { actions } from "@wagmi/cli/plugins"
import type { Abi } from "viem"
import { erc20Abi } from "viem"
import tokenMessagerAbi from "./src/lib/wagmi/abi/TokenMessager.json"
import messageTransmitterAbi from "./src/lib/wagmi/abi/MessageTransmitter.json"

export default defineConfig({
  out: "src/lib/wagmi/generated.ts",
  contracts: [
    { name: "usdc", abi: erc20Abi },
    { name: "tokenMessager", abi: tokenMessagerAbi as Abi },
    { name: "messageTransmitter", abi: messageTransmitterAbi as Abi },
  ],
  plugins: [actions()],
})
