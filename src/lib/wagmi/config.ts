import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import {
  arbitrum,
  avalanche,
  base,
  // celo,
  defineChain,
  ink,
  // flowMainnet,
  // hedera,
  linea,
  mainnet,
  monad,
  // near,
  optimism,
  plumeMainnet,
  polygon,
  sei,
  solana,
  sonic,
  // tron,
  unichain,
  worldchain,
  xdc,
  hyperEvm,
  type AppKitNetwork,
} from "@reown/appkit/networks"
import { deployedUrl } from "../constants"

export const codex = defineChain({
  id: 81224,
  chainNamespace: "eip155",
  caipNetworkId: "eip155:81224",
  name: "Codex Mainnet",
  nativeCurrency: mainnet.nativeCurrency,
  rpcUrls: {
    default: {
      http: ["https://rpc.codex.xyz"],
      webSocket: ["wss://rpc.codex.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "Codex Explorer",
      url: "https://explorer.codex.xyz",
    },
  },
  assets: {
    imageId: "https://explorer.codex.xyz/assets/configs/network_icon.svg",
    imageUrl: "https://explorer.codex.xyz/assets/configs/network_icon.svg",
  },
  testnet: false,
})

// Get projectId from https://cloud.reown.com
export const projectId = "1c6462fb2a1793e314522f2a4b9637d9"

// https://developers.circle.com/stablecoins/supported-domains
export const chainsByDomain = {
  "0": mainnet,
  "1": avalanche,
  "2": optimism,
  "3": arbitrum,
  "4": base,
  "5": solana,
  "7": polygon,
  "10": unichain,
  "11": linea,
  "12": codex,
  "13": sonic,
  "14": worldchain,
  "15": monad,
  "16": sei,
  "18": xdc,
  "19": hyperEvm,
  "21": ink,
  "22": plumeMainnet,
} satisfies Record<string, AppKitNetwork>

export const networks = Object.values(chainsByDomain) as unknown as [
  AppKitNetwork,
  ...AppKitNetwork[],
]

export const metadata = {
  name: "CCTP V2",
  description:
    "CCTP v2 on Ethereum, Solana, Arbitrum, Base, Polygon, Avalanche & More",
  url: deployedUrl,
  icons: [`${deployedUrl}/icon.svg`],
}

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks,
  customRpcUrls: {},
})

export const wagmiConfig = wagmiAdapter.wagmiConfig
