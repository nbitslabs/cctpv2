import { cn } from "@/lib/utils"
import Link from "next/link"

export default function ExternalLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "text-primary underline-offset-4 hover:underline",
        className
      )}
    >
      {children}
    </Link>
  )
}
