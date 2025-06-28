import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import {
  Address,
  getAddressEncoder,
  getProgramDerivedAddress,
  getUtf8Encoder,
  isAddress,
  address,
} from "@solana/kit";
import { toBytes, Address as EvmAddress } from "viem";

export const evmAddressToSolana = (evmAddress: EvmAddress) =>
  address(bs58.encode(toBytes(evmAddressToBytes32(evmAddress))));

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
