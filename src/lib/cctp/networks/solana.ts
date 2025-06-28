import { solana } from "@reown/appkit/networks";
import {
  CctpNetworkAdapter,
  CctpFunctionOpts,
  CctpV2TransferType,
} from "./type";
import { usdcAddresses } from "@/lib/wagmi/config";
import { lamportsToSol } from "gill";
import { address as solAddress } from "@solana/kit";
import { createSolanaRpc } from "@solana/kit";
import { getATA2 } from "@/lib/solana/my-utils";

const rpc = createSolanaRpc(
  `https://solana-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
);

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

      const formatted = Number(lamportsToSol(lamports));
      return { raw: formatted.toString(), formatted };
    },

    async readUsdcBalance(address: string) {
      const tokenAccount = await getATA2(solanaUsdcAddress, address);
      const { value: tokenAccountInfo } = await rpc
        .getTokenAccountBalance(solAddress(tokenAccount.toString()))
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
      destinationDomain: number,
      _options?: {
        mintRecipient?: string;
        maxFee?: bigint;
        finalityThreshold?: number;
        transferType?: CctpV2TransferType;
      },
      _cctpOpts?: CctpFunctionOpts
    ) {
      const { anchorProvider } = _cctpOpts || {};
      if (!anchorProvider) throw new Error("Anchor provider is required");

      const { mintRecipient, maxFee, finalityThreshold, transferType } =
        _options || {};
      if (!mintRecipient) throw new Error("No mint recipient found");
      return "";
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
