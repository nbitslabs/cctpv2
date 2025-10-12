"use client"
import { cn, formatNumber, type FormatNumberOption } from "@/lib/utils"
import { Info, type LucideProps } from "lucide-react"
import NumberFlow from "@number-flow/react"
import { type PropsWithChildren, useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TooltipWrapProps {
  content: React.ReactNode
  asChild?: boolean
  className?: string
  size?: "sm" | "md"
  alwaysShow?: boolean
}

export function TooltipWrap({
  asChild,
  children,
  content,
  className,
  size = "md",
  alwaysShow = false,
}: PropsWithChildren<TooltipWrapProps>) {
  const [open, setOpen] = useState(false)
  if (!content) {
    return children
  }

  return (
    <Tooltip open={open || alwaysShow} onOpenChange={setOpen}>
      <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
      <TooltipContent
        className={cn("max-w-xs", size === "sm" && "px-2 py-1.5", className)}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  )
}

export function TooltipWrapInfo({
  content,
  tooltipClassName,
  tooltipSize,
  asChild,

  className,
  size,
  ...props
}: LucideProps & {
  content: React.ReactNode
  tooltipSize?: TooltipWrapProps["size"]
  tooltipClassName?: string
  asChild?: boolean
}) {
  return (
    <TooltipWrap
      content={content}
      size={tooltipSize}
      className={tooltipClassName}
      asChild={asChild}
    >
      <Info
        size={size || 16}
        className={cn("inline-block mb-0.5", className)}
        {...props}
      />
    </TooltipWrap>
  )
}

type TooltipWrapNumberProps = Pick<TooltipWrapProps, "asChild"> & {
  amount: number | string
  prefix?: string
  className?: string
  format?: FormatNumberOption
}

export function TooltipWrapNumber(props: TooltipWrapNumberProps) {
  return (
    <TooltipWrap
      content={formatNumber(props.amount, { maximumFractionDigits: 10 })}
      size={"sm"}
      asChild={props.asChild}
    >
      {props.prefix}
      <NumberFlow
        value={Number(props.amount)}
        format={{ maximumFractionDigits: 2, ...props.format }}
        className={cn("inline-block", props.className)}
      />
    </TooltipWrap>
  )
}
