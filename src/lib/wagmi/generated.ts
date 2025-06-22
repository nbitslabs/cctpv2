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

export const messageTransmitterAddress =
  '0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275' as const

export const messageTransmitterConfig = {
  address: messageTransmitterAddress,
  abi: messageTransmitterAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// tokenMessager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

export const tokenMessagerAddress =
  '0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA' as const

export const tokenMessagerConfig = {
  address: tokenMessagerAddress,
  abi: tokenMessagerAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// usdc
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
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
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const usdcAddress = {
  1301: '0x31d0220469e10c4E71834a79b1f276d740d3768F',
  4801: '0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88',
  43113: '0x5425890298aed601595a70AB815c96711a31Bc65',
  57054: '0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6',
  59141: '0xFEce4462D57bD51A6A552365A011b95f0E16d9B7',
  80002: '0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582',
  84532: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
  421614: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
  11155111: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
  11155420: '0x5fd84259d66Cd46123540766Be93DFE6D43130D7',
} as const

/**
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const usdcConfig = { address: usdcAddress, abi: usdcAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__
 */
export const readMessageTransmitter = /*#__PURE__*/ createReadContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"NONCE_USED"`
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
 */
export const readMessageTransmitterAttesterManager =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'attesterManager',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"getEnabledAttester"`
 */
export const readMessageTransmitterGetEnabledAttester =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'getEnabledAttester',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"getNumEnabledAttesters"`
 */
export const readMessageTransmitterGetNumEnabledAttesters =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'getNumEnabledAttesters',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"initializedVersion"`
 */
export const readMessageTransmitterInitializedVersion =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'initializedVersion',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"isEnabledAttester"`
 */
export const readMessageTransmitterIsEnabledAttester =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'isEnabledAttester',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"localDomain"`
 */
export const readMessageTransmitterLocalDomain =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'localDomain',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"maxMessageBodySize"`
 */
export const readMessageTransmitterMaxMessageBodySize =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'maxMessageBodySize',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"owner"`
 */
export const readMessageTransmitterOwner = /*#__PURE__*/ createReadContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"paused"`
 */
export const readMessageTransmitterPaused = /*#__PURE__*/ createReadContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pauser"`
 */
export const readMessageTransmitterPauser = /*#__PURE__*/ createReadContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
  functionName: 'pauser',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pendingOwner"`
 */
export const readMessageTransmitterPendingOwner =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'pendingOwner',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"rescuer"`
 */
export const readMessageTransmitterRescuer = /*#__PURE__*/ createReadContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
  functionName: 'rescuer',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"signatureThreshold"`
 */
export const readMessageTransmitterSignatureThreshold =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'signatureThreshold',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"usedNonces"`
 */
export const readMessageTransmitterUsedNonces =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'usedNonces',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"version"`
 */
export const readMessageTransmitterVersion = /*#__PURE__*/ createReadContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
  functionName: 'version',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__
 */
export const writeMessageTransmitter = /*#__PURE__*/ createWriteContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const writeMessageTransmitterAcceptOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"disableAttester"`
 */
export const writeMessageTransmitterDisableAttester =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'disableAttester',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"enableAttester"`
 */
export const writeMessageTransmitterEnableAttester =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'enableAttester',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"initialize"`
 */
export const writeMessageTransmitterInitialize =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pause"`
 */
export const writeMessageTransmitterPause = /*#__PURE__*/ createWriteContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"receiveMessage"`
 */
export const writeMessageTransmitterReceiveMessage =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'receiveMessage',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"rescueERC20"`
 */
export const writeMessageTransmitterRescueErc20 =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'rescueERC20',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"sendMessage"`
 */
export const writeMessageTransmitterSendMessage =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'sendMessage',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setMaxMessageBodySize"`
 */
export const writeMessageTransmitterSetMaxMessageBodySize =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'setMaxMessageBodySize',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setSignatureThreshold"`
 */
export const writeMessageTransmitterSetSignatureThreshold =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'setSignatureThreshold',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeMessageTransmitterTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"unpause"`
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
 */
export const writeMessageTransmitterUpdateAttesterManager =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updateAttesterManager',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updatePauser"`
 */
export const writeMessageTransmitterUpdatePauser =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updatePauser',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateRescuer"`
 */
export const writeMessageTransmitterUpdateRescuer =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__
 */
export const simulateMessageTransmitter = /*#__PURE__*/ createSimulateContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const simulateMessageTransmitterAcceptOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"disableAttester"`
 */
export const simulateMessageTransmitterDisableAttester =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'disableAttester',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"enableAttester"`
 */
export const simulateMessageTransmitterEnableAttester =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'enableAttester',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"initialize"`
 */
export const simulateMessageTransmitterInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pause"`
 */
export const simulateMessageTransmitterPause =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'pause',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"receiveMessage"`
 */
export const simulateMessageTransmitterReceiveMessage =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'receiveMessage',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"rescueERC20"`
 */
export const simulateMessageTransmitterRescueErc20 =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'rescueERC20',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"sendMessage"`
 */
export const simulateMessageTransmitterSendMessage =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'sendMessage',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setMaxMessageBodySize"`
 */
export const simulateMessageTransmitterSetMaxMessageBodySize =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'setMaxMessageBodySize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setSignatureThreshold"`
 */
export const simulateMessageTransmitterSetSignatureThreshold =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'setSignatureThreshold',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateMessageTransmitterTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"unpause"`
 */
export const simulateMessageTransmitterUnpause =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateAttesterManager"`
 */
export const simulateMessageTransmitterUpdateAttesterManager =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updateAttesterManager',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updatePauser"`
 */
export const simulateMessageTransmitterUpdatePauser =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updatePauser',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateRescuer"`
 */
export const simulateMessageTransmitterUpdateRescuer =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__
 */
export const watchMessageTransmitterEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"AttesterDisabled"`
 */
export const watchMessageTransmitterAttesterDisabledEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'AttesterDisabled',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"AttesterEnabled"`
 */
export const watchMessageTransmitterAttesterEnabledEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'AttesterEnabled',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"AttesterManagerUpdated"`
 */
export const watchMessageTransmitterAttesterManagerUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'AttesterManagerUpdated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"Initialized"`
 */
export const watchMessageTransmitterInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"MaxMessageBodySizeUpdated"`
 */
export const watchMessageTransmitterMaxMessageBodySizeUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'MaxMessageBodySizeUpdated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"MessageReceived"`
 */
export const watchMessageTransmitterMessageReceivedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'MessageReceived',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"MessageSent"`
 */
export const watchMessageTransmitterMessageSentEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'MessageSent',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 */
export const watchMessageTransmitterOwnershipTransferStartedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchMessageTransmitterOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"Pause"`
 */
export const watchMessageTransmitterPauseEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'Pause',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"PauserChanged"`
 */
export const watchMessageTransmitterPauserChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'PauserChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"RescuerChanged"`
 */
export const watchMessageTransmitterRescuerChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'RescuerChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"SignatureThresholdUpdated"`
 */
export const watchMessageTransmitterSignatureThresholdUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'SignatureThresholdUpdated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"Unpause"`
 */
export const watchMessageTransmitterUnpauseEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'Unpause',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__
 */
export const readTokenMessager = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"denylister"`
 */
export const readTokenMessagerDenylister = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'denylister',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"feeRecipient"`
 */
export const readTokenMessagerFeeRecipient = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'feeRecipient',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"initializedVersion"`
 */
export const readTokenMessagerInitializedVersion =
  /*#__PURE__*/ createReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'initializedVersion',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"isDenylisted"`
 */
export const readTokenMessagerIsDenylisted = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'isDenylisted',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"localMessageTransmitter"`
 */
export const readTokenMessagerLocalMessageTransmitter =
  /*#__PURE__*/ createReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'localMessageTransmitter',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"localMinter"`
 */
export const readTokenMessagerLocalMinter = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'localMinter',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"messageBodyVersion"`
 */
export const readTokenMessagerMessageBodyVersion =
  /*#__PURE__*/ createReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'messageBodyVersion',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"owner"`
 */
export const readTokenMessagerOwner = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"pendingOwner"`
 */
export const readTokenMessagerPendingOwner = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'pendingOwner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"remoteTokenMessengers"`
 */
export const readTokenMessagerRemoteTokenMessengers =
  /*#__PURE__*/ createReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'remoteTokenMessengers',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"rescuer"`
 */
export const readTokenMessagerRescuer = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'rescuer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__
 */
export const writeTokenMessager = /*#__PURE__*/ createWriteContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const writeTokenMessagerAcceptOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addLocalMinter"`
 */
export const writeTokenMessagerAddLocalMinter =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'addLocalMinter',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addRemoteTokenMessenger"`
 */
export const writeTokenMessagerAddRemoteTokenMessenger =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'addRemoteTokenMessenger',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"denylist"`
 */
export const writeTokenMessagerDenylist = /*#__PURE__*/ createWriteContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'denylist',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurn"`
 */
export const writeTokenMessagerDepositForBurn =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'depositForBurn',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurnWithHook"`
 */
export const writeTokenMessagerDepositForBurnWithHook =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'depositForBurnWithHook',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveFinalizedMessage"`
 */
export const writeTokenMessagerHandleReceiveFinalizedMessage =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'handleReceiveFinalizedMessage',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveUnfinalizedMessage"`
 */
export const writeTokenMessagerHandleReceiveUnfinalizedMessage =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'handleReceiveUnfinalizedMessage',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"initialize"`
 */
export const writeTokenMessagerInitialize = /*#__PURE__*/ createWriteContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeLocalMinter"`
 */
export const writeTokenMessagerRemoveLocalMinter =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'removeLocalMinter',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeRemoteTokenMessenger"`
 */
export const writeTokenMessagerRemoveRemoteTokenMessenger =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'removeRemoteTokenMessenger',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"rescueERC20"`
 */
export const writeTokenMessagerRescueErc20 = /*#__PURE__*/ createWriteContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'rescueERC20',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"setFeeRecipient"`
 */
export const writeTokenMessagerSetFeeRecipient =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'setFeeRecipient',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeTokenMessagerTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"unDenylist"`
 */
export const writeTokenMessagerUnDenylist = /*#__PURE__*/ createWriteContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'unDenylist',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateDenylister"`
 */
export const writeTokenMessagerUpdateDenylister =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'updateDenylister',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateRescuer"`
 */
export const writeTokenMessagerUpdateRescuer =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__
 */
export const simulateTokenMessager = /*#__PURE__*/ createSimulateContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const simulateTokenMessagerAcceptOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addLocalMinter"`
 */
export const simulateTokenMessagerAddLocalMinter =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'addLocalMinter',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addRemoteTokenMessenger"`
 */
export const simulateTokenMessagerAddRemoteTokenMessenger =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'addRemoteTokenMessenger',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"denylist"`
 */
export const simulateTokenMessagerDenylist =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'denylist',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurn"`
 */
export const simulateTokenMessagerDepositForBurn =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'depositForBurn',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurnWithHook"`
 */
export const simulateTokenMessagerDepositForBurnWithHook =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'depositForBurnWithHook',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveFinalizedMessage"`
 */
export const simulateTokenMessagerHandleReceiveFinalizedMessage =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'handleReceiveFinalizedMessage',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveUnfinalizedMessage"`
 */
export const simulateTokenMessagerHandleReceiveUnfinalizedMessage =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'handleReceiveUnfinalizedMessage',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"initialize"`
 */
export const simulateTokenMessagerInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeLocalMinter"`
 */
export const simulateTokenMessagerRemoveLocalMinter =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'removeLocalMinter',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeRemoteTokenMessenger"`
 */
export const simulateTokenMessagerRemoveRemoteTokenMessenger =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'removeRemoteTokenMessenger',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"rescueERC20"`
 */
export const simulateTokenMessagerRescueErc20 =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'rescueERC20',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"setFeeRecipient"`
 */
export const simulateTokenMessagerSetFeeRecipient =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'setFeeRecipient',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateTokenMessagerTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"unDenylist"`
 */
export const simulateTokenMessagerUnDenylist =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'unDenylist',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateDenylister"`
 */
export const simulateTokenMessagerUpdateDenylister =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'updateDenylister',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateRescuer"`
 */
export const simulateTokenMessagerUpdateRescuer =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__
 */
export const watchTokenMessagerEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"Denylisted"`
 */
export const watchTokenMessagerDenylistedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'Denylisted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"DenylisterChanged"`
 */
export const watchTokenMessagerDenylisterChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'DenylisterChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"DepositForBurn"`
 */
export const watchTokenMessagerDepositForBurnEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'DepositForBurn',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"FeeRecipientSet"`
 */
export const watchTokenMessagerFeeRecipientSetEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'FeeRecipientSet',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"Initialized"`
 */
export const watchTokenMessagerInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"LocalMinterAdded"`
 */
export const watchTokenMessagerLocalMinterAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'LocalMinterAdded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"LocalMinterRemoved"`
 */
export const watchTokenMessagerLocalMinterRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'LocalMinterRemoved',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"MintAndWithdraw"`
 */
export const watchTokenMessagerMintAndWithdrawEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'MintAndWithdraw',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 */
export const watchTokenMessagerOwnershipTransferStartedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchTokenMessagerOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"RemoteTokenMessengerAdded"`
 */
export const watchTokenMessagerRemoteTokenMessengerAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'RemoteTokenMessengerAdded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"RemoteTokenMessengerRemoved"`
 */
export const watchTokenMessagerRemoteTokenMessengerRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'RemoteTokenMessengerRemoved',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"RescuerChanged"`
 */
export const watchTokenMessagerRescuerChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'RescuerChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"UnDenylisted"`
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
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const readUsdc = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  address: usdcAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const readUsdcAllowance = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const readUsdcBalanceOf = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const readUsdcDecimals = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const readUsdcName = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const readUsdcSymbol = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const readUsdcTotalSupply = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link usdcAbi}__
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const writeUsdc = /*#__PURE__*/ createWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const writeUsdcApprove = /*#__PURE__*/ createWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const writeUsdcTransfer = /*#__PURE__*/ createWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const writeUsdcTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link usdcAbi}__
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const simulateUsdc = /*#__PURE__*/ createSimulateContract({
  abi: usdcAbi,
  address: usdcAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const simulateUsdcApprove = /*#__PURE__*/ createSimulateContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const simulateUsdcTransfer = /*#__PURE__*/ createSimulateContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const simulateUsdcTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link usdcAbi}__
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const watchUsdcEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: usdcAbi,
  address: usdcAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link usdcAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const watchUsdcApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: usdcAbi,
  address: usdcAddress,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link usdcAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
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
 */
export const useReadMessageTransmitter = /*#__PURE__*/ createUseReadContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"NONCE_USED"`
 */
export const useReadMessageTransmitterNonceUsed =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'NONCE_USED',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"attesterManager"`
 */
export const useReadMessageTransmitterAttesterManager =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'attesterManager',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"getEnabledAttester"`
 */
export const useReadMessageTransmitterGetEnabledAttester =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'getEnabledAttester',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"getNumEnabledAttesters"`
 */
export const useReadMessageTransmitterGetNumEnabledAttesters =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'getNumEnabledAttesters',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"initializedVersion"`
 */
export const useReadMessageTransmitterInitializedVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'initializedVersion',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"isEnabledAttester"`
 */
export const useReadMessageTransmitterIsEnabledAttester =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'isEnabledAttester',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"localDomain"`
 */
export const useReadMessageTransmitterLocalDomain =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'localDomain',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"maxMessageBodySize"`
 */
export const useReadMessageTransmitterMaxMessageBodySize =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'maxMessageBodySize',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"owner"`
 */
export const useReadMessageTransmitterOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"paused"`
 */
export const useReadMessageTransmitterPaused =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'paused',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pauser"`
 */
export const useReadMessageTransmitterPauser =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'pauser',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pendingOwner"`
 */
export const useReadMessageTransmitterPendingOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'pendingOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"rescuer"`
 */
export const useReadMessageTransmitterRescuer =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'rescuer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"signatureThreshold"`
 */
export const useReadMessageTransmitterSignatureThreshold =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'signatureThreshold',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"usedNonces"`
 */
export const useReadMessageTransmitterUsedNonces =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'usedNonces',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"version"`
 */
export const useReadMessageTransmitterVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'version',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__
 */
export const useWriteMessageTransmitter = /*#__PURE__*/ createUseWriteContract({
  abi: messageTransmitterAbi,
  address: messageTransmitterAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const useWriteMessageTransmitterAcceptOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"disableAttester"`
 */
export const useWriteMessageTransmitterDisableAttester =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'disableAttester',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"enableAttester"`
 */
export const useWriteMessageTransmitterEnableAttester =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'enableAttester',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteMessageTransmitterInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteMessageTransmitterPause =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"receiveMessage"`
 */
export const useWriteMessageTransmitterReceiveMessage =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'receiveMessage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"rescueERC20"`
 */
export const useWriteMessageTransmitterRescueErc20 =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'rescueERC20',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"sendMessage"`
 */
export const useWriteMessageTransmitterSendMessage =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'sendMessage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setMaxMessageBodySize"`
 */
export const useWriteMessageTransmitterSetMaxMessageBodySize =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'setMaxMessageBodySize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setSignatureThreshold"`
 */
export const useWriteMessageTransmitterSetSignatureThreshold =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'setSignatureThreshold',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteMessageTransmitterTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteMessageTransmitterUnpause =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateAttesterManager"`
 */
export const useWriteMessageTransmitterUpdateAttesterManager =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updateAttesterManager',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updatePauser"`
 */
export const useWriteMessageTransmitterUpdatePauser =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updatePauser',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateRescuer"`
 */
export const useWriteMessageTransmitterUpdateRescuer =
  /*#__PURE__*/ createUseWriteContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__
 */
export const useSimulateMessageTransmitter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const useSimulateMessageTransmitterAcceptOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"disableAttester"`
 */
export const useSimulateMessageTransmitterDisableAttester =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'disableAttester',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"enableAttester"`
 */
export const useSimulateMessageTransmitterEnableAttester =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'enableAttester',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateMessageTransmitterInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateMessageTransmitterPause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"receiveMessage"`
 */
export const useSimulateMessageTransmitterReceiveMessage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'receiveMessage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"rescueERC20"`
 */
export const useSimulateMessageTransmitterRescueErc20 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'rescueERC20',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"sendMessage"`
 */
export const useSimulateMessageTransmitterSendMessage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'sendMessage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setMaxMessageBodySize"`
 */
export const useSimulateMessageTransmitterSetMaxMessageBodySize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'setMaxMessageBodySize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setSignatureThreshold"`
 */
export const useSimulateMessageTransmitterSetSignatureThreshold =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'setSignatureThreshold',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateMessageTransmitterTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateMessageTransmitterUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateAttesterManager"`
 */
export const useSimulateMessageTransmitterUpdateAttesterManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updateAttesterManager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updatePauser"`
 */
export const useSimulateMessageTransmitterUpdatePauser =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updatePauser',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateRescuer"`
 */
export const useSimulateMessageTransmitterUpdateRescuer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__
 */
export const useWatchMessageTransmitterEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"AttesterDisabled"`
 */
export const useWatchMessageTransmitterAttesterDisabledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'AttesterDisabled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"AttesterEnabled"`
 */
export const useWatchMessageTransmitterAttesterEnabledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'AttesterEnabled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"AttesterManagerUpdated"`
 */
export const useWatchMessageTransmitterAttesterManagerUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'AttesterManagerUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchMessageTransmitterInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"MaxMessageBodySizeUpdated"`
 */
export const useWatchMessageTransmitterMaxMessageBodySizeUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'MaxMessageBodySizeUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"MessageReceived"`
 */
export const useWatchMessageTransmitterMessageReceivedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'MessageReceived',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"MessageSent"`
 */
export const useWatchMessageTransmitterMessageSentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'MessageSent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 */
export const useWatchMessageTransmitterOwnershipTransferStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchMessageTransmitterOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"Pause"`
 */
export const useWatchMessageTransmitterPauseEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'Pause',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"PauserChanged"`
 */
export const useWatchMessageTransmitterPauserChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'PauserChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"RescuerChanged"`
 */
export const useWatchMessageTransmitterRescuerChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'RescuerChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"SignatureThresholdUpdated"`
 */
export const useWatchMessageTransmitterSignatureThresholdUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'SignatureThresholdUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"Unpause"`
 */
export const useWatchMessageTransmitterUnpauseEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: messageTransmitterAbi,
    address: messageTransmitterAddress,
    eventName: 'Unpause',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__
 */
export const useReadTokenMessager = /*#__PURE__*/ createUseReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"denylister"`
 */
export const useReadTokenMessagerDenylister =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'denylister',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"feeRecipient"`
 */
export const useReadTokenMessagerFeeRecipient =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'feeRecipient',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"initializedVersion"`
 */
export const useReadTokenMessagerInitializedVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'initializedVersion',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"isDenylisted"`
 */
export const useReadTokenMessagerIsDenylisted =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'isDenylisted',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"localMessageTransmitter"`
 */
export const useReadTokenMessagerLocalMessageTransmitter =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'localMessageTransmitter',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"localMinter"`
 */
export const useReadTokenMessagerLocalMinter =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'localMinter',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"messageBodyVersion"`
 */
export const useReadTokenMessagerMessageBodyVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'messageBodyVersion',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"owner"`
 */
export const useReadTokenMessagerOwner = /*#__PURE__*/ createUseReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"pendingOwner"`
 */
export const useReadTokenMessagerPendingOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'pendingOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"remoteTokenMessengers"`
 */
export const useReadTokenMessagerRemoteTokenMessengers =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'remoteTokenMessengers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"rescuer"`
 */
export const useReadTokenMessagerRescuer = /*#__PURE__*/ createUseReadContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
  functionName: 'rescuer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__
 */
export const useWriteTokenMessager = /*#__PURE__*/ createUseWriteContract({
  abi: tokenMessagerAbi,
  address: tokenMessagerAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const useWriteTokenMessagerAcceptOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addLocalMinter"`
 */
export const useWriteTokenMessagerAddLocalMinter =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'addLocalMinter',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addRemoteTokenMessenger"`
 */
export const useWriteTokenMessagerAddRemoteTokenMessenger =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'addRemoteTokenMessenger',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"denylist"`
 */
export const useWriteTokenMessagerDenylist =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'denylist',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurn"`
 */
export const useWriteTokenMessagerDepositForBurn =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'depositForBurn',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurnWithHook"`
 */
export const useWriteTokenMessagerDepositForBurnWithHook =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'depositForBurnWithHook',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveFinalizedMessage"`
 */
export const useWriteTokenMessagerHandleReceiveFinalizedMessage =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'handleReceiveFinalizedMessage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveUnfinalizedMessage"`
 */
export const useWriteTokenMessagerHandleReceiveUnfinalizedMessage =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'handleReceiveUnfinalizedMessage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteTokenMessagerInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeLocalMinter"`
 */
export const useWriteTokenMessagerRemoveLocalMinter =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'removeLocalMinter',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeRemoteTokenMessenger"`
 */
export const useWriteTokenMessagerRemoveRemoteTokenMessenger =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'removeRemoteTokenMessenger',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"rescueERC20"`
 */
export const useWriteTokenMessagerRescueErc20 =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'rescueERC20',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"setFeeRecipient"`
 */
export const useWriteTokenMessagerSetFeeRecipient =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'setFeeRecipient',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteTokenMessagerTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"unDenylist"`
 */
export const useWriteTokenMessagerUnDenylist =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'unDenylist',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateDenylister"`
 */
export const useWriteTokenMessagerUpdateDenylister =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'updateDenylister',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateRescuer"`
 */
export const useWriteTokenMessagerUpdateRescuer =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__
 */
export const useSimulateTokenMessager = /*#__PURE__*/ createUseSimulateContract(
  { abi: tokenMessagerAbi, address: tokenMessagerAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const useSimulateTokenMessagerAcceptOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addLocalMinter"`
 */
export const useSimulateTokenMessagerAddLocalMinter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'addLocalMinter',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addRemoteTokenMessenger"`
 */
export const useSimulateTokenMessagerAddRemoteTokenMessenger =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'addRemoteTokenMessenger',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"denylist"`
 */
export const useSimulateTokenMessagerDenylist =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'denylist',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurn"`
 */
export const useSimulateTokenMessagerDepositForBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'depositForBurn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurnWithHook"`
 */
export const useSimulateTokenMessagerDepositForBurnWithHook =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'depositForBurnWithHook',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveFinalizedMessage"`
 */
export const useSimulateTokenMessagerHandleReceiveFinalizedMessage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'handleReceiveFinalizedMessage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveUnfinalizedMessage"`
 */
export const useSimulateTokenMessagerHandleReceiveUnfinalizedMessage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'handleReceiveUnfinalizedMessage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateTokenMessagerInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeLocalMinter"`
 */
export const useSimulateTokenMessagerRemoveLocalMinter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'removeLocalMinter',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeRemoteTokenMessenger"`
 */
export const useSimulateTokenMessagerRemoveRemoteTokenMessenger =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'removeRemoteTokenMessenger',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"rescueERC20"`
 */
export const useSimulateTokenMessagerRescueErc20 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'rescueERC20',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"setFeeRecipient"`
 */
export const useSimulateTokenMessagerSetFeeRecipient =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'setFeeRecipient',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateTokenMessagerTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"unDenylist"`
 */
export const useSimulateTokenMessagerUnDenylist =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'unDenylist',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateDenylister"`
 */
export const useSimulateTokenMessagerUpdateDenylister =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'updateDenylister',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateRescuer"`
 */
export const useSimulateTokenMessagerUpdateRescuer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__
 */
export const useWatchTokenMessagerEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"Denylisted"`
 */
export const useWatchTokenMessagerDenylistedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'Denylisted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"DenylisterChanged"`
 */
export const useWatchTokenMessagerDenylisterChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'DenylisterChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"DepositForBurn"`
 */
export const useWatchTokenMessagerDepositForBurnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'DepositForBurn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"FeeRecipientSet"`
 */
export const useWatchTokenMessagerFeeRecipientSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'FeeRecipientSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchTokenMessagerInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"LocalMinterAdded"`
 */
export const useWatchTokenMessagerLocalMinterAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'LocalMinterAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"LocalMinterRemoved"`
 */
export const useWatchTokenMessagerLocalMinterRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'LocalMinterRemoved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"MintAndWithdraw"`
 */
export const useWatchTokenMessagerMintAndWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'MintAndWithdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 */
export const useWatchTokenMessagerOwnershipTransferStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchTokenMessagerOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"RemoteTokenMessengerAdded"`
 */
export const useWatchTokenMessagerRemoteTokenMessengerAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'RemoteTokenMessengerAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"RemoteTokenMessengerRemoved"`
 */
export const useWatchTokenMessagerRemoteTokenMessengerRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'RemoteTokenMessengerRemoved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"RescuerChanged"`
 */
export const useWatchTokenMessagerRescuerChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMessagerAbi,
    address: tokenMessagerAddress,
    eventName: 'RescuerChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"UnDenylisted"`
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
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const useReadUsdc = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  address: usdcAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const useReadUsdcAllowance = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const useReadUsdcBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const useReadUsdcDecimals = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const useReadUsdcName = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const useReadUsdcSymbol = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const useReadUsdcTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcAbi}__
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const useWriteUsdc = /*#__PURE__*/ createUseWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const useWriteUsdcApprove = /*#__PURE__*/ createUseWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const useWriteUsdcTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const useWriteUsdcTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcAbi}__
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const useSimulateUsdc = /*#__PURE__*/ createUseSimulateContract({
  abi: usdcAbi,
  address: usdcAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const useSimulateUsdcApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const useSimulateUsdcTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: usdcAbi,
  address: usdcAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
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
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const useWatchUsdcEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdcAbi,
  address: usdcAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdcAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
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
 * - [__View Contract on Unichain Sepolia Uniscan__](https://sepolia.uniscan.xyz/address/0x31d0220469e10c4E71834a79b1f276d740d3768F)
 * - [__View Contract on World Chain Sepolia Worldscan Sepolia__](https://sepolia.worldscan.org/address/0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88)
 * - [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x5425890298aed601595a70AB815c96711a31Bc65)
 * - [__View Contract on Sonic Blaze Testnet Sonic Blaze Testnet Explorer__](https://testnet.sonicscan.org/address/0xA4879Fed32Ecbef99399e5cbC247E533421C4eC6)
 * - [__View Contract on Linea Sepolia Testnet Etherscan__](https://sepolia.lineascan.build/address/0xFEce4462D57bD51A6A552365A011b95f0E16d9B7)
 * - [__View Contract on Polygon Amoy Polygon Scan__](https://amoy.polygonscan.com/address/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238)
 * - [__View Contract on Op Sepolia Blockscout__](https://optimism-sepolia.blockscout.com/address/0x5fd84259d66Cd46123540766Be93DFE6D43130D7)
 */
export const useWatchUsdcTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usdcAbi,
    address: usdcAddress,
    eventName: 'Transfer',
  })
