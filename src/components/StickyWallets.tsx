import { Blockchain } from "@circle-fin/bridge-kit"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { FaGithub } from "react-icons/fa"
import favicon from "../app/favicon.ico"
import ConnectedWallet from "./ConnectedWallet"
import { Button } from "./ui/button"

function StickyWallets() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="from-foreground/30 via-foreground/10 to-foreground/20 border-foreground/10 fixed top-2 left-1/2 z-50 flex w-max -translate-x-1/2 items-center gap-2 rounded-md border bg-linear-to-tr p-1.5 pl-2 shadow backdrop-blur-sm select-none sm:sticky">
      <Image src={favicon} alt="CCTP V2" width={20} height={20} />
      <ConnectedWallet namespace="eip155" adapterId={Blockchain.Ethereum} />
      <ConnectedWallet namespace="solana" adapterId={Blockchain.Solana} />
      <Button
        variant="ghost"
        size="iconSm"
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark")
        }}
      >
        {theme === "dark" ? <Moon /> : <Sun />}
      </Button>
      <Button variant="ghost" size="iconSm" asChild>
        <Link
          href="https://github.com/nbitslabs/cctpv2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
          <span className="sr-only">GitHub</span>
        </Link>
      </Button>
    </div>
  )
}

export default StickyWallets
