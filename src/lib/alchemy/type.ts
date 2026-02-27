export namespace Alchemy {
  export interface ChainsResponse {
    result: { data: Chain[] }
  }

  export interface Chain {
    id: string
    kebabCaseId: string
    networkChainId?: number | null
  }

  export enum SupportedProduct {
    Blast = "blast",
    BlockTimestampAPI = "block-timestamp-api",
    BundlerAPI = "bundler-api",
    DebugAPI = "debug-api",
    EmbeddedAccounts = "embedded-accounts",
    GasManagerAPI = "gas-manager-api",
    NftAPI = "nft-api",
    NodeAPI = "node-api",
    PricesAPI = "prices-api",
    SmartWebsockets = "smart-websockets",
    Subgraphs = "subgraphs",
    TokenAPI = "token-api",
    TraceAPI = "trace-api",
    TransactionReceiptsAPI = "transaction-receipts-api",
    TransactionSimulationAPI = "transaction-simulation-api",
    TransfersAPI = "transfers-api",
    UserOperationsAPI = "user-operations-api",
    Webhooks = "webhooks",
  }

  export interface AssetTransfersResponse {
    jsonrpc: string
    id: number
    result: {
      transfers: Transfer[]
    }
  }

  export interface Transfer {
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
}
