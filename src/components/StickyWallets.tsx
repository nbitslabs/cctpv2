import { useChainId } from "wagmi";
import ConnectedWallet from "./ConnectedWallet";
import { solana } from "@reown/appkit/networks";
import Image from "next/image";
import favicon from "../app/favicon.ico";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

function StickyWallets() {
  const eip155ChainId = useChainId();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 w-max p-1.5 pl-2 rounded-md bg-foreground/10 border border-foreground/5 shadow backdrop-blur-sm select-none fixed left-1/2 -translate-x-1/2 top-2 z-50">
      <Image src={favicon} alt="CCTP V2" width={20} height={20} />
      <ConnectedWallet namespace="eip155" adapterId={eip155ChainId} />
      <ConnectedWallet namespace="solana" adapterId={solana.id} />
      <Button
        variant="ghost"
        size="iconSm"
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
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
  );
}

export default StickyWallets;
