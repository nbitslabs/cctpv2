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

export const hyperEvm = defineChain({
  id: 999,
  chainNamespace: "eip155",
  caipNetworkId: "eip155:999",
  name: "HyperEVM",
  nativeCurrency: {
    decimals: 18,
    name: "HYPE",
    symbol: "HYPE",
  },
  rpcUrls: {
    default: {
      http: ["https://hyperliquid.drpc.org"],
      webSocket: ["wss://hyperliquid.drpc.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Hyperliquid Explorer",
      url: "https://www.hyperscan.com/",
    },
  },
  assets: {
    imageId:
      "https://storage.googleapis.com/zapper-fi-assets/networks/hyperevm-icon.png",
    imageUrl:
      "https://storage.googleapis.com/zapper-fi-assets/networks/hyperevm-icon.png",
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
  "16": sei,
  "18": xdc,
  "19": hyperEvm,
  "21": ink,
  "22": plumeMainnet,
} satisfies Record<string, AppKitNetwork>
type V2SupportedChainId =
  (typeof chainsByDomain)[keyof typeof chainsByDomain]["id"]

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
})

export const wagmiConfig = wagmiAdapter.wagmiConfig

// https://developers.circle.com/stablecoins/usdc-contract-addresses
export const usdcAddresses: Record<V2SupportedChainId, string> = {
  // Algorand	31566704
  // Aptos	0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b
  [arbitrum.id]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  [avalanche.id]: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  [base.id]: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  // [celo.id]: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
  [mainnet.id]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  // [flowMainnet.id]: "A.b19436aae4d94622.FiatToken",
  // [hedera.id]: "0.0.456858",
  [linea.id]: "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
  [codex.id]: "0xd996633a415985DBd7D6D12f4A4343E31f5037cf",
  // [near.id]: "17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
  // [noble.id]:	"uusdc",
  [optimism.id]: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
  // [polkadot.id]:	"1337",
  [polygon.id]: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
  [solana.id]: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  [sonic.id]: "0x29219dd400f2Bf60E5a23d13Be72B486D4038894",
  // [stellar.id]:	"USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
  // [sui.id]:	"0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC",
  // [tron.id]: "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8",
  [unichain.id]: "0x078D782b760474a361dDA0AF3839290b0EF57AD6",
  [worldchain.id]: "0x79A02482A880bCE3F13e09Da970dC34db4CD24d1",
  [sei.id]: "0xe15fC38F6D8c56aF07bbCBe3BAf5708A2Bf42392",
  [xdc.id]: "0xfA2958CB79b0491CC627c1557F441eF849Ca8eb1",
  [hyperEvm.id]: "0xb88339CB7199b77E23DB6E890353E22632Ba630f",
  // [xrpl.id]:	"5553444300000000000000000000000000000000.rGm7WCVp9gb4jZHWTEtGUr4dd74z2XuWhE",
  // [zkSyncEra.id]:	"0x1d17CBcF0D6D143135aE902365D2E5e2A16538D4",
  [ink.id]: "0x2D270e6886d130D724215A266106e6832161EAEd",
  [plumeMainnet.id]: "0x222365EF19F7947e5484218551B56bb3965Aa7aF",
}

export const tokenMessagerV1Addresses = {
  [mainnet.id]: "0xBd3fa81B58Ba92a82136038B25aDec7066af3155",
  [avalanche.id]: "0x6B25532e1060CE10cc3B0A99e5683b91BFDe6982",
  [optimism.id]: "0x2B4069517957735bE00ceE0fadAE88a26365528f",
  [arbitrum.id]: "0x19330d10D9Cc8751218eaf51E8885D058642E08A",
  [base.id]: "0x1682Ae6375C4E4A97e4B583BC394c861A46D8962",
  [polygon.id]: "0x9daF8c91AEFAE50b9c0E69629D3F6Ca40cA3B3FE",
  [unichain.id]: "0x4e744b28E787c3aD0e810eD65A24461D4ac5a762",
  [solana.id]: "CCTPiPYPc6AsJuwueEnWgSgucamXDZwBd53dQ11YiKX3",
}
export type CctpV1SupportedChainId = keyof typeof tokenMessagerV1Addresses

const evmTokenMessagerV2Address = "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d"
export const tokenMessagerV2Addresses: Record<V2SupportedChainId, string> = {
  [mainnet.id]: evmTokenMessagerV2Address,
  [avalanche.id]: evmTokenMessagerV2Address,
  [optimism.id]: evmTokenMessagerV2Address,
  [arbitrum.id]: evmTokenMessagerV2Address,
  [base.id]: evmTokenMessagerV2Address,
  [linea.id]: evmTokenMessagerV2Address,
  [codex.id]: evmTokenMessagerV2Address,
  [sonic.id]: evmTokenMessagerV2Address,
  [unichain.id]: evmTokenMessagerV2Address,
  [polygon.id]: evmTokenMessagerV2Address,
  [worldchain.id]: evmTokenMessagerV2Address,
  [sei.id]: evmTokenMessagerV2Address,
  [xdc.id]: evmTokenMessagerV2Address,
  [hyperEvm.id]: evmTokenMessagerV2Address,
  [ink.id]: evmTokenMessagerV2Address,
  [plumeMainnet.id]: evmTokenMessagerV2Address,
  [solana.id]: "CCTPV2vPZJS2u2BBsUoscuikbYjnpFmbFsvVuJdgUMQe",
}
export type CctpV2SupportedChainId = keyof typeof tokenMessagerV2Addresses

export const messageTransmitterV1Addresses = {
  [mainnet.id]: "0x0a992d191DEeC32aFe36203Ad87D7d289a738F81",
  [avalanche.id]: "0x8186359aF5F57FbB40c6b14A588d2A59C0C29880",
  [optimism.id]: "0x4D41f22c5a0e5c74090899E5a8Fb597a8842b3e8",
  [arbitrum.id]: "0xC30362313FBBA5cf9163F0bb16a0e01f01A896ca",
  [base.id]: "0xAD09780d193884d503182aD4588450C416D6F9D4",
  [polygon.id]: "0xF3be9355363857F3e001be68856A2f96b4C39Ba9",
  [unichain.id]: "0x353bE9E2E38AB1D19104534e4edC21c643Df86f4",
  [solana.id]: "CCTPmbSD7gX1bxKPAmg77w8oFzNFpaQiQUWD43TKaecd",
}

const evmMessageTransmitterV2Address =
  "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64"
export const messageTransmitterV2Addresses: Record<V2SupportedChainId, string> =
  {
    [mainnet.id]: evmMessageTransmitterV2Address,
    [avalanche.id]: evmMessageTransmitterV2Address,
    [optimism.id]: evmMessageTransmitterV2Address,
    [arbitrum.id]: evmMessageTransmitterV2Address,
    [base.id]: evmMessageTransmitterV2Address,
    [linea.id]: evmMessageTransmitterV2Address,
    [codex.id]: evmMessageTransmitterV2Address,
    [sonic.id]: evmMessageTransmitterV2Address,
    [unichain.id]: evmMessageTransmitterV2Address,
    [polygon.id]: evmMessageTransmitterV2Address,
    [worldchain.id]: evmMessageTransmitterV2Address,
    [sei.id]: evmMessageTransmitterV2Address,
    [xdc.id]: evmMessageTransmitterV2Address,
    [hyperEvm.id]: evmMessageTransmitterV2Address,
    [ink.id]: evmMessageTransmitterV2Address,
    [plumeMainnet.id]: evmMessageTransmitterV2Address,
    [solana.id]: "CCTPV2Sm4AdWt5296sk4P66VBZ7bEhcARwFaaS9YPbeC",
  }
