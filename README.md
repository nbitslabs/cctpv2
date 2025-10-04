# CCTP V2

## TODO

- [x] Supports Mint only (provides Burn tx hash)
- [x] History of Trades
- [x] Support Solana
- [x] Support Codex
- [x] Support HyperEVM
- [x] Support XDC Network
- [ ] Add Li.fi to support cross-chain swap (to get native tokens quickly)
- [ ] Supports CCTP V1
- [ ] Estimated fees: fee on both chains (in native token), and total fees in USDC

### Low priority

- [x] UX Improvement: Add the latest USDC out tx
- [x] UX Improvement: Handle interrupted flow when burned, but unable to continue

## Testing

- [x] [Ethereum](https://etherscan.io/tx/0x5e50464610d278bca8a964dfda03044748742604bff8d440a5270eb738a36aee) -> [Arbitrum One](https://arbiscan.io/tx/0x525bb17796a80c097df764064ce0059ec3e68f10792958a2527a623083cfc711)
- [x] [Arbitrum One](https://arbiscan.io/tx/0x0015acffe6f8e0c120bf56bdbd3a064ffdcad05ee731ad1a8b7b76c50cd862f4) -> [Ethereum](https://etherscan.io/tx/0x5b5d7509b8f9516759151028f7c2de1fb5ef475b2275d178e7eef08234d12625)
- [x] [Ethereum](https://etherscan.io/tx/0x6cb313683dbbb7ee60c92835143b9fb5eaf4a3ea7752025ea06e434c2d862154) -> [Base](https://basescan.org/tx/0x81d8574a2f15cbf8f81474ecd65d2a8b0c20f780dada74029717aac6057ada71)
- [x] [Base](https://etherscan.io/tx/0x96e82897a1e647912f22d694af2eb199771a665f285e2fc206b309446d822222) -> [Arbitrum One](https://arbiscan.io/tx/0x33e15db11a09f085e2e4edd4a30dd0070be263e333b02255a9e5d6621f3573e0)
- [x] [Arbitrum One](https://arbiscan.io/tx/0xe8d4963b303bcf013db1ca25a2b477a4e1e918c22a6b7beb67bc616e2a2ed331) -> [Avalanche C-chain](https://snowtrace.io/tx/0x691ece42a5a2c5f3abd14432566e953f8a698f93f2284229a7ffd1aa4f925538)
- [x] [Solana](https://solscan.io/tx/4R2towhLBA1ZeHrF91on42Zbbk4tVpG17Rs84dNKmtnJCSAFNNEFsyGFS4qFyuDvPiKDCTjKQ3Xf31s1gReacbK9) -> [Ethereum](https://etherscan.io/tx/0xc75c86866dcdaf036dc0c29cdc7a75f426d5883e483a778950275b8f09efbaee)
- [x] [Arbitrum One](https://arbiscan.io/tx/0xf268391db5671d5bc43c6c69d91cfe5b51dbb6583a78796e63493bccd6b80592) -> [Solana](https://solscan.io/tx/598Ateqej7eWpR9ndrdnbVY6ZSZWVoZqKSuLiVbjVhYsLnyUfwDcZA3tpMegMdeS9fnyH672PhTDuZi5QERhoHnc)
- [x] [Arbitrum One](https://arbiscan.io/tx/0xf08969b1e5b8df967f9495503b062bb0ca9bda210ed0e2d42c7fbd09156112bd) -> [Codex](https://explorer.codex.xyz/tx/0xf6a37dc84e2aeb286dc5c970d0ece7e4ecccc95c87cbbaf9b96c57cf5102929f)
- [x] [Avalanche C-chain](https://snowtrace.io/tx/0xfbae678dfd381dbc9073fda845227ef502f6819e99f8f431cdafe1534cd3b5a1) -> [Codex](https://explorer.codex.xyz/tx/0x76d2073a4852690dc7e6a08b9173b9bdc20414baaee215fa594624d5c1183088)
- [x] [Codex](https://explorer.codex.xyz/tx/0xbcacf0758cf52e24cf746bbb073b978cbdc7f5cc63fe2d65fe827a4626e5d3b9) -> [Avalanche C-chain](https://snowtrace.io/tx/0x00fa4f035d74435d9e4f90b6c1db9c7e81987555f98bcafef05f3578f407c086?chainid=43114)
- [x] [Solana](https://solscan.io/tx/3EKm4mPv9f5wXRHRgd6FmnJTsVFw3PuDz59Up7mcUJyAiyP1n5B4G27Z6u6dZrEbPZSMN28p8AmJLp6ikkBaWSiU) -> [XDC Network](https://xdcscan.com/tx/0xdcb5b531af46f787ae430c5e2b5b2f178e6b2e044df41c4c8d40be20445a6f96)
- [x] [Solana](https://solscan.io/tx/4d7WvDktAksFjCuVpx5SL7jX6Kq84G3kMN58S8AL1TPygXk19EAkAhcGwyF17NYw3yJ8JSLozLWiuUxVN33D6vX2) -> [HyperEVM](https://www.hyperscan.com//tx/0xb229422a308de76b19eb7148148d0fb4633be407217167fe0eba4574b39850e0)
- [x] [XDC Network](https://xdcscan.com/tx/0x721aa0cd02815c87abacac3700c538226bc5d9da239e96f96cda2ab0f7ea2e82) -> [HyperEVM](https://www.hyperscan.com//tx/0xf363dec94c706c24d3b08825e745c217ecbb628721c11019e723ee1cf01db875)
- [x] [Solana](https://solscan.io/tx/2LNqjhz67tKfg2oajTx7q3T2HvJHyFSyE7r62fMPBGzjUewQ32zhe2AD7fEArgedhD6gtuarW9zU2VMXLcr75E6r) -> [Unichain](https://uniscan.xyz/tx/0x88315ec25cdc0e10624e72e4132b79bf0ada4f957d2fad838b4cd44a14a4baea)
- [x] [XDC Network](https://xdcscan.com/tx/0x571e10241a8384e6f1537b71969c70a89dd99d23882b408e53da647b77848f81) -> [Solana](https://solscan.io/tx/3FNj1nsDFWRThkQ4JVvKrwasdd5V8YJ7aj6aV1ynQYHNJNxdkg5xS4qsJWwFf6XfUEVmyyM2P2NZVic5bdnRSKNy)

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
