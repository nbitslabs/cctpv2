import ExternalLink from "./ui2/ExternalLink";

export default function Footer() {
  return (
    <footer className="text-center text-sm text-muted-foreground mt-4">
      <p>
        Funded by{" "}
        <ExternalLink
          href="https://github.com/raghavsood"
          className="text-primary font-semibold"
        >
          raghavsood
        </ExternalLink>
        . Built with ❤️ by{" "}
        <ExternalLink
          href="https://github.com/thanhhoa214"
          className="text-primary font-semibold"
        >
          thanhhoa214 🇻🇳
        </ExternalLink>
        .
      </p>
    </footer>
  );
}
