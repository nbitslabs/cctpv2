import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function ExternalLink({
  href,
  children,
  className,
  withIcon,
}: {
  href: string
  children: React.ReactNode
  className?: string
  withIcon?: boolean
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "text-primary underline-offset-4 hover:underline group",
        className
      )}
    >
      {children}
      {withIcon && (
        <ArrowUpRight className="inline size-3.5 ml-0.5 -mt-px group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      )}
    </Link>
  )
}
