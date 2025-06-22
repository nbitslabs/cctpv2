import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// usdc
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__
 */
export const readMessageTransmitter = /*#__PURE__*/ createReadContract({
  abi: messageTransmitterAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"NONCE_USED"`
 */
export const readMessageTransmitterNonceUsed = /*#__PURE__*/ createReadContract(
  { abi: messageTransmitterAbi, functionName: 'NONCE_USED' },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"attesterManager"`
 */
export const readMessageTransmitterAttesterManager =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    functionName: 'attesterManager',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"getEnabledAttester"`
 */
export const readMessageTransmitterGetEnabledAttester =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    functionName: 'getEnabledAttester',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"getNumEnabledAttesters"`
 */
export const readMessageTransmitterGetNumEnabledAttesters =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    functionName: 'getNumEnabledAttesters',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"initializedVersion"`
 */
export const readMessageTransmitterInitializedVersion =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    functionName: 'initializedVersion',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"isEnabledAttester"`
 */
export const readMessageTransmitterIsEnabledAttester =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    functionName: 'isEnabledAttester',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"localDomain"`
 */
export const readMessageTransmitterLocalDomain =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    functionName: 'localDomain',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"maxMessageBodySize"`
 */
export const readMessageTransmitterMaxMessageBodySize =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    functionName: 'maxMessageBodySize',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"owner"`
 */
export const readMessageTransmitterOwner = /*#__PURE__*/ createReadContract({
  abi: messageTransmitterAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"paused"`
 */
export const readMessageTransmitterPaused = /*#__PURE__*/ createReadContract({
  abi: messageTransmitterAbi,
  functionName: 'paused',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pauser"`
 */
export const readMessageTransmitterPauser = /*#__PURE__*/ createReadContract({
  abi: messageTransmitterAbi,
  functionName: 'pauser',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pendingOwner"`
 */
export const readMessageTransmitterPendingOwner =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    functionName: 'pendingOwner',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"rescuer"`
 */
export const readMessageTransmitterRescuer = /*#__PURE__*/ createReadContract({
  abi: messageTransmitterAbi,
  functionName: 'rescuer',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"signatureThreshold"`
 */
export const readMessageTransmitterSignatureThreshold =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    functionName: 'signatureThreshold',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"usedNonces"`
 */
export const readMessageTransmitterUsedNonces =
  /*#__PURE__*/ createReadContract({
    abi: messageTransmitterAbi,
    functionName: 'usedNonces',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"version"`
 */
export const readMessageTransmitterVersion = /*#__PURE__*/ createReadContract({
  abi: messageTransmitterAbi,
  functionName: 'version',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__
 */
export const writeMessageTransmitter = /*#__PURE__*/ createWriteContract({
  abi: messageTransmitterAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const writeMessageTransmitterAcceptOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"disableAttester"`
 */
export const writeMessageTransmitterDisableAttester =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    functionName: 'disableAttester',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"enableAttester"`
 */
export const writeMessageTransmitterEnableAttester =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    functionName: 'enableAttester',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"initialize"`
 */
export const writeMessageTransmitterInitialize =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pause"`
 */
export const writeMessageTransmitterPause = /*#__PURE__*/ createWriteContract({
  abi: messageTransmitterAbi,
  functionName: 'pause',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"receiveMessage"`
 */
export const writeMessageTransmitterReceiveMessage =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    functionName: 'receiveMessage',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"rescueERC20"`
 */
export const writeMessageTransmitterRescueErc20 =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    functionName: 'rescueERC20',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"sendMessage"`
 */
export const writeMessageTransmitterSendMessage =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    functionName: 'sendMessage',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setMaxMessageBodySize"`
 */
export const writeMessageTransmitterSetMaxMessageBodySize =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    functionName: 'setMaxMessageBodySize',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setSignatureThreshold"`
 */
export const writeMessageTransmitterSetSignatureThreshold =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    functionName: 'setSignatureThreshold',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeMessageTransmitterTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"unpause"`
 */
export const writeMessageTransmitterUnpause = /*#__PURE__*/ createWriteContract(
  { abi: messageTransmitterAbi, functionName: 'unpause' },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateAttesterManager"`
 */
export const writeMessageTransmitterUpdateAttesterManager =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    functionName: 'updateAttesterManager',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updatePauser"`
 */
export const writeMessageTransmitterUpdatePauser =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    functionName: 'updatePauser',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateRescuer"`
 */
export const writeMessageTransmitterUpdateRescuer =
  /*#__PURE__*/ createWriteContract({
    abi: messageTransmitterAbi,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__
 */
export const simulateMessageTransmitter = /*#__PURE__*/ createSimulateContract({
  abi: messageTransmitterAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const simulateMessageTransmitterAcceptOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"disableAttester"`
 */
export const simulateMessageTransmitterDisableAttester =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    functionName: 'disableAttester',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"enableAttester"`
 */
export const simulateMessageTransmitterEnableAttester =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    functionName: 'enableAttester',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"initialize"`
 */
export const simulateMessageTransmitterInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"pause"`
 */
export const simulateMessageTransmitterPause =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    functionName: 'pause',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"receiveMessage"`
 */
export const simulateMessageTransmitterReceiveMessage =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    functionName: 'receiveMessage',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"rescueERC20"`
 */
export const simulateMessageTransmitterRescueErc20 =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    functionName: 'rescueERC20',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"sendMessage"`
 */
export const simulateMessageTransmitterSendMessage =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    functionName: 'sendMessage',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setMaxMessageBodySize"`
 */
export const simulateMessageTransmitterSetMaxMessageBodySize =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    functionName: 'setMaxMessageBodySize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"setSignatureThreshold"`
 */
export const simulateMessageTransmitterSetSignatureThreshold =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    functionName: 'setSignatureThreshold',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateMessageTransmitterTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"unpause"`
 */
export const simulateMessageTransmitterUnpause =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateAttesterManager"`
 */
export const simulateMessageTransmitterUpdateAttesterManager =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    functionName: 'updateAttesterManager',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updatePauser"`
 */
export const simulateMessageTransmitterUpdatePauser =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    functionName: 'updatePauser',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageTransmitterAbi}__ and `functionName` set to `"updateRescuer"`
 */
export const simulateMessageTransmitterUpdateRescuer =
  /*#__PURE__*/ createSimulateContract({
    abi: messageTransmitterAbi,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__
 */
export const watchMessageTransmitterEvent =
  /*#__PURE__*/ createWatchContractEvent({ abi: messageTransmitterAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"AttesterDisabled"`
 */
export const watchMessageTransmitterAttesterDisabledEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    eventName: 'AttesterDisabled',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"AttesterEnabled"`
 */
export const watchMessageTransmitterAttesterEnabledEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    eventName: 'AttesterEnabled',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"AttesterManagerUpdated"`
 */
export const watchMessageTransmitterAttesterManagerUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    eventName: 'AttesterManagerUpdated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"Initialized"`
 */
export const watchMessageTransmitterInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"MaxMessageBodySizeUpdated"`
 */
export const watchMessageTransmitterMaxMessageBodySizeUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    eventName: 'MaxMessageBodySizeUpdated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"MessageReceived"`
 */
export const watchMessageTransmitterMessageReceivedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    eventName: 'MessageReceived',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"MessageSent"`
 */
export const watchMessageTransmitterMessageSentEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    eventName: 'MessageSent',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 */
export const watchMessageTransmitterOwnershipTransferStartedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchMessageTransmitterOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"Pause"`
 */
export const watchMessageTransmitterPauseEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    eventName: 'Pause',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"PauserChanged"`
 */
export const watchMessageTransmitterPauserChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    eventName: 'PauserChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"RescuerChanged"`
 */
export const watchMessageTransmitterRescuerChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    eventName: 'RescuerChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"SignatureThresholdUpdated"`
 */
export const watchMessageTransmitterSignatureThresholdUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    eventName: 'SignatureThresholdUpdated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageTransmitterAbi}__ and `eventName` set to `"Unpause"`
 */
export const watchMessageTransmitterUnpauseEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: messageTransmitterAbi,
    eventName: 'Unpause',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__
 */
export const readTokenMessager = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"denylister"`
 */
export const readTokenMessagerDenylister = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  functionName: 'denylister',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"feeRecipient"`
 */
export const readTokenMessagerFeeRecipient = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  functionName: 'feeRecipient',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"initializedVersion"`
 */
export const readTokenMessagerInitializedVersion =
  /*#__PURE__*/ createReadContract({
    abi: tokenMessagerAbi,
    functionName: 'initializedVersion',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"isDenylisted"`
 */
export const readTokenMessagerIsDenylisted = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  functionName: 'isDenylisted',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"localMessageTransmitter"`
 */
export const readTokenMessagerLocalMessageTransmitter =
  /*#__PURE__*/ createReadContract({
    abi: tokenMessagerAbi,
    functionName: 'localMessageTransmitter',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"localMinter"`
 */
export const readTokenMessagerLocalMinter = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  functionName: 'localMinter',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"messageBodyVersion"`
 */
export const readTokenMessagerMessageBodyVersion =
  /*#__PURE__*/ createReadContract({
    abi: tokenMessagerAbi,
    functionName: 'messageBodyVersion',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"owner"`
 */
export const readTokenMessagerOwner = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"pendingOwner"`
 */
export const readTokenMessagerPendingOwner = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  functionName: 'pendingOwner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"remoteTokenMessengers"`
 */
export const readTokenMessagerRemoteTokenMessengers =
  /*#__PURE__*/ createReadContract({
    abi: tokenMessagerAbi,
    functionName: 'remoteTokenMessengers',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"rescuer"`
 */
export const readTokenMessagerRescuer = /*#__PURE__*/ createReadContract({
  abi: tokenMessagerAbi,
  functionName: 'rescuer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__
 */
export const writeTokenMessager = /*#__PURE__*/ createWriteContract({
  abi: tokenMessagerAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const writeTokenMessagerAcceptOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addLocalMinter"`
 */
export const writeTokenMessagerAddLocalMinter =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    functionName: 'addLocalMinter',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addRemoteTokenMessenger"`
 */
export const writeTokenMessagerAddRemoteTokenMessenger =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    functionName: 'addRemoteTokenMessenger',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"denylist"`
 */
export const writeTokenMessagerDenylist = /*#__PURE__*/ createWriteContract({
  abi: tokenMessagerAbi,
  functionName: 'denylist',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurn"`
 */
export const writeTokenMessagerDepositForBurn =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    functionName: 'depositForBurn',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurnWithHook"`
 */
export const writeTokenMessagerDepositForBurnWithHook =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    functionName: 'depositForBurnWithHook',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveFinalizedMessage"`
 */
export const writeTokenMessagerHandleReceiveFinalizedMessage =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    functionName: 'handleReceiveFinalizedMessage',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveUnfinalizedMessage"`
 */
export const writeTokenMessagerHandleReceiveUnfinalizedMessage =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    functionName: 'handleReceiveUnfinalizedMessage',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"initialize"`
 */
export const writeTokenMessagerInitialize = /*#__PURE__*/ createWriteContract({
  abi: tokenMessagerAbi,
  functionName: 'initialize',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeLocalMinter"`
 */
export const writeTokenMessagerRemoveLocalMinter =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    functionName: 'removeLocalMinter',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeRemoteTokenMessenger"`
 */
export const writeTokenMessagerRemoveRemoteTokenMessenger =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    functionName: 'removeRemoteTokenMessenger',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"rescueERC20"`
 */
export const writeTokenMessagerRescueErc20 = /*#__PURE__*/ createWriteContract({
  abi: tokenMessagerAbi,
  functionName: 'rescueERC20',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"setFeeRecipient"`
 */
export const writeTokenMessagerSetFeeRecipient =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    functionName: 'setFeeRecipient',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeTokenMessagerTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"unDenylist"`
 */
export const writeTokenMessagerUnDenylist = /*#__PURE__*/ createWriteContract({
  abi: tokenMessagerAbi,
  functionName: 'unDenylist',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateDenylister"`
 */
export const writeTokenMessagerUpdateDenylister =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    functionName: 'updateDenylister',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateRescuer"`
 */
export const writeTokenMessagerUpdateRescuer =
  /*#__PURE__*/ createWriteContract({
    abi: tokenMessagerAbi,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__
 */
export const simulateTokenMessager = /*#__PURE__*/ createSimulateContract({
  abi: tokenMessagerAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const simulateTokenMessagerAcceptOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addLocalMinter"`
 */
export const simulateTokenMessagerAddLocalMinter =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    functionName: 'addLocalMinter',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"addRemoteTokenMessenger"`
 */
export const simulateTokenMessagerAddRemoteTokenMessenger =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    functionName: 'addRemoteTokenMessenger',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"denylist"`
 */
export const simulateTokenMessagerDenylist =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    functionName: 'denylist',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurn"`
 */
export const simulateTokenMessagerDepositForBurn =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    functionName: 'depositForBurn',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"depositForBurnWithHook"`
 */
export const simulateTokenMessagerDepositForBurnWithHook =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    functionName: 'depositForBurnWithHook',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveFinalizedMessage"`
 */
export const simulateTokenMessagerHandleReceiveFinalizedMessage =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    functionName: 'handleReceiveFinalizedMessage',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"handleReceiveUnfinalizedMessage"`
 */
export const simulateTokenMessagerHandleReceiveUnfinalizedMessage =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    functionName: 'handleReceiveUnfinalizedMessage',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"initialize"`
 */
export const simulateTokenMessagerInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeLocalMinter"`
 */
export const simulateTokenMessagerRemoveLocalMinter =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    functionName: 'removeLocalMinter',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"removeRemoteTokenMessenger"`
 */
export const simulateTokenMessagerRemoveRemoteTokenMessenger =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    functionName: 'removeRemoteTokenMessenger',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"rescueERC20"`
 */
export const simulateTokenMessagerRescueErc20 =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    functionName: 'rescueERC20',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"setFeeRecipient"`
 */
export const simulateTokenMessagerSetFeeRecipient =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    functionName: 'setFeeRecipient',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateTokenMessagerTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"unDenylist"`
 */
export const simulateTokenMessagerUnDenylist =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    functionName: 'unDenylist',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateDenylister"`
 */
export const simulateTokenMessagerUpdateDenylister =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    functionName: 'updateDenylister',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenMessagerAbi}__ and `functionName` set to `"updateRescuer"`
 */
export const simulateTokenMessagerUpdateRescuer =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenMessagerAbi,
    functionName: 'updateRescuer',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__
 */
export const watchTokenMessagerEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: tokenMessagerAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"Denylisted"`
 */
export const watchTokenMessagerDenylistedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    eventName: 'Denylisted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"DenylisterChanged"`
 */
export const watchTokenMessagerDenylisterChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    eventName: 'DenylisterChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"DepositForBurn"`
 */
export const watchTokenMessagerDepositForBurnEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    eventName: 'DepositForBurn',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"FeeRecipientSet"`
 */
export const watchTokenMessagerFeeRecipientSetEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    eventName: 'FeeRecipientSet',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"Initialized"`
 */
export const watchTokenMessagerInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"LocalMinterAdded"`
 */
export const watchTokenMessagerLocalMinterAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    eventName: 'LocalMinterAdded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"LocalMinterRemoved"`
 */
export const watchTokenMessagerLocalMinterRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    eventName: 'LocalMinterRemoved',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"MintAndWithdraw"`
 */
export const watchTokenMessagerMintAndWithdrawEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    eventName: 'MintAndWithdraw',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 */
export const watchTokenMessagerOwnershipTransferStartedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchTokenMessagerOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"RemoteTokenMessengerAdded"`
 */
export const watchTokenMessagerRemoteTokenMessengerAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    eventName: 'RemoteTokenMessengerAdded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"RemoteTokenMessengerRemoved"`
 */
export const watchTokenMessagerRemoteTokenMessengerRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    eventName: 'RemoteTokenMessengerRemoved',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"RescuerChanged"`
 */
export const watchTokenMessagerRescuerChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    eventName: 'RescuerChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenMessagerAbi}__ and `eventName` set to `"UnDenylisted"`
 */
export const watchTokenMessagerUnDenylistedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenMessagerAbi,
    eventName: 'UnDenylisted',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__
 */
export const readUsdc = /*#__PURE__*/ createReadContract({ abi: usdcAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"allowance"`
 */
export const readUsdcAllowance = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readUsdcBalanceOf = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"decimals"`
 */
export const readUsdcDecimals = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"name"`
 */
export const readUsdcName = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"symbol"`
 */
export const readUsdcSymbol = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"totalSupply"`
 */
export const readUsdcTotalSupply = /*#__PURE__*/ createReadContract({
  abi: usdcAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link usdcAbi}__
 */
export const writeUsdc = /*#__PURE__*/ createWriteContract({ abi: usdcAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"approve"`
 */
export const writeUsdcApprove = /*#__PURE__*/ createWriteContract({
  abi: usdcAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transfer"`
 */
export const writeUsdcTransfer = /*#__PURE__*/ createWriteContract({
  abi: usdcAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeUsdcTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: usdcAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link usdcAbi}__
 */
export const simulateUsdc = /*#__PURE__*/ createSimulateContract({
  abi: usdcAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"approve"`
 */
export const simulateUsdcApprove = /*#__PURE__*/ createSimulateContract({
  abi: usdcAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transfer"`
 */
export const simulateUsdcTransfer = /*#__PURE__*/ createSimulateContract({
  abi: usdcAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link usdcAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateUsdcTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: usdcAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link usdcAbi}__
 */
export const watchUsdcEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: usdcAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link usdcAbi}__ and `eventName` set to `"Approval"`
 */
export const watchUsdcApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: usdcAbi,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link usdcAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchUsdcTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: usdcAbi,
  eventName: 'Transfer',
})
