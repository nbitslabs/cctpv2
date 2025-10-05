import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shortenAddress(address: string, chars = 4, separator = "...") {
  return `${address.slice(0, chars + 2)}${separator}${address.slice(-chars)}`
}

export type FormatNumberOption = {
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  useGrouping?: boolean
}

export function formatNumber(
  value: number | string = "0.0",
  decimals?: FormatNumberOption
) {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    useGrouping,
  } = decimals || {}
  const factor = Math.pow(10, maximumFractionDigits)
  const truncatedValue = Math.floor(Number(value) * factor) / factor
  return truncatedValue.toLocaleString("en-US", {
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping,
  })
}

export const correction = 10 ** 12

/**
 * @description Parse a number to a number with a correction factor to prevent weird floating point issues
 * @param value - The value to parse
 * @param cor - The correction factor, default is 10^12
 * @returns The parsed number
 */
export function parseNumber(value: number | string) {
  if (typeof value === "string") {
    value = Number(value)
  }
  return Math.trunc(value * correction) / correction
}

export function intervalAsyncWithTimeout(
  interval: number,
  timeout: number,
  trigger: () => void,
  conditionToResolve: () => boolean | undefined
) {
  return new Promise<boolean>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId)
      reject(new Error("Network switch timeout"))
    }, timeout)

    const intervalId = setInterval(async () => {
      const result = conditionToResolve()
      if (result !== undefined) {
        clearInterval(intervalId)
        clearTimeout(timeoutId)
        resolve(result)
      }
    }, interval)

    trigger()
  })
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
