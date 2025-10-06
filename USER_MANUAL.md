# CCTP v2 Cross-Chain USDC Transfer - User Manual

## Overview

This application provides a secure and efficient way to transfer USDC tokens across different blockchain networks using Circle's Cross-Chain Transfer Protocol (CCTP) v2. The app supports both full transfers (burn + mint) and mint-only operations for maximum flexibility.

## Supported Networks

We cover all networks supported by CCTP V2 following their official announcement (except BSC with USYC).

https://developers.circle.com/cctp/cctp-supported-blockchains

## Transfer Methods

### 1. Full Transfer Method

The **Transfer** method performs a complete cross-chain transfer in one flow:

1. **Burn**: Burns USDC on the source chain
2. **Attestation**: Waits for Circle's attestation service to verify the burn
3. **Mint**: Mints equivalent USDC on the destination chain

**Use Cases:**

- First-time transfers between chains
- When you want a seamless end-to-end experience
- When you have access to wallets on both source and destination chains

### 2. Mint Only Method

The **Mint Only** method allows you to mint USDC using an existing burn transaction hash:

**Use Cases:**

- Recovering from interrupted transfers
- When you have a burn transaction but need to mint on a different wallet
- Handling "AlreadyProcessed" errors on Solana
- Cross-wallet transfers (burn with one wallet, mint with another-owned wallet)

## Step-by-Step Transfer Guide

### Prerequisites

1. **Wallet Connection**: Connect your wallet that supports the source network
2. **USDC Balance**: Ensure you have sufficient USDC on the source chain
3. **Gas/Native Tokens**: Have native tokens for transaction fees on both source and destination chains. If you want to bridge your existing assets to get native tokens on source/destination, you can leverage our LiFi integrated widget for doing so easily by clicking "Fund with LiFi".
<img width="446" height="192" alt="Screenshot 2025-10-06 at 12 36 06 PM" src="https://github.com/user-attachments/assets/0efe40c5-d7cd-4e65-b8d8-29b299e85761" />

4. **Destination Wallet**: For cross-wallet transfers, ensure you have the destination address ready
5. If you transfer USDC from one of your owned accounts, please connect both wallets for a seamless experience. Additionally, if the trade involves non-EVM (Solana), you can connect it via the top sticky toolbar. We highly recommend reconnecting via "Connect Solana" even if your EVM wallet provider supports Solana (Metamask, Phantom, OKX, ...)

### Full Transfer Process

#### Step 1: Select Transfer Method

- Choose **"Transfer"** for a complete burn-to-mint flow
- Choose **"Mint Only"** if you have an existing burn transaction hash

#### Step 2: Configure Networks

- **Source Chain**: Select the network where your USDC currently exists
- **Destination Chain**: Select the target network where you want to receive USDC
- The app will automatically prevent selecting the same chain for both source and destination

#### Step 3: Set Destination Address

- **Default**: Uses your connected wallet address on the destination chain
- **Custom**: Click the wallet icon to enter a different destination address
- **Cross-Chain Compatibility**: The app automatically formats addresses for cross-chain compatibility (e.g., EVM to Solana)

#### Step 4: Enter Transfer Amount

- Input the amount of USDC to transfer
- View your current balance and use the "Max" button for full balance transfers
- The app validates sufficient balance before proceeding

#### Step 5: Review Warnings and Confirmations

- **Native Balance Warnings**: Ensure you have native tokens for gas fees
- **Risk Acknowledgment**: Check the box to confirm you understand the transfer risks
- **Cross-Chain Address Formatting**: The app handles address format conversion automatically

#### Step 6: Execute Transfer

Click **"Start Transfer"** to begin the process. Time may vary from chain to chain from 30s to 1'30s. The transfer progresses through these stages:

1. **Burning** (30 seconds)
   - Request for USDC approval **📝 requires your signature**
   - Burns USDC on the source chain **📝 requires your signature**
   - Generates a burn transaction hash
   - Shows transaction link for verification

2. **Waiting for Attestation** (10 - 60s)
   - Circle's attestation service verifies the burn
   - Provides cryptographic proof for the mint
   - Shows attestation hash when ready

3. **Minting** (30 seconds)
   - Mints equivalent USDC on the destination chain **📝 requires your signature**
   - Shows mint transaction hash
   - Updates balances on both chains

4. **Completed** 🎉
   - Transfer is complete
   - Shows final balances and transaction summary
   - Displays celebration animation

### Mint Only Process

#### When to Use Mint Only

- Your transfer was interrupted after burning
- You received an "AlreadyProcessed" error (common on Solana)
- You want to mint tokens from a burn performed elsewhere
- Cross-wallet scenarios

