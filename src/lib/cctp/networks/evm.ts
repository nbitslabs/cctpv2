import {
  AppKitNetwork,
  arbitrumSepolia,
  avalancheFuji,
  baseSepolia,
  lineaSepolia,
  optimismSepolia,
  polygonAmoy,
  sepolia,
  sonicBlazeTestnet,
  unichainSepolia,
  worldchainSepolia,
} from "@reown/appkit/networks";
import { CctpNetworkAdapter, CctpTransferType } from "./type";
import {
  readUsdcAllowance,
  simulateMessageTransmitterReceiveMessage,
  writeMessageTransmitterReceiveMessage,
  writeTokenMessagerDepositForBurn,
  writeUsdcApprove,
} from "../../wagmi/generated";
import { wagmiConfig } from "../../wagmi/config";
import {
  getAccount,
  getPublicClient,
  readContract,
  switchChain,
  waitForTransactionReceipt,
} from "wagmi/actions";
import { Address, erc20Abi, formatUnits, parseUnits } from "viem";

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

const supportedEvmChains = [
  sepolia,
  avalancheFuji,
  optimismSepolia,
  arbitrumSepolia,
  baseSepolia,
  polygonAmoy,
  unichainSepolia,
  lineaSepolia,
  sonicBlazeTestnet,
  worldchainSepolia,
] satisfies [AppKitNetwork, ...AppKitNetwork[]];
type SupportedChainId = (typeof supportedEvmChains)[number]["id"];

// [sonicBlazeTestnet.id]: "0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6",
// [lineaSepolia.id]: "0xFEce4462D57bD51A6A552365A011b95f0E16d9B7",

// https://developers.circle.com/stablecoins/supported-domains
const evmChains: Array<
  Pick<
    CctpNetworkAdapter,
    "domain" | "supportV1" | "supportV2" | "usdcAddress"
  > & {
    chain: AppKitNetwork;
  }
> = [
  {
    chain: sepolia,
    domain: 0,
    supportV1: true,
    supportV2: true,
    usdcAddress: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238",
  },
  {
    chain: avalancheFuji,
    domain: 1,
    supportV1: true,
    supportV2: true,
    usdcAddress: "0x5425890298aed601595a70AB815c96711a31Bc65",
  },
  {
    chain: optimismSepolia,
    domain: 2,
    supportV1: true,
    supportV2: true,
    usdcAddress: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
  },
  {
    chain: arbitrumSepolia,
    domain: 3,
    supportV1: true,
    supportV2: true,
    usdcAddress: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
  },
  // noble: 4
  // solana: 5
  {
    chain: baseSepolia,
    domain: 6,
    supportV1: true,
    supportV2: true,
    usdcAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  },
  {
    chain: polygonAmoy,
    domain: 7,
    supportV1: true,
    supportV2: false,
    usdcAddress: "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582",
  },
  // sui: 8
  // aptos: 9
  {
    chain: unichainSepolia,
    domain: 10,
    supportV1: true,
    supportV2: true,
    usdcAddress: "0x31d0220469e10c4E71834a79b1f276d740d3768F",
  },
  {
    chain: lineaSepolia,
    domain: 11,
    supportV1: true,
    supportV2: true,
    usdcAddress: "0xFEce4462D57bD51A6A552365A011b95f0E16d9B7",
  },
  // codex: 12
  {
    chain: sonicBlazeTestnet,
    domain: 13,
    supportV1: false,
    supportV2: true,
    usdcAddress: "0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6",
  },
  {
    chain: worldchainSepolia,
    domain: 14,
    supportV1: false,
    supportV2: true,
    usdcAddress: "0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88",
  },
];

const USDC_DECIMALS = 6;

