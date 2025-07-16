import { AppKitNetwork } from "@reown/appkit/networks";
import { CctpNetworkAdapter, CctpV2TransferType } from "./type";
import {
  readUsdcAllowance,
  simulateMessageTransmitterReceiveMessage,
  writeMessageTransmitterReceiveMessage,
  writeTokenMessagerDepositForBurn,
  writeUsdcApprove,
} from "../../wagmi/generated";
import { chainsByDomain, wagmiConfig, usdcAddresses } from "../../wagmi/config";
import {
  getAccount,
  getPublicClient,
  getWalletClient,
  readContract,
  waitForTransactionReceipt,
} from "wagmi/actions";
import { Address, Chain, erc20Abi, formatUnits, parseUnits } from "viem";
import { addChain } from "viem/actions";
import { defaultCctpOpts, USDC_DECIMALS } from "./constants";
import { getTokenMessagerAddress, getMessageTransmitterAddress } from "./util";

function getEvmNetworkAdapter(
  network: AppKitNetwork,
  options: Omit<CctpNetworkAdapter, "id" | "name" | "type">
): CctpNetworkAdapter {
  return {
    id: network.id,
    name: network.name,
    type: "evm",
    ...options,
  };
}

const {
  "0": _mainnet,
  "1": _avalanche,
  "2": _optimism,
  "3": _arbitrum,
  "4": _base,
  "7": _polygon,
  "10": _unichain,
  "11": _linea,
  "13": _sonic,
  "14": _worldchain,
} = chainsByDomain;

// https://developers.circle.com/stablecoins/supported-domains
const evmChains: Array<
  Pick<CctpNetworkAdapter, "domain"> & {
    chain: AppKitNetwork;
    supportV1: boolean;
    supportV2: boolean;
  }
> = [
  { chain: _mainnet, domain: 0, supportV1: true, supportV2: true },
  { chain: _avalanche, domain: 1, supportV1: true, supportV2: true },
  { chain: _optimism, domain: 2, supportV1: true, supportV2: true },
  { chain: _arbitrum, domain: 3, supportV1: true, supportV2: true },
  // noble: 4
  // solana: 5
  { chain: _base, domain: 6, supportV1: true, supportV2: true },
  { chain: _polygon, domain: 7, supportV1: true, supportV2: false },
  // sui: 8
  // aptos: 9
  { chain: _unichain, domain: 10, supportV1: true, supportV2: true },
  { chain: _linea, domain: 11, supportV1: true, supportV2: true },
  // codex: 12
  { chain: _sonic, domain: 13, supportV1: false, supportV2: true },
  { chain: _worldchain, domain: 14, supportV1: false, supportV2: true },
];

