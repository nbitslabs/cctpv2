import { AppKitNetwork } from "@reown/appkit/networks";
import {
  CctpFunctionOpts,
  CctpNetworkAdapter,
  CctpV2TransferType,
} from "./type";
import {
  readUsdcAllowance,
  simulateMessageTransmitterReceiveMessage,
  writeMessageTransmitterReceiveMessage,
  writeTokenMessagerDepositForBurn,
  writeUsdcApprove,
} from "../../wagmi/generated";
import {
  chainsByDomain,
  wagmiConfig,
  usdcAddresses,
  tokenMessagerV1Addresses,
  CctpV1SupportedChainId,
  CctpV2SupportedChainId,
  messageTransmitterV1Addresses,
  tokenMessagerV2Addresses,
  messageTransmitterV2Addresses,
} from "../../wagmi/config";
import {
  getAccount,
  getPublicClient,
  getWalletClient,
  readContract,
  switchChain,
  waitForTransactionReceipt,
} from "wagmi/actions";
import { Address, Chain, erc20Abi, formatUnits, parseUnits } from "viem";
import { addChain } from "viem/actions";
import { defaultCctpOpts } from "./constants";

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

// [sonicBlazeTestnet.id]: "0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6",
// [lineaSepolia.id]: "0xFEce4462D57bD51A6A552365A011b95f0E16d9B7",

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

const USDC_DECIMALS = 6;

export const evmNetworkAdapters = evmChains.map(({ chain, ...config }) => {
  const chainId = Number(chain.id);
  const usdcAddress = usdcAddresses[
    chainId as keyof typeof usdcAddresses
  ] as Address;

  const readConfig = { chainId: Number(chain.id) } as const;
  const publicClient = getPublicClient(wagmiConfig, readConfig);

  function requestChainIfNeeded<T>(func: () => Promise<T>) {
    return async () => {
      try {
        return func();
      } catch (error) {
        if (
          (error as Error).message.includes(`Network ${chain.id} not found`)
        ) {
          const client = await getWalletClient(wagmiConfig);
          await addChain(client, { chain: chain as Chain });
          return func();
        }
        throw error;
      }
    };
  }

  function getTokenMessagerAddress(cctpOpts: CctpFunctionOpts) {
    return cctpOpts.version === "v1"
      ? tokenMessagerV1Addresses[chainId as CctpV1SupportedChainId]
      : tokenMessagerV2Addresses[chainId as CctpV2SupportedChainId];
  }

  function getMessageTransmitterAddress(cctpOpts: CctpFunctionOpts) {
    return cctpOpts.version === "v1"
      ? messageTransmitterV1Addresses[chainId as CctpV1SupportedChainId]
      : messageTransmitterV2Addresses[chainId as CctpV2SupportedChainId];
  }

  return getEvmNetworkAdapter(chain, {
    ...config,
    usdcAddress,
    nativeCurrency: chain.nativeCurrency,
    v1: {
      support: config.supportV1,
      tokenMessagerAddress:
        tokenMessagerV1Addresses[chainId as CctpV1SupportedChainId],
      messageTransmitterAddress:
        messageTransmitterV1Addresses[chainId as CctpV1SupportedChainId],
    },
    v2: {
      support: config.supportV2,
      tokenMessagerAddress:
        tokenMessagerV2Addresses[chainId as CctpV2SupportedChainId],
      messageTransmitterAddress:
        messageTransmitterV2Addresses[chainId as CctpV2SupportedChainId],
    },

    readNativeBalance: requestChainIfNeeded(async () => {
      if (!publicClient) throw new Error("No public client found");

      const { address } = getAccount(wagmiConfig);
      if (!address) throw new Error("No account found");

      const balance = await publicClient.getBalance({ address });
      const raw = formatUnits(balance, chain.nativeCurrency.decimals);
      return {
        raw,
        formatted: Number(raw),
      };
    }),

    readUsdcBalance: requestChainIfNeeded(async () => {
      if (!publicClient) throw new Error("No public client found");

      const { address } = getAccount(wagmiConfig);
      if (!address) throw new Error("No account found");

      const balance = await readContract(wagmiConfig, {
        ...readConfig,
        address: usdcAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address],
      });
      const raw = formatUnits(balance, USDC_DECIMALS);
      return {
        raw,
        formatted: Number(raw),
      };
    }),

    readAllowanceForTokenMessager: async (cctpOpts = defaultCctpOpts) => {
      const { address } = getAccount(wagmiConfig);
      if (!address) throw new Error("No account found");
      const allowance = await readUsdcAllowance(wagmiConfig, {
        address: usdcAddress,
        args: [getTokenMessagerAddress(cctpOpts), address],
      });
      const raw = formatUnits(allowance, USDC_DECIMALS);
      return {
        raw,
        formatted: Number(raw),
      };
    },

    async writeApproveForTokenMessager(amount, cctpOpts = defaultCctpOpts) {
      const tokenMessagerAddress = getTokenMessagerAddress(cctpOpts);
      const { isConnected } = getAccount(wagmiConfig);
      if (!isConnected) throw new Error("No account found");
      const tx = await writeUsdcApprove(wagmiConfig, {
        address: usdcAddress,
        args: [
          getTokenMessagerAddress(cctpOpts),
          parseUnits(amount.toString(), USDC_DECIMALS),
        ],
      });
      await waitForTransactionReceipt(wagmiConfig, { hash: tx });
      return tx;
    },

    async writeTokenMessagerDepositForBurn(
      amount,
      destinationDomain,
      options = {},
      cctpOpts = defaultCctpOpts
    ) {
      const tokenMessagerAddress = getTokenMessagerAddress(cctpOpts);
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
        address: tokenMessagerAddress,
        args: [
          rawAmount,
          destinationDomain,
          getMintRecipient(mintRecipient),
          usdcAddress,
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          maxFee,
          finalityThreshold,
        ],
      });
      await waitForTransactionReceipt(wagmiConfig, { hash: tx });
      return tx;
    },

    async simulateMessageTransmitterReceiveMessage(
      message,
      attestation,
      cctpOpts = defaultCctpOpts
    ) {
      const messageTransmitterAddress = getMessageTransmitterAddress(cctpOpts);
      const { result } = await simulateMessageTransmitterReceiveMessage(
        wagmiConfig,
        {
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
      const messageTransmitterAddress = getMessageTransmitterAddress(cctpOpts);
      const tx = await writeMessageTransmitterReceiveMessage(wagmiConfig, {
        address: messageTransmitterAddress,
        args: [message as Address, attestation as Address],
      });
      await waitForTransactionReceipt(wagmiConfig, { hash: tx });
      return tx;
    },

    switchNetwork: requestChainIfNeeded(async () => {
      await switchChain(wagmiConfig, { chainId });
    }),
  });
});

function getMintRecipient(destinationAddress: string): Address {
  return `0x${destinationAddress.replace(/^0x/, "").padStart(64, "0")}`;
}
