export namespace Alchemy {
  export interface ChainsResponse {
    result: { data: Chain[] };
  }

  export interface Chain {
    id: string;
    name: string;
    chainId: string;
    kebabCaseId: string;
    explorerUrl: string;
    networkChainId?: number | null;
    availability: "public";
    publicOverrideFlag: string;
    sdkEnum: string;
    faucetUrl: string;
    bridgeUrl: string;
    isTestNet: boolean;
    currency: string;
    docsUrl: string;
    blockSpeed: string;
    websiteUrl: string;
    githubUrl: string;
    supportedProducts: SupportedProduct[];
    supportedWebhookTypes: number[];
    supportsMempool: boolean;
    networkLegacyProtoNumber: number;
    apiVersionEndpoints?: {
      v0_8: string;
      v0_7: string;
      v0_6: string;
    };
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
    jsonrpc: string;
    id: number;
    result: {
      transfers: Transfer[];
    };
  }

  export interface Transfer {
    asset: string;
    blockNum: string;
    uniqueId: string;
    hash: string;
    from: string;
    to: string;
    value: string;
    erc721TokenId: string;
    erc1155Metadata: null;
    tokenId: string;
  }
}