#### Steps for Mint Only

1. Select **"Mint Only"** method
2. Choose the **source chain** where the burn occurred
3. Choose the **destination chain** for minting
4. Enter the **burn transaction hash**
5. The app will:
   - Verify the burn transaction
   - Fetch the attestation automatically
   - Perform the mint operation

## Transfer Types

### Fast Transfer (Default)

- **Finality Threshold**: 1000 blocks
- **Speed**: Faster attestation times
- **Use Case**: Most transfers, when speed is prioritized

### Standard Transfer (🚧 WIP)

- **Finality Threshold**: 2000 blocks
- **Speed**: Slower but more secure
- **Use Case**: Large transfers requiring maximum security

_Note: Currently, the app defaults to Fast transfers for optimal user experience._

## Special Considerations

### Cross-Chain Address Handling

The app automatically handles address format conversion:

- **EVM to Solana**: Converts 0x addresses to Solana base58 format
- **Solana to EVM**: Handles Solana addresses for EVM destination
- **Validation**: Ensures addresses are valid for their respective chains

### Error Recovery

#### Common Errors and Solutions

1. **"AlreadyProcessed" (Solana)**
   - Use the "Mint Only" method with your burn transaction hash
   - This error indicates the burn was successful but needs manual minting

2. **"Insufficient Balance"**
   - Check your USDC balance on the source chain
   - Ensure you have enough for the transfer amount

3. **"Network not found"**
   - The app will prompt to add the network to your wallet
   - Approve the network addition request

4. **"Solana signer is required"**
   - Set your Solana wallet as "Active"
   - Refresh the page and retry the transfer

### Transaction Monitoring

#### Real-Time Logs

- The app provides detailed logs throughout the transfer process
- Each step shows timestamps and transaction hashes
- Click on transaction hashes to view on block explorers

#### Transaction History

- Access previous burn transactions via the history icon
- Useful for finding transaction hashes for mint-only operations

#### Explorer Links

- All transaction hashes link to their respective block explorers
- Verify transaction status and details externally

## Security Best Practices

### Before Transferring

1. **Verify Addresses**: Double-check destination addresses, especially for custom recipients
2. **Test Amounts**: Consider testing with small amounts for first-time transfers
3. **Network Confirmation**: Ensure you're on the correct networks
4. **Gas Preparation**: Have sufficient native tokens on both chains

### During Transfer

1. **Don't Close the App**: Keep the browser tab open during transfer
2. **Network Stability**: Ensure stable internet connection
3. **Wallet Connection**: Keep wallet connected throughout the process

### After Transfer

1. **Verify Completion**: Check that tokens arrived in the destination wallet
2. **Save Transaction Hashes**: Keep burn transaction hashes for future reference
3. **Balance Verification**: Confirm updated balances on both chains

## Troubleshooting

### Transfer Stuck or Failed

1. **Check Logs**: Review the transfer logs for specific error messages
2. **Network Status**: Verify both source and destination networks are operational
3. **Attestation Delay**: Attestations can take up more time during high network congestion
4. **Use Mint Only**: If burn succeeded but mint failed, use mint-only with the burn transaction hash

### Wallet Connection Issues

1. **Refresh Connection**: Disconnect and reconnect your wallet
2. **Network Switching**: Ensure wallet is on the correct network
3. **Clear Cache**: Clear browser cache if connection persists to fail

### Balance Not Updating

1. **Wait for Confirmation**: Balances update after transaction confirmation, or click 🔄 to refresh balances.
2. **Manual Refresh**: The app automatically refreshes, but you can refresh the page
3. **Block Explorer**: Verify transaction success on the block explorer

## Technical Details

### CCTP Protocol

- Uses Circle's Cross-Chain Transfer Protocol v2
- Burn-and-mint mechanism ensures 1:1 USDC backing
- Attestation service provides cryptographic proof of burns
- No wrapped tokens - native USDC on all supported chains

### Smart Contracts

- **Token Messenger V2**: Handles USDC burning on source chains
- **Message Transmitter V2**: Handles USDC minting on destination chains
- **Attestation Service**: Circle's off-chain service providing burn proofs

## Support and Resources

- We are willing to hear your issues, improvement suggestion or feedback while using. [Open an issue](https://github.com/nbitslabs/cctpv2/issues/new)

### Additional Resources

- [Circle CCTP Documentation](https://developers.circle.com/stablecoins/docs/cctp-getting-started)
- [USDC Contract Addresses](https://developers.circle.com/stablecoins/docs/usdc-on-main-networks)

---

_Always verify transaction details and use at your own risk. Consider testing with small amounts before large transfers._
