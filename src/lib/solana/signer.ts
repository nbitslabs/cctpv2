import { type Provider } from "@reown/appkit-adapter-solana/react";
import { Address } from "@solana/kit";
import type { GetLatestBlockhashApi } from "@solana/rpc-api";
import type { TransactionSigner } from "@solana/signers";
import { Transaction, SignaturePubkeyPair, PublicKey } from "@solana/web3.js";

type GetLatestBlockhashApiResponse = ReturnType<
  GetLatestBlockhashApi["getLatestBlockhash"]
>["value"];

export function providerToTransactionSigner(
  provider: Provider
): TransactionSigner {
  if (!provider.publicKey) throw new Error("Provider is not connected");
  const thisAddressPk = provider.publicKey;
  return {
    address: thisAddressPk.toBase58() as Address,

    async signTransactions(transactions) {
      const txs = transactions.map((tx) => {
        const { lifetimeConstraint } = tx as unknown as {
          lifetimeConstraint: GetLatestBlockhashApiResponse;
        };
        console.log(transactions);

        const signatures = Object.entries(tx.signatures)
          .map(([address, signature]) => {
            if (!signature) return null;
            return {
              publicKey: new PublicKey(address),
              signature: Buffer.from(signature),
            } satisfies SignaturePubkeyPair;
          })
          .filter((signature) => !!signature);
        return new Transaction({
          signatures,
          recentBlockhash: lifetimeConstraint.blockhash,
          feePayer: thisAddressPk,
        }).add();
      });
      const signedTxs = await provider.signAllTransactions(txs);
      return signedTxs.map((tx) => {
        return {
          address: provider.publicKey?.toBase58() as Address,
          signatures: tx.signatures,
        };
      });
    },
  };
}
