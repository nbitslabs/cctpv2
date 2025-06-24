import { useState } from 'react'

import { useCopyToClipboard } from 'usehooks-ts'

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

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
