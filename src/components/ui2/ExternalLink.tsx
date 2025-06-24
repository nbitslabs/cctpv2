import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("hover:text-primary", className)}
    >
      {children}
    </Link>
  );
}
