import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from 'wagmi/codegen'

import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// messageTransmitter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const messageTransmitterAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_localDomain', internalType: 'uint32', type: 'uint32' },
      { name: '_version', internalType: 'uint32', type: 'uint32' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'attester',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'AttesterDisabled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'attester',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'AttesterEnabled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAttesterManager',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newAttesterManager',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'AttesterManagerUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newMaxMessageBodySize',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MaxMessageBodySizeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sourceDomain',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      {
        name: 'nonce',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'finalityThresholdExecuted',
        internalType: 'uint32',
        type: 'uint32',
        indexed: true,
      },
      {
        name: 'messageBody',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'MessageReceived',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'message', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'MessageSent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'Pause' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'PauserChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newRescuer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RescuerChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldSignatureThreshold',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newSignatureThreshold',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SignatureThresholdUpdated',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'Unpause' },
  {
    type: 'function',
    inputs: [],
    name: 'NONCE_USED',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'attesterManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'attester', internalType: 'address', type: 'address' }],
    name: 'disableAttester',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newAttester', internalType: 'address', type: 'address' }],
    name: 'enableAttester',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'getEnabledAttester',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getNumEnabledAttesters',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner_', internalType: 'address', type: 'address' },
      { name: 'pauser_', internalType: 'address', type: 'address' },
      { name: 'rescuer_', internalType: 'address', type: 'address' },
      { name: 'attesterManager_', internalType: 'address', type: 'address' },
      { name: 'attesters_', internalType: 'address[]', type: 'address[]' },
      { name: 'signatureThreshold_', internalType: 'uint256', type: 'uint256' },
      { name: 'maxMessageBodySize_', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'initializedVersion',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'attester', internalType: 'address', type: 'address' }],
    name: 'isEnabledAttester',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'localDomain',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxMessageBodySize',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pauser',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'message', internalType: 'bytes', type: 'bytes' },
      { name: 'attestation', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'receiveMessage',
    outputs: [{ name: 'success', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'tokenContract',
        internalType: 'contract IERC20',
        type: 'address',
      },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'rescueERC20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rescuer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'destinationDomain', internalType: 'uint32', type: 'uint32' },
      { name: 'recipient', internalType: 'bytes32', type: 'bytes32' },
      { name: 'destinationCaller', internalType: 'bytes32', type: 'bytes32' },
      { name: 'minFinalityThreshold', internalType: 'uint32', type: 'uint32' },
      { name: 'messageBody', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'sendMessage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newMaxMessageBodySize',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setMaxMessageBodySize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newSignatureThreshold',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setSignatureThreshold',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'signatureThreshold',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newAttesterManager', internalType: 'address', type: 'address' },
    ],
    name: 'updateAttesterManager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newPauser', internalType: 'address', type: 'address' }],
    name: 'updatePauser',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newRescuer', internalType: 'address', type: 'address' }],
    name: 'updateRescuer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'usedNonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
] as const