export const evmNetworkAdapters: CctpNetworkAdapter[] = evmChains.map(
  ({ chain, ...config }) => {
    const chainId = Number(chain.id);
    const usdcAddress = usdcAddresses[
      chainId as keyof typeof usdcAddresses
    ] as Address;

    const readConfig = { chainId: Number(chain.id) } as const;
    const publicClient = getPublicClient(wagmiConfig, readConfig);

    function requestChainIfNeeded<T, D extends unknown[]>(
      func: (...args: D) => Promise<T>
    ) {
      return async (...args: D) => {
        try {
          return func(...args);
        } catch (error) {
          if (
            (error as Error).message.includes(`Network ${chain.id} not found`)
          ) {
            const client = await getWalletClient(wagmiConfig);
            await addChain(client, { chain: chain as Chain });
            return func(...args);
          }
          throw error;
        }
      };
    }

    const readUsdcBalance = requestChainIfNeeded(async (address) => {
      if (!publicClient) throw new Error("No public client found");

      const balance = await readContract(wagmiConfig, {
        ...readConfig,
        address: usdcAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address as Address],
      });
      const raw = formatUnits(balance, USDC_DECIMALS);
      return {
        raw,
        formatted: Number(raw),
      };
    });

    return getEvmNetworkAdapter(chain, {
      ...config,
      usdcAddress,
      nativeCurrency: chain.nativeCurrency,
      v1: { support: config.supportV1 },
      v2: { support: config.supportV2 },

      explorer: chain.blockExplorers?.default,
      readUsdcBalance,
      readNativeBalance: requestChainIfNeeded(async (address) => {
        if (!publicClient) throw new Error("No public client found");

        const balance = await publicClient.getBalance({
          address: address as Address,
        });
        const raw = formatUnits(balance, chain.nativeCurrency.decimals);
        return {
          raw,
          formatted: Number(raw),
        };
      }),

      async writeTokenMessagerDepositForBurn(
        { address, amount, destination, ...options },
        cctpOpts = defaultCctpOpts
      ) {
        const tokenMessagerAddress = getTokenMessagerAddress(
          cctpOpts,
          chainId
        ) as Address;

        const allowance = await readUsdcAllowance(wagmiConfig, {
          chainId,
          address: usdcAddress,
          args: [address as Address, tokenMessagerAddress],
        });
        const formattedAllowance = Number(
          formatUnits(allowance, USDC_DECIMALS)
        );

        if (amount > formattedAllowance) {
          const tx = await writeUsdcApprove(wagmiConfig, {
            chainId,
            address: usdcAddress,
            args: [
              tokenMessagerAddress,
              parseUnits(amount.toString(), USDC_DECIMALS),
            ],
          });
          await waitForTransactionReceipt(wagmiConfig, { hash: tx });
        }

        let {
          transferType = CctpV2TransferType.Fast,
          maxFee,
          finalityThreshold,
          mintRecipient = getAccount(wagmiConfig).address,
        } = options;

        if (!mintRecipient) throw new Error("No mint recipient found");
        if (!config.supportV2) transferType = CctpV2TransferType.Standard;

        const rawAmount = parseUnits(amount.toString(), USDC_DECIMALS);

        maxFee = maxFee ?? rawAmount - 1n;
        finalityThreshold =
          finalityThreshold ??
          (transferType === CctpV2TransferType.Fast ? 1000 : 2000);

        const tx = await writeTokenMessagerDepositForBurn(wagmiConfig, {
          chainId,
          address: tokenMessagerAddress,
          args: [
            rawAmount,
            destination.domain,
            getMintRecipient(mintRecipient),
            usdcAddress,
            "0x0000000000000000000000000000000000000000000000000000000000000000",
            maxFee,
            finalityThreshold,
          ],
        });
        await waitForTransactionReceipt(wagmiConfig, {
          chainId,
          hash: tx,
        });
        return tx;
      },

      async simulateMessageTransmitterReceiveMessage(
        message,
        attestation,
        cctpOpts = defaultCctpOpts
      ) {
        const messageTransmitterAddress = getMessageTransmitterAddress(
          cctpOpts,
          chainId
        ) as Address;
        const { result } = await simulateMessageTransmitterReceiveMessage(
          wagmiConfig,
          {
            chainId,
            address: messageTransmitterAddress,
            args: [message as Address, attestation as Address],
          }
        );
        return result;
      },

      async writeMessageTransmitterReceiveMessage(
        message,
        attestation,
        cctpOpts = defaultCctpOpts
      ) {
        const messageTransmitterAddress = getMessageTransmitterAddress(
          cctpOpts,
          chainId
        ) as Address;
        const tx = await writeMessageTransmitterReceiveMessage(wagmiConfig, {
          chainId,
          address: messageTransmitterAddress,
          args: [message as Address, attestation as Address],
        });
        await waitForTransactionReceipt(wagmiConfig, { chainId, hash: tx });
        return tx;
      },
    });
  }
);

function getMintRecipient(destinationAddress: string) {
  return `0x${destinationAddress.replace(/^0x/, "").padStart(64, "0")}` satisfies Address;
}
