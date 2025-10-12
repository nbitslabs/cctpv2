import ExternalLink from "@/components/ui2/ExternalLink"

export const texts = {
  tooltip: {
    bridge: (
      <>
        Fund native tokens with cross-chain transfers. Powered by{" "}
        <ExternalLink href="https://li.fi/" withIcon>
          LiFi
        </ExternalLink>
        .
      </>
    ),
    fiat: (
      <>
        Deposit with fiat (Bank cards, Apple Pay, Google Pay, Binance Pay,
        etc.). Requires KYC. Powered by{" "}
        <ExternalLink href="https://www.meld.io/" withIcon>
          Meld
        </ExternalLink>
        .
      </>
    ),
  },
}
