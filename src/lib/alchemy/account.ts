"use server";
import axios from "axios";
import type { CctpNetworkAdapterId } from "../cctp/networks";
import type { Alchemy } from "./type";

const alchemyApiKey = process.env.ALCHEMY_API_KEY;

export async function getAlchemyChains() {
  const response = await axios.get<Alchemy.ChainsResponse>(
    "https://app-api.alchemy.com/trpc/config.getNetworkConfig"
  );
  return response.data.result.data;
}

export async function getAccountTransactions(
  networkId: CctpNetworkAdapterId,
  address: string
) {
  const chains = await getAlchemyChains();
  const chain = chains.find(
    (chain) => chain.networkChainId?.toString() === networkId.toString()
  );
  if (!chain) throw new Error(`Network ${networkId} not found`);

  const url = `https://${chain.kebabCaseId}.g.alchemy.com/v2/${alchemyApiKey}`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

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
  }));

  const [toAddressResponse, fromAddressResponse] = await Promise.all([
    axios.post<Alchemy.AssetTransfersResponse>(url, toAddressBody, {
      headers,
    }),
    axios.post<Alchemy.AssetTransfersResponse>(url, fromAddressBody, {
      headers,
    }),
  ]);

  return [
    ...toAddressResponse.data.result.transfers,
    ...fromAddressResponse.data.result.transfers,
  ]
    .filter((transfer) => ["USDC", "ETH"].includes(transfer.asset))
    .toSorted((a, b) => Number(b.blockNum) - Number(a.blockNum));
}
