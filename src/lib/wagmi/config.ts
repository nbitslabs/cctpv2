import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  sepolia,
  avalancheFuji,
  baseSepolia,
  sonicBlazeTestnet,
  lineaSepolia,
  arbitrumSepolia,
  type AppKitNetwork,
} from "@reown/appkit/networks";

// Get projectId from https://cloud.reown.com
export const projectId = "1c6462fb2a1793e314522f2a4b9637d9";
const deployedUrl = "https://falcon.reown.com";

export const networks = [
  sepolia,
  avalancheFuji,
  baseSepolia,
  sonicBlazeTestnet,
  lineaSepolia,
  arbitrumSepolia,
] as [AppKitNetwork, ...AppKitNetwork[]];

export const metadata = {
  name: "CCTP",
  description: "Cross Chain Transfer Protocol",
  url: deployedUrl,
  icons: [`${deployedUrl}/icon.svg`],
};

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;
