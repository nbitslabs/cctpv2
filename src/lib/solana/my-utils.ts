import {
  findAssociatedTokenPda,
  TOKEN_PROGRAM_ADDRESS,
} from "@solana-program/token";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { address as solAddress } from "@solana/kit";

/**
 * Get the associated token address for a given mint and owner
 * TODO: Migrate to @solana-program/token
 */
export function getATA(mint: string | PublicKey, owner: string | PublicKey) {
  return getAssociatedTokenAddress(
    typeof mint === "string" ? new PublicKey(mint) : mint,
    typeof owner === "string" ? new PublicKey(owner) : owner
  );
}

export async function getATA2(mint: string, owner: string) {
  const [tokenAccount] = await findAssociatedTokenPda({
    mint: solAddress(mint),
    owner: solAddress(owner),
    tokenProgram: TOKEN_PROGRAM_ADDRESS,
  });
  return tokenAccount;
}
