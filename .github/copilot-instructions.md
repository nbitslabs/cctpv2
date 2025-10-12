# Copilot Instructions

## Architecture & Flow

- The app is a Next.js 15 App Router project served under `/cctpv2`; the primary workflow lives in the client component `src/app/page.tsx`.
- Cross-chain transfers run through `useCrossChainTransfer` (`src/hooks/useCrossChainTransfer.tsx`), which sequences burn → attestation polling → mint and writes status updates into the on-screen log.
- Chain behaviors are abstracted by `CctpNetworkAdapter` (`src/lib/cctp/networks/type.ts`); adapters are assembled from EVM (`evm.ts`) and Solana (`solana.ts`) implementations via `networkAdapters`.
- Helper utilities in `src/lib/cctp/networks/util.ts` handle Solana-associated token account lookup and address formatting when source/destination namespaces differ.

## Wallet & Network Management

- Providers stack (`src/app/Providers.tsx`) wraps `@reown/appkit`, `ActiveNetworkProvider`, `LifiWidgetProvider`, and the promise-based alert dialog; any component needing wallet state should stay inside this tree.
- `ActiveNetworkProvider` (`src/lib/cctp/providers/ActiveNetworkProvider.tsx`) owns the currently selected chain and handles adding/switching networks through AppKit/Wagmi—always `await setActiveNetwork` before calling adapter writes.
- Solana interactions require a `TransactionSigner`; `SetSolanaSigner` hydrates it once a Solana wallet is active. Pass that signer into `useCrossChainTransfer.executeTransfer` whenever Solana is involved.

## Data Fetching & External Services

- Balances use React Query hooks in `src/hooks/useBalance.ts`; each network adapter must expose `readNativeBalance` and `readUsdcBalance` returning `{ raw, formatted }` to keep UI expectations intact.
- Attestations poll Circle’s Iris API via `src/lib/cctp/attestation.ts`; do not change polling cadence without considering the 5-minute timeout in `retrieveAttestation`.
- Recent transfers rely on the static Alchemy chain catalog in `src/lib/alchemy/account.ts`; unsupported chains simply return an empty list.
- Funding helpers integrate LiFi (`src/components/ui2/LifiWidget.tsx`) and Meld (`FiatDepositButton.tsx`); both expect to live inside the AppKit provider for dialog control.

## Tooling & Commands

- Run the app with `pnpm dev` (served on port 3002 with Turbopack), build with `pnpm build`, and lint using `pnpm lint` (oxlint). Formatting uses `pnpm format`, which applies `oxlint --fix`.
- Regenerate Wagmi contract bindings with `pnpm generate:wagmi`; this refreshes `src/lib/wagmi/generated.ts` from schemas defined in `wagmi.config.ts`.
- Update Solana instruction clients after editing Anchor IDLs by running `pnpm generate:codama`, which rewrites the modules in `src/lib/solana/tools/codama/generated/`.

## Patterns & Conventions

- UI components follow the design system under `src/components/ui` and `ui2`; prefer reusing `TooltipWrap`, `Button`, `Card`, and the number-format helpers instead of bespoke styling.
- Notification copy is centralized through the Sonner toaster configured in `src/app/layout.tsx`; log entries inside `useCrossChainTransfer` should remain React nodes for consistent formatting.
- Static chain metadata (logos, explorers, USDC addresses, domains) lives beside the adapters; when adding a network, update `src/lib/wagmi/config.ts`, supply an image under `public/images/chains/`, and extend the appropriate adapter map.
- Respect the `basePath` in `next.config.ts` when introducing new routes or assets—absolute links should include the deployed URL from `src/lib/constants.ts`.
