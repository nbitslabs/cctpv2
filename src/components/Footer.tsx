import ExternalLink from "./ui2/ExternalLink"
import { FaGithub, FaBug } from "react-icons/fa"
import { IoDocumentTextOutline } from "react-icons/io5"

const links = [
  {
    href: "https://github.com/nbitslabs/cctpv2",
    label: "GitHub",
    icon: FaGithub,
  },
  {
    href: "https://github.com/nbitslabs/cctpv2/blob/main/USER_MANUAL.md",
    label: "Documentation",
    icon: IoDocumentTextOutline,
  },
  {
    href: "https://github.com/nbitslabs/cctpv2/issues/new",
    label: "Report Bug",
    icon: FaBug,
  },
]

export default function Footer() {
  return (
    <footer className="text-center text-sm text-muted-foreground mt-8 px-2">
      <ul className="flex justify-center items-center gap-4 mb-4">
        {links.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <ExternalLink
              href={href}
              className="flex items-center gap-1 text-foreground/70 hover:text-foreground hover:no-underline"
            >
              <Icon />
              {label}
            </ExternalLink>
          </li>
        ))}
      </ul>

      <p>
        Funded by{" "}
        <ExternalLink
          href="https://github.com/raghavsood"
          className="text-primary font-semibold"
        >
          raghavsood
        </ExternalLink>
        .{" "}
        <span className="inline-block">
          Built with ❤️ by{" "}
          <ExternalLink
            href="https://github.com/thanhhoa214"
            className="text-primary font-semibold"
          >
            thanhhoa214 🇻🇳
          </ExternalLink>
          .
        </span>
      </p>
    </footer>
  )
}
