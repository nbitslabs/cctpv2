import { Connection, clusterApiUrl } from "@solana/web3.js";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";

const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

export const solanaConfig = {
  connection,
};

export const solanaAdapter = new SolanaAdapter();
