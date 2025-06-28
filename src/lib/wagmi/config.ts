import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  arbitrum,
  arbitrumSepolia,
  avalanche,
  avalancheFuji,
  base,
  baseSepolia,
  celo,
  celoAlfajores,
  flowMainnet,
  hedera,
  hederaTestnet,
  linea,
  lineaSepolia,
  mainnet,
  near,
  nearTestnet,
  optimism,
  optimismSepolia,
  polygon,
  polygonAmoy,
  sepolia,
  solana,
  solanaDevnet,
  sonic,
  sonicBlazeTestnet,
  tron,
  unichain,
  unichainSepolia,
  worldchain,
  worldchainSepolia,
  type AppKitNetwork,
} from "@reown/appkit/networks";

// Get projectId from https://cloud.reown.com
export const projectId = "1c6462fb2a1793e314522f2a4b9637d9";
const deployedUrl = "https://falcon.reown.com";

// https://developers.circle.com/stablecoins/supported-domains
// 0 Ethereum
// 1	Avalanche
// 2	OP
// 3	Arbitrum
// 4	Noble
// 5	Solana
// 6	Base
// 7	Polygon PoS
// 8	Sui
// 9	Aptos
// 10	Unichain
// 11	Linea
// 12	Codex
// 13	Sonic
// 14	World Chain
const IS_TESTNET = process.env.NEXT_PUBLIC_TESTNET === "true";
export const chainsByDomain = IS_TESTNET
  ? {
      "0": sepolia,
      "1": avalancheFuji,
      "2": optimismSepolia,
      "3": arbitrumSepolia,
      "4": baseSepolia,
      "7": polygonAmoy,
      "10": unichainSepolia,
      "11": lineaSepolia,
      "13": sonicBlazeTestnet,
      "14": worldchainSepolia,
    }
  : {
      "0": mainnet,
      "1": avalanche,
      "2": optimism,
      "3": arbitrum,
      "4": base,
      "5": solana,
      "7": polygon,
      "10": unichain,
      "11": linea,
      "13": sonic,
      "14": worldchain,
    };

export const networks = Object.values(chainsByDomain) as [
  AppKitNetwork,
  ...AppKitNetwork[],
];

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

// https://developers.circle.com/stablecoins/usdc-contract-addresses
export const usdcAddresses = {
  // Mainnets
  // Algorand	31566704
  // Aptos	0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b
  [arbitrum.id]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  [avalanche.id]: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  [base.id]: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  [celo.id]: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
  [mainnet.id]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  [flowMainnet.id]: "A.b19436aae4d94622.FiatToken",
  [hedera.id]: "0.0.456858",
  [linea.id]: "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
  [near.id]: "17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
  // [noble.id]:	"uusdc",
  [optimism.id]: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
  // [polkadot.id]:	"1337",
  [polygon.id]: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
  [solana.id]: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  [sonic.id]: "0x29219dd400f2Bf60E5a23d13Be72B486D4038894",
  // [stellar.id]:	"USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
  // [sui.id]:	"0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC",
  [tron.id]: "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8",
  [unichain.id]: "0x078D782b760474a361dDA0AF3839290b0EF57AD6",
  [worldchain.id]: "0x79A02482A880bCe3F13E09da970dC34dB4cD24D1",
  // [xrpl.id]:	"5553444300000000000000000000000000000000.rGm7WCVp9gb4jZHWTEtGUr4dd74z2XuWhE",
  // [zkSyncEra.id]:	"0x1d17CBcF0D6D143135aE902365D2E5e2A16538D4",

  // Testnets
  // Algorand Testnet	10458941
  // Aptos Testnet	0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832
  [arbitrumSepolia.id]: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
  [avalancheFuji.id]: "0x5425890298aed601595a70AB815c96711a31Bc65",
  [baseSepolia.id]: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  [celoAlfajores.id]: "0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B",
  // [codexTestnet.id]: "0x6d7f141b6819C2c9CC2f818e6ad549E7Ca090F8f",
  [sepolia.id]: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  [hederaTestnet.id]: "0.0.429274",
  [lineaSepolia.id]: "0xFEce4462D57bD51A6A552365A011b95f0E16d9B7",
  [nearTestnet.id]:
    "3e2210e1184b45b64c8a434c0a7e7b23cc04ea7eb7a6c3c32520d03d4afcb8af",
  // [nobleTestnet.id]: "uusdc",
  [optimismSepolia.id]: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
  // [polkadotWestmint.id]: "Asset ID 31337",
  [polygonAmoy.id]: "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582",
  [solanaDevnet.id]: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
  [sonicBlazeTestnet.id]: "0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6",
  // [stellarTestnet.id]: "USDC-GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5",
  // [suiTestnet.id]: "0xa1ec7fc00a6f40db9693ad1415d0c193ad3906494428cf252621037bd7117e29::usdc::USDC",
  [unichainSepolia.id]: "0x31d0220469e10c4E71834a79b1f276d740d3768F",
  [worldchainSepolia.id]: "0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88",
  // [xrplTestnet.id]: "5553444300000000000000000000000000000000.rHuGNhqTG32mfmAvWA8hUyWRLV3tCSwKQt",
  // [zksyncEraTestnet.id]: "0xAe045DE5638162fa134807Cb558E15A3F5A7F853",
};

