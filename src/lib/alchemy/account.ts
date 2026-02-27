import { findBlockchain } from "@/hooks/bridgeKit"
import { Blockchain, EVMChainDefinition } from "@circle-fin/bridge-kit"
import axios from "axios"
import type { AlchemyChainsResponse, AssetTransfersResponse } from "./type"

export async function getAccountTransactions(
  blockchainId: Blockchain,
  address: string
) {
  const blockchain = findBlockchain(blockchainId)
  if (blockchain?.type === "solana") {
    return []
  }

  const chain = alchemySupportedChains.result.data.find(
    (chain) =>
      chain.networkChainId?.toString() ===
      (blockchain as EVMChainDefinition).chainId.toString()
  )
  if (!chain) return []

  const kebabCaseId = chain.kebabCaseId

  const url = `https://${kebabCaseId}.g.alchemy.com/v2/kVV691s2Iq_F1omMf9nY1`
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  }

  const [toAddressBody, fromAddressBody] = [0, 1].map((i) => ({
    id: 1,
    jsonrpc: "2.0",
    method: "alchemy_getAssetTransfers",
    params: [
      {
        fromBlock: "0x0",
        toBlock: "latest",
        toAddress: i === 0 ? address : undefined,
        fromAddress: i === 1 ? address : undefined,
        withMetadata: false,
        excludeZeroValue: true,
        category: ["erc20"],
        order: "desc",
      },
    ],
  }))

  const [toAddressResponse, fromAddressResponse] = await Promise.all([
    axios.post<AssetTransfersResponse>(url, toAddressBody, {
      headers,
    }),
    axios.post<AssetTransfersResponse>(url, fromAddressBody, {
      headers,
    }),
  ])

  return [
    ...(toAddressResponse.data.result?.transfers ?? []),
    ...(fromAddressResponse.data.result?.transfers ?? []),
  ]
    .filter((transfer) => ["USDC", "ETH"].includes(transfer.asset))
    .toSorted((a, b) => Number(b.blockNum) - Number(a.blockNum))
}