/**
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const messageTransmitterAddress = {
  43113: '0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275',
  57054: '0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275',
  59141: '0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275',
  80002: '0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275',
  84532: '0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275',
  421614: '0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275',
  11155111: '0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275',
} as const

/**
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const messageTransmitterConfig = {
  address: messageTransmitterAddress,
  abi: messageTransmitterAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// tokenMessager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const tokenMessagerAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_messageTransmitter', internalType: 'address', type: 'address' },
      { name: '_messageBodyVersion', internalType: 'uint32', type: 'uint32' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Denylisted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldDenylister',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newDenylister',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'DenylisterChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'burnToken',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'depositor',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'mintRecipient',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'destinationDomain',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      {
        name: 'destinationTokenMessenger',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'destinationCaller',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'maxFee',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'minFinalityThreshold',
        internalType: 'uint32',
        type: 'uint32',
        indexed: true,
      },
      {
        name: 'hookData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'DepositForBurn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'feeRecipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'FeeRecipientSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'localMinter',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'LocalMinterAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'localMinter',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'LocalMinterRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'mintRecipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'mintToken',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'feeCollected',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MintAndWithdraw',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'domain',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      {
        name: 'tokenMessenger',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'RemoteTokenMessengerAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'domain',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      {
        name: 'tokenMessenger',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'RemoteTokenMessengerRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newRescuer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RescuerChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'UnDenylisted',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newLocalMinter', internalType: 'address', type: 'address' },
    ],
    name: 'addLocalMinter',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'domain', internalType: 'uint32', type: 'uint32' },
      { name: 'tokenMessenger', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'addRemoteTokenMessenger',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'denylist',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'denylister',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'destinationDomain', internalType: 'uint32', type: 'uint32' },
      { name: 'mintRecipient', internalType: 'bytes32', type: 'bytes32' },
      { name: 'burnToken', internalType: 'address', type: 'address' },
      { name: 'destinationCaller', internalType: 'bytes32', type: 'bytes32' },
      { name: 'maxFee', internalType: 'uint256', type: 'uint256' },
      { name: 'minFinalityThreshold', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'depositForBurn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'destinationDomain', internalType: 'uint32', type: 'uint32' },
      { name: 'mintRecipient', internalType: 'bytes32', type: 'bytes32' },
      { name: 'burnToken', internalType: 'address', type: 'address' },
      { name: 'destinationCaller', internalType: 'bytes32', type: 'bytes32' },
      { name: 'maxFee', internalType: 'uint256', type: 'uint256' },
      { name: 'minFinalityThreshold', internalType: 'uint32', type: 'uint32' },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'depositForBurnWithHook',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeRecipient',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'remoteDomain', internalType: 'uint32', type: 'uint32' },
      { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'uint32', type: 'uint32' },
      { name: 'messageBody', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'handleReceiveFinalizedMessage',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'remoteDomain', internalType: 'uint32', type: 'uint32' },
      { name: 'sender', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'finalityThresholdExecuted',
        internalType: 'uint32',
        type: 'uint32',
      },
      { name: 'messageBody', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'handleReceiveUnfinalizedMessage',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner_', internalType: 'address', type: 'address' },
      { name: 'rescuer_', internalType: 'address', type: 'address' },
      { name: 'feeRecipient_', internalType: 'address', type: 'address' },
      { name: 'denylister_', internalType: 'address', type: 'address' },
      { name: 'tokenMinter_', internalType: 'address', type: 'address' },
      { name: 'remoteDomains_', internalType: 'uint32[]', type: 'uint32[]' },
      {
        name: 'remoteTokenMessengers_',
        internalType: 'bytes32[]',
        type: 'bytes32[]',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'initializedVersion',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'isDenylisted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'localMessageTransmitter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'localMinter',
    outputs: [
      { name: '', internalType: 'contract ITokenMinterV2', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'messageBodyVersion',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    name: 'remoteTokenMessengers',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'removeLocalMinter',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'domain', internalType: 'uint32', type: 'uint32' }],
    name: 'removeRemoteTokenMessenger',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'tokenContract',
        internalType: 'contract IERC20',
        type: 'address',
      },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'rescueERC20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rescuer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_feeRecipient', internalType: 'address', type: 'address' },
    ],
    name: 'setFeeRecipient',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'unDenylist',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newDenylister', internalType: 'address', type: 'address' },
    ],
    name: 'updateDenylister',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newRescuer', internalType: 'address', type: 'address' }],
    name: 'updateRescuer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const tokenMessagerAddress = {
  43113: '0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA',
  57054: '0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA',
  59141: '0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA',
  84532: '0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA',
  421614: '0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA',
  11155111: '0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA',
} as const

/**
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const tokenMessagerConfig = {
  address: tokenMessagerAddress,
  abi: tokenMessagerAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// usdc
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const usdcAbi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const usdcAddress = {
  43113: '0x5425890298aed601595a70AB815c96711a31Bc65',
  57054: '0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6',
  59141: '0xFEce4462D57bD51A6A552365A011b95f0E16d9B7',
  80002: '0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582',
  84532: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
  421614: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
  11155111: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
} as const

/**
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const usdcConfig = { address: usdcAddress, abi: usdcAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const readMessageTransmitter = /*#__PURE__*/ createReadContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"NONCE_USED"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const readMessageTransmitterNonceUsed = /*#__PURE__*/ createReadContract(
  {
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'NONCE_USED',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"attesterManager"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const readMessageTransmitterAttesterManager =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'attesterManager',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"getEnabledAttester"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const readMessageTransmitterGetEnabledAttester =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'getEnabledAttester',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"getNumEnabledAttesters"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const readMessageTransmitterGetNumEnabledAttesters =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'getNumEnabledAttesters',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"initializedVersion"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const readMessageTransmitterInitializedVersion =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'initializedVersion',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"isEnabledAttester"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const readMessageTransmitterIsEnabledAttester =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'isEnabledAttester',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"localDomain"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const readMessageTransmitterLocalDomain =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'localDomain',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"maxMessageBodySize"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const readMessageTransmitterMaxMessageBodySize =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'maxMessageBodySize',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const readMessageTransmitterOwner = /*#__PURE__*/ createReadContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const readMessageTransmitterPaused = /*#__PURE__*/ createReadContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pauser"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const readMessageTransmitterPauser = /*#__PURE__*/ createReadContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
  functionName: 'pauser',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pendingOwner"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const readMessageTransmitterPendingOwner =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'pendingOwner',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"rescuer"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const readMessageTransmitterRescuer = /*#__PURE__*/ createReadContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
  functionName: 'rescuer',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"signatureThreshold"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const readMessageTransmitterSignatureThreshold =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'signatureThreshold',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"usedNonces"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const readMessageTransmitterUsedNonces =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'usedNonces',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"version"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const readMessageTransmitterVersion = /*#__PURE__*/ createReadContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
  functionName: 'version',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const writeMessageTransmitter = /*#__PURE__*/ createWriteContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const writeMessageTransmitterAcceptOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"disableAttester"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const writeMessageTransmitterDisableAttester =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'disableAttester',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"enableAttester"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const writeMessageTransmitterEnableAttester =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'enableAttester',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const writeMessageTransmitterInitialize =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const writeMessageTransmitterPause = /*#__PURE__*/ createWriteContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"receiveMessage"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const writeMessageTransmitterReceiveMessage =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'receiveMessage',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"rescueERC20"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const writeMessageTransmitterRescueErc20 =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'rescueERC20',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"sendMessage"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const writeMessageTransmitterSendMessage =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'sendMessage',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setMaxMessageBodySize"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const writeMessageTransmitterSetMaxMessageBodySize =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'setMaxMessageBodySize',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setSignatureThreshold"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const writeMessageTransmitterSetSignatureThreshold =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'setSignatureThreshold',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const writeMessageTransmitterTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const writeMessageTransmitterUnpause = /*#__PURE__*/ createWriteContract(
  {
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'unpause',
  },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateAttesterManager"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const writeMessageTransmitterUpdateAttesterManager =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updateAttesterManager',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updatePauser"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const writeMessageTransmitterUpdatePauser =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updatePauser',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateRescuer"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const writeMessageTransmitterUpdateRescuer =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const simulateMessageTransmitter = /*#__PURE__*/ createSimulateContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const simulateMessageTransmitterAcceptOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"disableAttester"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const simulateMessageTransmitterDisableAttester =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'disableAttester',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"enableAttester"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const simulateMessageTransmitterEnableAttester =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'enableAttester',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const simulateMessageTransmitterInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const simulateMessageTransmitterPause =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'pause',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"receiveMessage"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const simulateMessageTransmitterReceiveMessage =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'receiveMessage',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"rescueERC20"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const simulateMessageTransmitterRescueErc20 =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'rescueERC20',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"sendMessage"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const simulateMessageTransmitterSendMessage =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'sendMessage',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setMaxMessageBodySize"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const simulateMessageTransmitterSetMaxMessageBodySize =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'setMaxMessageBodySize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setSignatureThreshold"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const simulateMessageTransmitterSetSignatureThreshold =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'setSignatureThreshold',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const simulateMessageTransmitterTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const simulateMessageTransmitterUnpause =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateAttesterManager"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const simulateMessageTransmitterUpdateAttesterManager =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updateAttesterManager',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updatePauser"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const simulateMessageTransmitterUpdatePauser =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updatePauser',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateRescuer"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const simulateMessageTransmitterUpdateRescuer =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const watchMessageTransmitterEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"AttesterDisabled"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const watchMessageTransmitterAttesterDisabledEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'AttesterDisabled',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"AttesterEnabled"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const watchMessageTransmitterAttesterEnabledEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'AttesterEnabled',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"AttesterManagerUpdated"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const watchMessageTransmitterAttesterManagerUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'AttesterManagerUpdated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const watchMessageTransmitterInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"MaxMessageBodySizeUpdated"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const watchMessageTransmitterMaxMessageBodySizeUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'MaxMessageBodySizeUpdated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"MessageReceived"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const watchMessageTransmitterMessageReceivedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'MessageReceived',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"MessageSent"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const watchMessageTransmitterMessageSentEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'MessageSent',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const watchMessageTransmitterOwnershipTransferStartedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const watchMessageTransmitterOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"Pause"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const watchMessageTransmitterPauseEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'Pause',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"PauserChanged"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const watchMessageTransmitterPauserChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'PauserChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"RescuerChanged"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const watchMessageTransmitterRescuerChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'RescuerChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"SignatureThresholdUpdated"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const watchMessageTransmitterSignatureThresholdUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'SignatureThresholdUpdated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"Unpause"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const watchMessageTransmitterUnpauseEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'Unpause',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const readTokenMessager = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"denylister"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const readTokenMessagerDenylister = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'denylister',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"feeRecipient"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const readTokenMessagerFeeRecipient = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'feeRecipient',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"initializedVersion"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const readTokenMessagerInitializedVersion =
  /*#__PURE__*/ createReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'initializedVersion',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"isDenylisted"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const readTokenMessagerIsDenylisted = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'isDenylisted',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"localMessageTransmitter"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const readTokenMessagerLocalMessageTransmitter =
  /*#__PURE__*/ createReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'localMessageTransmitter',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"localMinter"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const readTokenMessagerLocalMinter = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'localMinter',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"messageBodyVersion"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const readTokenMessagerMessageBodyVersion =
  /*#__PURE__*/ createReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'messageBodyVersion',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const readTokenMessagerOwner = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"pendingOwner"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const readTokenMessagerPendingOwner = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'pendingOwner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"remoteTokenMessengers"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const readTokenMessagerRemoteTokenMessengers =
  /*#__PURE__*/ createReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'remoteTokenMessengers',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"rescuer"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const readTokenMessagerRescuer = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'rescuer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const writeTokenMessager = /*#__PURE__*/ createWriteContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const writeTokenMessagerAcceptOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addLocalMinter"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const writeTokenMessagerAddLocalMinter =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'addLocalMinter',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addRemoteTokenMessenger"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const writeTokenMessagerAddRemoteTokenMessenger =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'addRemoteTokenMessenger',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"denylist"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const writeTokenMessagerDenylist = /*#__PURE__*/ createWriteContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'denylist',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurn"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const writeTokenMessagerDepositForBurn =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'depositForBurn',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurnWithHook"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const writeTokenMessagerDepositForBurnWithHook =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'depositForBurnWithHook',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveFinalizedMessage"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const writeTokenMessagerHandleReceiveFinalizedMessage =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'handleReceiveFinalizedMessage',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveUnfinalizedMessage"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const writeTokenMessagerHandleReceiveUnfinalizedMessage =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'handleReceiveUnfinalizedMessage',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const writeTokenMessagerInitialize = /*#__PURE__*/ createWriteContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeLocalMinter"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const writeTokenMessagerRemoveLocalMinter =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'removeLocalMinter',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeRemoteTokenMessenger"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const writeTokenMessagerRemoveRemoteTokenMessenger =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'removeRemoteTokenMessenger',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"rescueERC20"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const writeTokenMessagerRescueErc20 = /*#__PURE__*/ createWriteContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'rescueERC20',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"setFeeRecipient"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const writeTokenMessagerSetFeeRecipient =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'setFeeRecipient',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const writeTokenMessagerTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"unDenylist"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const writeTokenMessagerUnDenylist = /*#__PURE__*/ createWriteContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'unDenylist',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateDenylister"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const writeTokenMessagerUpdateDenylister =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'updateDenylister',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateRescuer"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const writeTokenMessagerUpdateRescuer =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const simulateTokenMessager = /*#__PURE__*/ createSimulateContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const simulateTokenMessagerAcceptOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addLocalMinter"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const simulateTokenMessagerAddLocalMinter =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'addLocalMinter',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addRemoteTokenMessenger"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const simulateTokenMessagerAddRemoteTokenMessenger =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'addRemoteTokenMessenger',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"denylist"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const simulateTokenMessagerDenylist =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'denylist',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurn"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const simulateTokenMessagerDepositForBurn =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'depositForBurn',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurnWithHook"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const simulateTokenMessagerDepositForBurnWithHook =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'depositForBurnWithHook',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveFinalizedMessage"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const simulateTokenMessagerHandleReceiveFinalizedMessage =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'handleReceiveFinalizedMessage',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveUnfinalizedMessage"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const simulateTokenMessagerHandleReceiveUnfinalizedMessage =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'handleReceiveUnfinalizedMessage',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const simulateTokenMessagerInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeLocalMinter"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const simulateTokenMessagerRemoveLocalMinter =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'removeLocalMinter',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeRemoteTokenMessenger"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const simulateTokenMessagerRemoveRemoteTokenMessenger =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'removeRemoteTokenMessenger',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"rescueERC20"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const simulateTokenMessagerRescueErc20 =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'rescueERC20',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"setFeeRecipient"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const simulateTokenMessagerSetFeeRecipient =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'setFeeRecipient',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const simulateTokenMessagerTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"unDenylist"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const simulateTokenMessagerUnDenylist =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'unDenylist',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateDenylister"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const simulateTokenMessagerUpdateDenylister =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'updateDenylister',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateRescuer"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const simulateTokenMessagerUpdateRescuer =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const watchTokenMessagerEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"Denylisted"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const watchTokenMessagerDenylistedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'Denylisted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"DenylisterChanged"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const watchTokenMessagerDenylisterChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'DenylisterChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"DepositForBurn"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const watchTokenMessagerDepositForBurnEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'DepositForBurn',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"FeeRecipientSet"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const watchTokenMessagerFeeRecipientSetEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'FeeRecipientSet',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const watchTokenMessagerInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"LocalMinterAdded"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const watchTokenMessagerLocalMinterAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'LocalMinterAdded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"LocalMinterRemoved"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const watchTokenMessagerLocalMinterRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'LocalMinterRemoved',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"MintAndWithdraw"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const watchTokenMessagerMintAndWithdrawEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'MintAndWithdraw',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const watchTokenMessagerOwnershipTransferStartedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const watchTokenMessagerOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"RemoteTokenMessengerAdded"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const watchTokenMessagerRemoteTokenMessengerAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'RemoteTokenMessengerAdded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"RemoteTokenMessengerRemoved"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const watchTokenMessagerRemoteTokenMessengerRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'RemoteTokenMessengerRemoved',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"RescuerChanged"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const watchTokenMessagerRescuerChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'RescuerChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"UnDenylisted"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const watchTokenMessagerUnDenylistedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'UnDenylisted',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const readUsdc = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  address: usdcAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const readUsdcAllowance = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const readUsdcBalanceOf = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const readUsdcDecimals = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const readUsdcName = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const readUsdcSymbol = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const readUsdcTotalSupply = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link usdcAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const writeUsdc = /*#__PURE__*/ createWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const writeUsdcApprove = /*#__PURE__*/ createWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const writeUsdcTransfer = /*#__PURE__*/ createWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const writeUsdcTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link usdcAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const simulateUsdc = /*#__PURE__*/ createSimulateContract({
  abi: usdcAbi,
  address: usdcAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const simulateUsdcApprove = /*#__PURE__*/ createSimulateContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const simulateUsdcTransfer = /*#__PURE__*/ createSimulateContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const simulateUsdcTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link usdcAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const watchUsdcEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: usdcAbi,
  address: usdcAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link usdcAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const watchUsdcApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: usdcAbi,
  address: usdcAddress,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link usdcAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const watchUsdcTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: usdcAbi,
  address: usdcAddress,
  eventName: 'Transfer',
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useReadMessageTransmitter = /*#__PURE__*/ createUseReadContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"NONCE_USED"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useReadMessageTransmitterNonceUsed =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'NONCE_USED',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"attesterManager"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useReadMessageTransmitterAttesterManager =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'attesterManager',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"getEnabledAttester"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useReadMessageTransmitterGetEnabledAttester =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'getEnabledAttester',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"getNumEnabledAttesters"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useReadMessageTransmitterGetNumEnabledAttesters =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'getNumEnabledAttesters',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"initializedVersion"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useReadMessageTransmitterInitializedVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'initializedVersion',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"isEnabledAttester"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useReadMessageTransmitterIsEnabledAttester =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'isEnabledAttester',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"localDomain"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useReadMessageTransmitterLocalDomain =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'localDomain',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"maxMessageBodySize"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useReadMessageTransmitterMaxMessageBodySize =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'maxMessageBodySize',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useReadMessageTransmitterOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useReadMessageTransmitterPaused =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'paused',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pauser"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useReadMessageTransmitterPauser =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'pauser',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pendingOwner"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useReadMessageTransmitterPendingOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'pendingOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"rescuer"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useReadMessageTransmitterRescuer =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'rescuer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"signatureThreshold"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useReadMessageTransmitterSignatureThreshold =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'signatureThreshold',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"usedNonces"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useReadMessageTransmitterUsedNonces =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'usedNonces',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"version"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useReadMessageTransmitterVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'version',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWriteMessageTransmitter = /*#__PURE__*/ createUseWriteContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWriteMessageTransmitterAcceptOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"disableAttester"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWriteMessageTransmitterDisableAttester =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'disableAttester',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"enableAttester"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWriteMessageTransmitterEnableAttester =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'enableAttester',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWriteMessageTransmitterInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWriteMessageTransmitterPause =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"receiveMessage"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWriteMessageTransmitterReceiveMessage =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'receiveMessage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"rescueERC20"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWriteMessageTransmitterRescueErc20 =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'rescueERC20',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"sendMessage"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWriteMessageTransmitterSendMessage =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'sendMessage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setMaxMessageBodySize"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWriteMessageTransmitterSetMaxMessageBodySize =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'setMaxMessageBodySize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setSignatureThreshold"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWriteMessageTransmitterSetSignatureThreshold =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'setSignatureThreshold',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWriteMessageTransmitterTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWriteMessageTransmitterUnpause =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateAttesterManager"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWriteMessageTransmitterUpdateAttesterManager =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updateAttesterManager',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updatePauser"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWriteMessageTransmitterUpdatePauser =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updatePauser',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateRescuer"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWriteMessageTransmitterUpdateRescuer =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useSimulateMessageTransmitter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useSimulateMessageTransmitterAcceptOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"disableAttester"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useSimulateMessageTransmitterDisableAttester =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'disableAttester',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"enableAttester"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useSimulateMessageTransmitterEnableAttester =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'enableAttester',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useSimulateMessageTransmitterInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useSimulateMessageTransmitterPause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"receiveMessage"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useSimulateMessageTransmitterReceiveMessage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'receiveMessage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"rescueERC20"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useSimulateMessageTransmitterRescueErc20 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'rescueERC20',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"sendMessage"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useSimulateMessageTransmitterSendMessage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'sendMessage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setMaxMessageBodySize"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useSimulateMessageTransmitterSetMaxMessageBodySize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'setMaxMessageBodySize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setSignatureThreshold"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useSimulateMessageTransmitterSetSignatureThreshold =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'setSignatureThreshold',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useSimulateMessageTransmitterTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useSimulateMessageTransmitterUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateAttesterManager"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useSimulateMessageTransmitterUpdateAttesterManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updateAttesterManager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updatePauser"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useSimulateMessageTransmitterUpdatePauser =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updatePauser',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateRescuer"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useSimulateMessageTransmitterUpdateRescuer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWatchMessageTransmitterEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"AttesterDisabled"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWatchMessageTransmitterAttesterDisabledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'AttesterDisabled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"AttesterEnabled"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWatchMessageTransmitterAttesterEnabledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'AttesterEnabled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"AttesterManagerUpdated"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWatchMessageTransmitterAttesterManagerUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'AttesterManagerUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWatchMessageTransmitterInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"MaxMessageBodySizeUpdated"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWatchMessageTransmitterMaxMessageBodySizeUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'MaxMessageBodySizeUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"MessageReceived"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWatchMessageTransmitterMessageReceivedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'MessageReceived',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"MessageSent"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWatchMessageTransmitterMessageSentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'MessageSent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWatchMessageTransmitterOwnershipTransferStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWatchMessageTransmitterOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"Pause"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWatchMessageTransmitterPauseEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'Pause',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"PauserChanged"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWatchMessageTransmitterPauserChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'PauserChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"RescuerChanged"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWatchMessageTransmitterRescuerChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'RescuerChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"SignatureThresholdUpdated"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWatchMessageTransmitterSignatureThresholdUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'SignatureThresholdUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"Unpause"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe737e5cebeeba77efe34d4aa090756590b1ce275)
 */
export const useWatchMessageTransmitterUnpauseEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'Unpause',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useReadTokenMessager = /*#__PURE__*/ createUseReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"denylister"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useReadTokenMessagerDenylister =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'denylister',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"feeRecipient"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useReadTokenMessagerFeeRecipient =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'feeRecipient',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"initializedVersion"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useReadTokenMessagerInitializedVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'initializedVersion',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"isDenylisted"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useReadTokenMessagerIsDenylisted =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'isDenylisted',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"localMessageTransmitter"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useReadTokenMessagerLocalMessageTransmitter =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'localMessageTransmitter',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"localMinter"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useReadTokenMessagerLocalMinter =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'localMinter',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"messageBodyVersion"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useReadTokenMessagerMessageBodyVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'messageBodyVersion',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useReadTokenMessagerOwner = /*#__PURE__*/ createUseReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"pendingOwner"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useReadTokenMessagerPendingOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'pendingOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"remoteTokenMessengers"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useReadTokenMessagerRemoteTokenMessengers =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'remoteTokenMessengers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"rescuer"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useReadTokenMessagerRescuer = /*#__PURE__*/ createUseReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'rescuer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWriteTokenMessager = /*#__PURE__*/ createUseWriteContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWriteTokenMessagerAcceptOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addLocalMinter"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWriteTokenMessagerAddLocalMinter =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'addLocalMinter',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addRemoteTokenMessenger"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWriteTokenMessagerAddRemoteTokenMessenger =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'addRemoteTokenMessenger',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"denylist"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWriteTokenMessagerDenylist =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'denylist',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurn"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWriteTokenMessagerDepositForBurn =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'depositForBurn',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurnWithHook"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWriteTokenMessagerDepositForBurnWithHook =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'depositForBurnWithHook',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveFinalizedMessage"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWriteTokenMessagerHandleReceiveFinalizedMessage =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'handleReceiveFinalizedMessage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveUnfinalizedMessage"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWriteTokenMessagerHandleReceiveUnfinalizedMessage =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'handleReceiveUnfinalizedMessage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWriteTokenMessagerInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeLocalMinter"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWriteTokenMessagerRemoveLocalMinter =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'removeLocalMinter',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeRemoteTokenMessenger"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWriteTokenMessagerRemoveRemoteTokenMessenger =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'removeRemoteTokenMessenger',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"rescueERC20"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWriteTokenMessagerRescueErc20 =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'rescueERC20',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"setFeeRecipient"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWriteTokenMessagerSetFeeRecipient =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'setFeeRecipient',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWriteTokenMessagerTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"unDenylist"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWriteTokenMessagerUnDenylist =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'unDenylist',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateDenylister"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWriteTokenMessagerUpdateDenylister =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'updateDenylister',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateRescuer"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWriteTokenMessagerUpdateRescuer =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useSimulateTokenMessager = /*#__PURE__*/ createUseSimulateContract(
  { abi: tokenMessagerAbi, address: tokenMessagerAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useSimulateTokenMessagerAcceptOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addLocalMinter"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useSimulateTokenMessagerAddLocalMinter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'addLocalMinter',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addRemoteTokenMessenger"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useSimulateTokenMessagerAddRemoteTokenMessenger =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'addRemoteTokenMessenger',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"denylist"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useSimulateTokenMessagerDenylist =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'denylist',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurn"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useSimulateTokenMessagerDepositForBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'depositForBurn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurnWithHook"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useSimulateTokenMessagerDepositForBurnWithHook =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'depositForBurnWithHook',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveFinalizedMessage"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useSimulateTokenMessagerHandleReceiveFinalizedMessage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'handleReceiveFinalizedMessage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveUnfinalizedMessage"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useSimulateTokenMessagerHandleReceiveUnfinalizedMessage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'handleReceiveUnfinalizedMessage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useSimulateTokenMessagerInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeLocalMinter"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useSimulateTokenMessagerRemoveLocalMinter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'removeLocalMinter',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeRemoteTokenMessenger"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useSimulateTokenMessagerRemoveRemoteTokenMessenger =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'removeRemoteTokenMessenger',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"rescueERC20"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useSimulateTokenMessagerRescueErc20 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'rescueERC20',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"setFeeRecipient"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useSimulateTokenMessagerSetFeeRecipient =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'setFeeRecipient',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useSimulateTokenMessagerTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"unDenylist"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useSimulateTokenMessagerUnDenylist =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'unDenylist',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateDenylister"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useSimulateTokenMessagerUpdateDenylister =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'updateDenylister',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateRescuer"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useSimulateTokenMessagerUpdateRescuer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWatchTokenMessagerEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"Denylisted"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWatchTokenMessagerDenylistedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'Denylisted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"DenylisterChanged"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWatchTokenMessagerDenylisterChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'DenylisterChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"DepositForBurn"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWatchTokenMessagerDepositForBurnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'DepositForBurn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"FeeRecipientSet"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWatchTokenMessagerFeeRecipientSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'FeeRecipientSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWatchTokenMessagerInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"LocalMinterAdded"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWatchTokenMessagerLocalMinterAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'LocalMinterAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"LocalMinterRemoved"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWatchTokenMessagerLocalMinterRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'LocalMinterRemoved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"MintAndWithdraw"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWatchTokenMessagerMintAndWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'MintAndWithdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWatchTokenMessagerOwnershipTransferStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWatchTokenMessagerOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"RemoteTokenMessengerAdded"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWatchTokenMessagerRemoteTokenMessengerAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'RemoteTokenMessengerAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"RemoteTokenMessengerRemoved"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWatchTokenMessagerRemoteTokenMessengerRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'RemoteTokenMessengerRemoved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"RescuerChanged"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWatchTokenMessagerRescuerChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'RescuerChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"UnDenylisted"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa)
 */
export const useWatchTokenMessagerUnDenylistedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'UnDenylisted',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const useReadUsdc = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  address: usdcAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const useReadUsdcAllowance = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const useReadUsdcBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const useReadUsdcDecimals = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const useReadUsdcName = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const useReadUsdcSymbol = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const useReadUsdcTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const useWriteUsdc = /*#__PURE__*/ createUseWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const useWriteUsdcApprove = /*#__PURE__*/ createUseWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const useWriteUsdcTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const useWriteUsdcTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const useSimulateUsdc = /*#__PURE__*/ createUseSimulateContract({
  abi: usdcAbi,
  address: usdcAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const useSimulateUsdcApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const useSimulateUsdcTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const useSimulateUsdcTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usdcAbi,
    address: usdcAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdcAbi}__
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const useWatchUsdcEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdcAbi,
  address: usdcAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdcAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const useWatchUsdcApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usdcAbi,
    address: usdcAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdcAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 */
export const useWatchUsdcTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usdcAbi,
    address: usdcAddress,
    eventName: 'Transfer',
  })