export const tokenMessagerV1Addresses = {
  // Mainnets
  [mainnet.id]: "0xBd3fa81B58Ba92a82136038B25aDec7066af3155",
  [avalanche.id]: "0x6B25532e1060CE10cc3B0A99e5683b91BFDe6982",
  [optimism.id]: "0x2B4069517957735bE00ceE0fadAE88a26365528f",
  [arbitrum.id]: "0x19330d10D9Cc8751218eaf51E8885D058642E08A",
  [base.id]: "0x1682Ae6375C4E4A97e4B583BC394c861A46D8962",
  [polygon.id]: "0x9daF8c91AEFAE50b9c0E69629D3F6Ca40cA3B3FE",
  [unichain.id]: "0x4e744b28E787c3aD0e810eD65A24461D4ac5a762",
  [solana.id]: "CCTPiPYPc6AsJuwueEnWgSgucamXDZwBd53dQ11YiKX3",
  // Testnets
  [sepolia.id]: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
  [avalancheFuji.id]: "0xeb08f243E5d3FCFF26A9E38Ae5520A669f4019d0",
  [optimismSepolia.id]: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
  [arbitrumSepolia.id]: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
  [baseSepolia.id]: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
  [polygonAmoy.id]: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
  [unichainSepolia.id]: "0x8ed94B8dAd2Dc5453862ea5e316A8e71AAed9782",
};
export type CctpV1SupportedChainId = keyof typeof tokenMessagerV1Addresses;

export const tokenMessagerV2Addresses = {
  // Mainnets
  [mainnet.id]: "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d",
  [avalanche.id]: "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d",
  [optimism.id]: "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d",
  [arbitrum.id]: "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d",
  [base.id]: "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d",
  [linea.id]: "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d",
  [sonic.id]: "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d",
  [worldchain.id]: "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d",
  [solana.id]: "CCTPV2vPZJS2u2BBsUoscuikbYjnpFmbFsvVuJdgUMQe",
  // Testnets
  [sepolia.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
  [avalancheFuji.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
  [optimismSepolia.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
  [arbitrumSepolia.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
  [baseSepolia.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
  [polygonAmoy.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
  [unichainSepolia.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
  [lineaSepolia.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
  // Codex Testnet	0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA
  [sonicBlazeTestnet.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
  [worldchainSepolia.id]: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
};
export type CctpV2SupportedChainId = keyof typeof tokenMessagerV2Addresses;

export const messageTransmitterV1Addresses = {
  // Mainnets
  [mainnet.id]: "0x0a992d191DEeC32aFe36203Ad87D7d289a738F81",
  [avalanche.id]: "0x8186359aF5F57FbB40c6b14A588d2A59C0C29880",
  [optimism.id]: "0x4D41f22c5a0e5c74090899E5a8Fb597a8842b3e8",
  [arbitrum.id]: "0xC30362313FBBA5cf9163F0bb16a0e01f01A896ca",
  [base.id]: "0xAD09780d193884d503182aD4588450C416D6F9D4",
  [polygon.id]: "0xF3be9355363857F3e001be68856A2f96b4C39Ba9",
  [unichain.id]: "0x353bE9E2E38AB1D19104534e4edC21c643Df86f4",
  [solana.id]: "CCTPmbSD7gX1bxKPAmg77w8oFzNFpaQiQUWD43TKaecd",
  // Testnets
  [sepolia.id]: "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD",
  [avalancheFuji.id]: "0xa9fB1b3009DCb79E2fe346c16a604B8Fa8aE0a79",
  [optimismSepolia.id]: "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD",
  [arbitrumSepolia.id]: "0xaCF1ceeF35caAc005e15888dDb8A3515C41B4872",
  [baseSepolia.id]: "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD",
  [polygonAmoy.id]: "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD",
  [unichainSepolia.id]: "0xbc498c326533d675cf571B90A2Ced265ACb7d086",
};

export const messageTransmitterV2Addresses = {
  // Mainnets
  [mainnet.id]: "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64",
  [avalanche.id]: "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64",
  [optimism.id]: "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64",
  [arbitrum.id]: "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64",
  [base.id]: "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64",
  [linea.id]: "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64",
  [sonic.id]: "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64",
  [worldchain.id]: "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64",
  [solana.id]: "CCTPV2Sm4AdWt5296sk4P66VBZ7bEhcARwFaaS9YPbeC",
  // Testnets
  [sepolia.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
  [avalancheFuji.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
  [optimismSepolia.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
  [arbitrumSepolia.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
  [baseSepolia.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
  [polygonAmoy.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
  [unichainSepolia.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
  [lineaSepolia.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
  // Codex Testnet	12	0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275
  [sonicBlazeTestnet.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
  [worldchainSepolia.id]: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
};