export const evmNetworkAdapters = evmChains.map(({ chain, ...config }) => {
  const tokenMessagerAddress = "0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa";
  const messageTransmitterAddress =
    "0xe737e5cebeeba77efe34d4aa090756590b1ce275";

  const readConfig = {
    chainId: Number(chain.id),
  } as const;
  const publicClient = getPublicClient(wagmiConfig, readConfig);
  return getEvmNetworkAdapter(chain, {
    ...config,
    tokenMessagerAddress,
    messageTransmitterAddress,
    nativeCurrency: chain.nativeCurrency,

    readNativeBalance: async () => {
      if (!publicClient) throw new Error("No public client found");

      const { address } = getAccount(wagmiConfig);
      if (!address) throw new Error("No account found");

      const balance = await publicClient.getBalance({ address });
      const raw = formatUnits(balance, chain.nativeCurrency.decimals);
      return {
        raw,
        formatted: Number(raw),
      };
    },

    readUsdcBalance: async () => {
      if (!publicClient) throw new Error("No public client found");

      const { address } = getAccount(wagmiConfig);
      if (!address) throw new Error("No account found");

      const balance = await readContract(wagmiConfig, {
        ...readConfig,
        address: config.usdcAddress as Address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address],
      });
      const raw = formatUnits(balance, USDC_DECIMALS);
      return {
        raw,
        formatted: Number(raw),
      };
    },

    readAllowanceForTokenMessager: async () => {
      const { address } = getAccount(wagmiConfig);
      if (!address) throw new Error("No account found");
      const allowance = await readUsdcAllowance(wagmiConfig, {
        args: [tokenMessagerAddress, address],
      });
      const raw = formatUnits(allowance, USDC_DECIMALS);
      return {
        raw,
        formatted: Number(raw),
      };
    },

    async writeApproveForTokenMessager(amount) {
      const { isConnected } = getAccount(wagmiConfig);
      if (!isConnected) throw new Error("No account found");
      const tx = await writeUsdcApprove(wagmiConfig, {
        args: [
          tokenMessagerAddress,
          parseUnits(amount.toString(), USDC_DECIMALS),
        ],
      });
      await waitForTransactionReceipt(wagmiConfig, { hash: tx });
      return tx;
    },

    async writeTokenMessagerDepositForBurn(
      amount,
      destinationDomain,
      options = {}
    ) {
      let {
        transferType = CctpTransferType.Fast,
        maxFee,
        finalityThreshold,
        mintRecipient = getAccount(wagmiConfig).address,
      } = options;

      if (!mintRecipient) throw new Error("No mint recipient found");
      if (!config.supportV2) transferType = CctpTransferType.Standard;

      const rawAmount = parseUnits(amount.toString(), USDC_DECIMALS);

      maxFee = maxFee ?? rawAmount - 1n;
      finalityThreshold =
        finalityThreshold ??
        (transferType === CctpTransferType.Fast ? 1000 : 2000);

      const tx = await writeTokenMessagerDepositForBurn(wagmiConfig, {
        args: [
          rawAmount,
          destinationDomain,
          getMintRecipient(mintRecipient),
          config.usdcAddress as Address,
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          maxFee,
          finalityThreshold,
        ],
      });
      await waitForTransactionReceipt(wagmiConfig, { hash: tx });
      return tx;
    },

    async simulateMessageTransmitterReceiveMessage(message, attestation) {
      const { result } = await simulateMessageTransmitterReceiveMessage(
        wagmiConfig,
        { args: [message as Address, attestation as Address] }
      );
      return result;
    },

    async writeMessageTransmitterReceiveMessage(message, attestation) {
      const tx = await writeMessageTransmitterReceiveMessage(wagmiConfig, {
        args: [message as Address, attestation as Address],
      });
      await waitForTransactionReceipt(wagmiConfig, { hash: tx });
      return tx;
    },

    switchNetwork: async () => {
      await switchChain(wagmiConfig, { chainId: Number(chain.id) });
    },
  });
});

function getMintRecipient(destinationAddress: string): Address {
  return `0x${destinationAddress.replace(/^0x/, "").padStart(64, "0")}`;
}
