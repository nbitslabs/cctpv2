import {
  findAssociatedTokenPda,
  TOKEN_PROGRAM_ADDRESS,
} from "@solana-program/token";
import { address as solAddress } from "@solana/kit";

export async function getATA2(mint: string, owner: string) {
  const [tokenAccount] = await findAssociatedTokenPda({
    mint: solAddress(mint),
    owner: solAddress(owner),
    tokenProgram: TOKEN_PROGRAM_ADDRESS,
  });
  return tokenAccount;
}
