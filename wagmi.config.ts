import { defineConfig } from "@wagmi/cli";
import { actions, react } from "@wagmi/cli/plugins";
import { Abi, erc20Abi } from "viem";
import {
  arbitrumSepolia,
  avalancheFuji,
  baseSepolia,
  lineaSepolia,
  optimismSepolia,
  polygonAmoy,
  sepolia,
  sonicBlazeTestnet,
  unichainSepolia,
  worldchainSepolia,
} from "viem/chains";
import tokenMessagerAbi from "./src/lib/wagmi/abi/TokenMessager.json";
import messageTransmitterAbi from "./src/lib/wagmi/abi/MessageTransmitter.json";

export default defineConfig({
  out: "src/lib/wagmi/generated.ts",
  contracts: [
    {
      name: "usdc",
      abi: erc20Abi,
      address: {
        [sepolia.id]: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238",
        [avalancheFuji.id]: "0x5425890298aed601595a70AB815c96711a31Bc65",
        [optimismSepolia.id]: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
        [baseSepolia.id]: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
        [polygonAmoy.id]: "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582",
        [sonicBlazeTestnet.id]: "0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6",
        [lineaSepolia.id]: "0xFEce4462D57bD51A6A552365A011b95f0E16d9B7",
        [arbitrumSepolia.id]: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
        [unichainSepolia.id]: "0x31d0220469e10c4E71834a79b1f276d740d3768F",
        [worldchainSepolia.id]: "0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88",
      },
    },
    {
      name: "tokenMessager",
      abi: tokenMessagerAbi as Abi,
      address: "0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa",
    },
    {
      name: "messageTransmitter",
      abi: messageTransmitterAbi as Abi,
      address: "0xe737e5cebeeba77efe34d4aa090756590b1ce275",
    },
  ],
  plugins: [actions(), react()],
});
