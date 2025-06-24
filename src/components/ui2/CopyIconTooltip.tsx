"use client";
import { useCopy } from "@/hooks/useCopy";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CopyIcon } from "lucide-react";
import { PopoverProps } from "@radix-ui/react-popover";

export default function CopyIconTooltip({
  text,
  asChild,
  children = (
    <CopyIcon
      size={16}
      className="cursor-pointer text-muted-foreground hover:text-foreground"
    />
  ),
  ...props
}: {
  text: string;
  asChild?: boolean;
  children?: React.ReactNode;
} & PopoverProps) {
  const { copy, copied } = useCopy();

  return (
    <Popover open={copied}>
      <PopoverTrigger asChild={asChild} onClick={() => copy(text)} {...props}>
        {children}
      </PopoverTrigger>

      <PopoverContent
        className="px-2 py-1 w-fit text-neutral-500 text-xs"
        side="top"
      >
        <p>Copied!</p>
      </PopoverContent>
    </Popover>
  );
}
