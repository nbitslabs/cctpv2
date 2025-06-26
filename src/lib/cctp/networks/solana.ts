import { solana } from "@reown/appkit/networks";
import {
  CctpNetworkAdapter,
  CctpFunctionOpts,
  CctpV2TransferType,
} from "./type";
import { usdcAddresses } from "@/lib/wagmi/config";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { address as solAddress } from "@solana/kit";
import {
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  sendAndConfirmTransactionFactory,
} from "@solana/kit";

import { TOKEN_PROGRAM_ADDRESS } from "@solana-program/token";
import { findAssociatedTokenPda } from "@solana-program/token-2022";

const rpc = createSolanaRpc(
  `https://solana-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
);
const rpcSubscriptions = createSolanaRpcSubscriptions(
  `wss://solana-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
);
const sendAndConfirmTransaction = sendAndConfirmTransactionFactory({
  rpc,
  rpcSubscriptions,
});

const solanaUsdcAddress = usdcAddresses[solana.id];
export const solanaNetworkAdapters: CctpNetworkAdapter[] = [
  {
    id: solana.id,
    name: solana.name,
    domain: 5,
    type: "solana",
    nativeCurrency: solana.nativeCurrency,
    explorer: solana.blockExplorers.default,
    v1: { support: true },
    v2: { support: true },
    usdcAddress: solanaUsdcAddress,

    async readNativeBalance(address: string) {
      const { value: lamports } = await rpc
        .getBalance(solAddress(address))
        .send();

      const formatted = Number(lamports) / LAMPORTS_PER_SOL;
      return { raw: formatted.toString(), formatted };
    },

    async readUsdcBalance(address: string) {
      const [tokenAccount] = await findAssociatedTokenPda({
        mint: solAddress(solanaUsdcAddress),
        owner: solAddress(address),
        tokenProgram: TOKEN_PROGRAM_ADDRESS,
      });
      const { value: tokenAccountInfo } = await rpc
        .getTokenAccountBalance(tokenAccount)
        .send();
      const raw = tokenAccountInfo.uiAmountString;

      return { raw, formatted: Number(raw) };
    },

    async readAllowanceForTokenMessager(
      address: string,
      _cctpOpts?: CctpFunctionOpts
    ) {
      // SPL tokens do not have ERC20-style allowance by default
      // You can implement delegate logic if needed
      return { raw: "0", formatted: 0 };
    },

    async writeApproveForTokenMessager(
      _amount: number,
      _cctpOpts?: CctpFunctionOpts
    ) {
      // TODO: Implement SPL Token approveChecked logic if needed
      // This would require the owner's Keypair and delegate address
      throw new Error(
        "Not implemented: SPL Token approveChecked requires wallet context"
      );
    },

    async writeTokenMessagerDepositForBurn(
      _amount: number,
      _destinationDomain: number,
      _options?: {
        mintRecipient?: string;
        maxFee?: bigint;
        finalityThreshold?: number;
        transferType?: CctpV2TransferType;
      },
      _cctpOpts?: CctpFunctionOpts
    ) {
      // TODO: Implement CCTP deposit for burn on Solana
      throw new Error("Not implemented: CCTP deposit for burn on Solana");
    },

    async simulateMessageTransmitterReceiveMessage(
      _message: string,
      _attestation: string,
      _cctpOpts?: CctpFunctionOpts
    ) {
      // TODO: Implement simulation logic if possible
      return true;
    },

    async writeMessageTransmitterReceiveMessage(
      _message: string,
      _attestation: string,
      _cctpOpts?: CctpFunctionOpts
    ) {
      // TODO: Implement CCTP receive message on Solana
      throw new Error("Not implemented: CCTP receive message on Solana");
    },

    async switchNetwork() {
      // Not applicable for Solana
      return;
    },
  },
];
