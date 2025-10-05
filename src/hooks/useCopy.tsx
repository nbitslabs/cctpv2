import { useState } from "react"
import { useCopyToClipboard } from "usehooks-ts"
import { delay } from "@/lib/utils"

export function useCopy() {
  const [copyingContent, copy] = useCopyToClipboard()
  const [copied, setCopied] = useState(false)

  const copyAsync = async (text: string) => {
    copy(text)
    setCopied(true)
    await delay(1000)
    setCopied(false)
  }
  return { copied, copy: copyAsync, copyingContent }
}
