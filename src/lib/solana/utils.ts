import {
  Address,
  getAddressEncoder,
  getProgramDerivedAddress,
  getUtf8Encoder,
  isAddress,
  address as solAddress,
  getBase58Decoder,
} from "@solana/kit";
import { toBytes, Address as EvmAddress } from "viem";
import {
  findAssociatedTokenPda,
  TOKEN_PROGRAM_ADDRESS,
} from "@solana-program/token";

export const evmHexToSolHex = (evmHex: EvmAddress) =>
  solAddress(getBase58Decoder().decode(toBytes(evmHex)));
export const evmAddressToSolana = (evmAddress: EvmAddress) =>
  solAddress(
    getBase58Decoder().decode(toBytes(evmAddressToBytes32(evmAddress)))
  );
const evmAddressToBytes32 = (address: string): string =>
  `0x000000000000000000000000${address.replace("0x", "")}`;

export const hexToBytes = (hex: string): Buffer =>
  Buffer.from(hex.replace("0x", ""), "hex");

export const findProgramAddressKit = async (
  label: string,
  programAddress: Address,
  extraSeeds: (string | number[] | Address)[] | null = null
) => {
  const utf8Encoder = getUtf8Encoder();
  const seeds = [Buffer.from(utf8Encoder.encode(label))];

  if (extraSeeds) {
    for (const extraSeed of extraSeeds) {
      if (typeof extraSeed === "string") {
        if (isAddress(extraSeed)) {
          seeds.push(
            Buffer.from(getAddressEncoder().encode(extraSeed as Address))
          );
        } else seeds.push(Buffer.from(utf8Encoder.encode(extraSeed)));
      } else if (Array.isArray(extraSeed)) {
        seeds.push(Buffer.from(extraSeed as number[]));
      } else if (Buffer.isBuffer(extraSeed)) {
        seeds.push(extraSeed);
      }
    }
  }
  const [pda] = await getProgramDerivedAddress({ programAddress, seeds });
  return pda;
};
export async function getATA2(mint: string, owner: string) {
  const [tokenAccount] = await findAssociatedTokenPda({
    mint: solAddress(mint),
    owner: solAddress(owner),
    tokenProgram: TOKEN_PROGRAM_ADDRESS,
  });
  return tokenAccount;
}
