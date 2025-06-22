import {
  AppKitNetwork,
  arbitrumSepolia,
  avalancheFuji,
  baseSepolia,
  lineaSepolia,
  polygonAmoy,
  sepolia,
  sonicBlazeTestnet,
} from "@reown/appkit/networks";

export const DESTINATION_DOMAINS: Record<SupportedChainId, number> = {
  [sepolia.id]: 0,
  [avalancheFuji.id]: 1,
  [baseSepolia.id]: 6,
  [polygonAmoy.id]: 7,
  [sonicBlazeTestnet.id]: 13,
  [lineaSepolia.id]: 11,
  [arbitrumSepolia.id]: 3,
};

export const erc20Decimals = 18;

export const supportedChains = [
  sepolia,
  avalancheFuji,
  baseSepolia,
  polygonAmoy,
  sonicBlazeTestnet,
  lineaSepolia,
  arbitrumSepolia,
] satisfies [AppKitNetwork, ...AppKitNetwork[]];

export type SupportedChain = (typeof supportedChains)[number];
export type SupportedChainId = (typeof supportedChains)[number]["id"];

interface SupportedChainType {
  network: AppKitNetwork;
  supportCctpVersion: (1 | 2)[];
}