// "https://app-api.alchemy.com/trpc/config.getNetworkConfig"
const alchemySupportedChains: AlchemyChainsResponse = {
  result: {
    data: [
      {
        id: "ETH_MAINNET",
        networkChainId: 1,
        kebabCaseId: "eth-mainnet",
      },
      {
        id: "ETH_MAINNETBEACON",
        networkChainId: null,
        kebabCaseId: "eth-mainnetbeacon",
      },
      {
        id: "ARB_MAINNET",
        networkChainId: 42161,
        kebabCaseId: "arb-mainnet",
      },
      {
        id: "FLOW_MAINNET",
        networkChainId: 747,
        kebabCaseId: "flow-mainnet",
      },
      {
        id: "MATIC_MAINNET",
        networkChainId: 137,
        kebabCaseId: "polygon-mainnet",
      },
      {
        id: "OPT_MAINNET",
        networkChainId: 10,
        kebabCaseId: "opt-mainnet",
      },
      {
        id: "SOLANA_MAINNET",
        networkChainId: null,
        kebabCaseId: "solana-mainnet",
      },
      {
        id: "ASTAR_MAINNET",
        networkChainId: 592,
        kebabCaseId: "astar-mainnet",
      },
      {
        id: "POLYGONZKEVM_MAINNET",
        networkChainId: 1101,
        kebabCaseId: "polygonzkevm-mainnet",
      },
      {
        id: "STARKNET_MAINNET",
        networkChainId: null,
        kebabCaseId: "starknet-mainnet",
      },
      {
        id: "ADI_MAINNET",
        networkChainId: 36900,
        kebabCaseId: "adi-mainnet",
      },
      {
        id: "STABLE_MAINNET",
        networkChainId: 988,
        kebabCaseId: "stable-mainnet",
      },
      {
        id: "CLANKERMON_MAINNET",
        networkChainId: 510525,
        kebabCaseId: "clankermon-mainnet",
      },
      {
        id: "BASE_MAINNET",
        networkChainId: 8453,
        kebabCaseId: "base-mainnet",
      },
      {
        id: "CITREA_MAINNET",
        networkChainId: 4114,
        kebabCaseId: "citrea-mainnet",
      },
      {
        id: "TRON_MAINNET",
        networkChainId: 728126428,
        kebabCaseId: "tron-mainnet",
      },
      {
        id: "CELESTIABRIDGE_MAINNET",
        networkChainId: null,
        kebabCaseId: "celestiabridge-mainnet",
      },
      {
        id: "MYTHOS_MAINNET",
        networkChainId: 42018,
        kebabCaseId: "mythos-mainnet",
      },
      {
        id: "ZKSYNC_MAINNET",
        networkChainId: 324,
        kebabCaseId: "zksync-mainnet",
      },
      {
        id: "ZORA_MAINNET",
        networkChainId: 7777777,
        kebabCaseId: "zora-mainnet",
      },
      {
        id: "FRAX_MAINNET",
        networkChainId: 252,
        kebabCaseId: "frax-mainnet",
      },
      {
        id: "BNB_MAINNET",
        networkChainId: 56,
        kebabCaseId: "bnb-mainnet",
      },
      {
        id: "AVAX_MAINNET",
        networkChainId: 43114,
        kebabCaseId: "avax-mainnet",
      },
      {
        id: "ARBNOVA_MAINNET",
        networkChainId: 42170,
        kebabCaseId: "arbnova-mainnet",
      },
      {
        id: "WORLDCHAIN_MAINNET",
        networkChainId: 480,
        kebabCaseId: "worldchain-mainnet",
      },
      {
        id: "ZETACHAIN_MAINNET",
        networkChainId: 7000,
        kebabCaseId: "zetachain-mainnet",
      },
      {
        id: "BLAST_MAINNET",
        networkChainId: 81457,
        kebabCaseId: "blast-mainnet",
      },
      {
        id: "SCROLL_MAINNET",
        networkChainId: 534352,
        kebabCaseId: "scroll-mainnet",
      },
      {
        id: "LINEA_MAINNET",
        networkChainId: 59144,
        kebabCaseId: "linea-mainnet",
      },
      {
        id: "GNOSIS_MAINNET",
        networkChainId: 100,
        kebabCaseId: "gnosis-mainnet",
      },
      {
        id: "MANTLE_MAINNET",
        networkChainId: 5000,
        kebabCaseId: "mantle-mainnet",
      },
      {
        id: "CELO_MAINNET",
        networkChainId: 42220,
        kebabCaseId: "celo-mainnet",
      },
      {
        id: "BERACHAIN_MAINNET",
        networkChainId: 80094,
        kebabCaseId: "berachain-mainnet",
      },
      {
        id: "METIS_MAINNET",
        networkChainId: 1088,
        kebabCaseId: "metis-mainnet",
      },
      {
        id: "OPBNB_MAINNET",
        networkChainId: 204,
        kebabCaseId: "opbnb-mainnet",
      },
      {
        id: "POLYNOMIAL_MAINNET",
        networkChainId: 8008,
        kebabCaseId: "polynomial-mainnet",
      },
      {
        id: "SHAPE_MAINNET",
        networkChainId: 360,
        kebabCaseId: "shape-mainnet",
      },
      {
        id: "BOB_MAINNET",
        networkChainId: 60808,
        kebabCaseId: "bob-mainnet",
      },
      {
        id: "CROSSFI_MAINNET",
        networkChainId: 4158,
        kebabCaseId: "crossfi-mainnet",
      },
      {
        id: "MODE_MAINNET",
        networkChainId: 34443,
        kebabCaseId: "mode-mainnet",
      },
      {
        id: "MOONBEAM_MAINNET",
        networkChainId: 1284,
        kebabCaseId: "moonbeam-mainnet",
      },
      {
        id: "SEI_MAINNET",
        networkChainId: 1329,
        kebabCaseId: "sei-mainnet",
      },
      {
        id: "ANIME_MAINNET",
        networkChainId: 69000,
        kebabCaseId: "anime-mainnet",
      },
      {
        id: "APECHAIN_MAINNET",
        networkChainId: 33139,
        kebabCaseId: "apechain-mainnet",
      },
      {
        id: "LENS_MAINNET",
        networkChainId: 232,
        kebabCaseId: "lens-mainnet",
      },
      {
        id: "SONEIUM_MAINNET",
        networkChainId: 1868,
        kebabCaseId: "soneium-mainnet",
      },
      {
        id: "ROOTSTOCK_MAINNET",
        networkChainId: 30,
        kebabCaseId: "rootstock-mainnet",
      },
      {
        id: "UNICHAIN_MAINNET",
        networkChainId: 130,
        kebabCaseId: "unichain-mainnet",
      },
      {
        id: "SONIC_MAINNET",
        networkChainId: 146,
        kebabCaseId: "sonic-mainnet",
      },
      {
        id: "ABSTRACT_MAINNET",
        networkChainId: 2741,
        kebabCaseId: "abstract-mainnet",
      },
      {
        id: "MONAD_MAINNET",
        networkChainId: 143,
        kebabCaseId: "monad-mainnet",
      },
      {
        id: "SUPERSEED_MAINNET",
        networkChainId: 5330,
        kebabCaseId: "superseed-mainnet",
      },
      {
        id: "DEGEN_MAINNET",
        networkChainId: 666666666,
        kebabCaseId: "degen-mainnet",
      },
      {
        id: "SETTLUS_MAINNET",
        networkChainId: 5371,
        kebabCaseId: "settlus-mainnet",
      },
      {
        id: "INK_MAINNET",
        networkChainId: 57073,
        kebabCaseId: "ink-mainnet",
      },
      {
        id: "RONIN_MAINNET",
        networkChainId: 2020,
        kebabCaseId: "ronin-mainnet",
      },
      {
        id: "HUMANITY_MAINNET",
        networkChainId: 6985385,
        kebabCaseId: "humanity-mainnet",
      },
      {
        id: "BITCOIN_MAINNET",
        networkChainId: null,
        kebabCaseId: "bitcoin-mainnet",
      },
      {
        id: "STORY_MAINNET",
        networkChainId: 1514,
        kebabCaseId: "story-mainnet",
      },
      {
        id: "MEGAETH_MAINNET",
        networkChainId: 4326,
        kebabCaseId: "megaeth-mainnet",
      },
      {
        id: "APTOS_MAINNET",
        networkChainId: null,
        kebabCaseId: "aptos-mainnet",
      },
      {
        id: "SUI_MAINNET",
        networkChainId: null,
        kebabCaseId: "sui-mainnet",
      },
      {
        id: "BOTANIX_MAINNET",
        networkChainId: 3637,
        kebabCaseId: "botanix-mainnet",
      },
      {
        id: "WORLDMOBILECHAIN_MAINNET",
        networkChainId: 869,
        kebabCaseId: "worldmobilechain-mainnet",
      },
      {
        id: "HYPERLIQUID_MAINNET",
        networkChainId: 999,
        kebabCaseId: "hyperliquid-mainnet",
      },
      {
        id: "PLASMA_MAINNET",
        networkChainId: 9745,
        kebabCaseId: "plasma-mainnet",
      },
    ],
  },
}
