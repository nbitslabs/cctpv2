export interface AlchemyChainsResponse {
  result: {
    data: Array<{
      id: string
      kebabCaseId: string
      networkChainId?: number | null
    }>
  }
}

export interface AssetTransfersResponse {
  jsonrpc: string
  id: number
  result: {
    transfers: Transfer[]
  }
}

interface Transfer {
  asset: string
  blockNum: string
  uniqueId: string
  hash: string
  from: string
  to: string
  value: string
  erc721TokenId: string
  erc1155Metadata: null
  tokenId: string
}
