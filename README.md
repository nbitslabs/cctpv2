# CCTP Sample App

This sample application demonstrates Cross-Chain Transfer Protocol (CCTP) step-by-step capabilities on testnet networks. The app showcases CCTP functionality across multiple testnets:
- Ethereum Sepolia
- Avalanche Fuji C-Chain
- Base Sepolia
- Linea Sepolia
- Arbitrum Sepolia
- Sonic Blaze

## Environment Setup

1. Copy the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```

2. Update the `.env.local` file with your configuration:
- Add your wallet private key

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The sample app will be running at [http://localhost:3000](http://localhost:3000).