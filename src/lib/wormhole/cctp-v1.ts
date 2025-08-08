import { SignAndSendSigner } from "@wormhole-foundation/sdk";
import { arbitrum } from "viem/chains";
import { createSolanaClient } from "gill";
import { useWalletAccountTransactionSigner } from "@solana/react";

export const wormholdNetworkMap = {
  [arbitrum.id]: "",
};

export async function getSolanaSigner(
  walletSigner: ReturnType<typeof useWalletAccountTransactionSigner>
): Promise<SignAndSendSigner<"Mainnet", "Solana">> {
  const { rpc, sendAndConfirmTransaction } = createSolanaClient({
    urlOrMoniker: `https://wispy-icy-liquid.solana-mainnet.quiknode.pro/1b10c09ce4cbf223215490fc24ad0fb398e470a4/`,
  });
  return {
    address: () => walletSigner.address,
    chain: () => "Solana",
    signAndSend: (tx) => {
      return walletSigner.modifyAndSignTransactions(
        tx.map((t) => t.transaction)
      );
    },
  };
}
