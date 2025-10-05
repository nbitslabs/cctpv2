"use client"

import * as React from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const AlertDialogContext = React.createContext<
  (
    params: AlertAction
  ) => Promise<
    AlertAction["type"] extends "alert" | "confirm" ? boolean : null | string
  >
>(() => null!)

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"

const defaultCancelButtonText: string = "Cancel"
const defaultActionButtonText: string = "Okay"

type BaseAlertAction<T> = T & {
  title: string
  body?: React.ReactNode
  cancelButton?: string
  cancelButtonVariant?: ButtonVariant
  bodyClassName?: string
  footerClassName?: string
}

export type AlertAction =
  | BaseAlertAction<{ type: "alert" }>
  | BaseAlertAction<{
      type: "confirm"
      actionButton?: string
      actionButtonVariant?: ButtonVariant
    }>
  | BaseAlertAction<{
      type: "prompt"
      actionButton?: string
      defaultValue?: string
      actionButtonVariant?: ButtonVariant
      inputProps?: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >
    }>
  | { type: "close" }

interface AlertDialogState {
  open: boolean
  title: string
  body: React.ReactNode
  type: "alert" | "confirm" | "prompt"
  cancelButton: string
  actionButton: string
  cancelButtonVariant: ButtonVariant
  actionButtonVariant: ButtonVariant
  defaultValue?: string
  bodyClassName?: string
  footerClassName?: string
  inputProps?: React.PropsWithoutRef<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  >
}

export function alertDialogReducer(
  state: AlertDialogState,
  action: AlertAction
): AlertDialogState {
  switch (action.type) {
    case "close":
      return { ...state, open: false }
    case "alert":
    case "confirm":
    case "prompt":
      return {
        ...state,
        open: true,
        ...action,
        cancelButton:
          action.cancelButton ||
          (action.type === "alert"
            ? defaultActionButtonText
            : defaultCancelButtonText),
        actionButton:
          ("actionButton" in action && action.actionButton) ||
          defaultActionButtonText,
        cancelButtonVariant: action.cancelButtonVariant || "outline",
        actionButtonVariant:
          ("actionButtonVariant" in action && action.actionButtonVariant) ||
          "default",
      }
    default:
      return state
  }
}

export function AlertDialogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = React.useReducer(alertDialogReducer, {
    open: false,
    title: "",
    body: "",
    type: "alert",
    cancelButton: defaultCancelButtonText,
    actionButton: defaultActionButtonText,
    cancelButtonVariant: "outline",
    actionButtonVariant: "default",
    footerClassName: "",
  })

  const resolveRef = React.useRef<(tf: unknown) => void>(null)

  function close() {
    dispatch({ type: "close" })
    resolveRef.current?.(false)
  }

  function confirm(value?: string) {
    dispatch({ type: "close" })
    resolveRef.current?.(value ?? true)
  }

  const dialog = React.useCallback(async <T extends AlertAction>(params: T) => {
    dispatch(params)

    return new Promise<
      T["type"] extends "alert" | "confirm" ? boolean : null | string
    >((resolve) => {
      resolveRef.current = resolve as (tf: unknown) => void
    })
  }, [])

  return (
    <AlertDialogContext.Provider value={dialog}>
      {children}
      <AlertDialog open={state.open} onOpenChange={(open) => !open && close()}>
        <AlertDialogContent asChild className={"max-w-md rounded-2xl"}>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              confirm(event.currentTarget.prompt?.value)
            }}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>{state.title}</AlertDialogTitle>
              {state.body ? (
                <AlertDialogDescription
                  className={"max-h-[68vh] overflow-auto"}
                >
                  {state.body}
                </AlertDialogDescription>
              ) : null}
            </AlertDialogHeader>
            {state.type === "prompt" && (
              <Input
                name="prompt"
                defaultValue={state.defaultValue}
                {...state.inputProps}
              />
            )}
            <AlertDialogFooter className={state.footerClassName}>
              {state.type === "alert" ? null : (
                <Button type="submit" variant={state.actionButtonVariant}>
                  {state.actionButton}
                </Button>
              )}
              <Button
                type="button"
                onClick={close}
                variant={state.cancelButtonVariant}
              >
                {state.cancelButton}
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialogContext.Provider>
  )
}

type Params<T extends "alert" | "confirm" | "prompt"> =
  | Omit<Extract<AlertAction, { type: T }>, "type">
  | string

export function useConfirm() {
  const dialog = React.useContext(AlertDialogContext)

  return React.useCallback(
    (params: Params<"confirm">) => {
      return dialog({
        ...(typeof params === "string" ? { title: params } : params),
        type: "confirm",
      }) as Promise<boolean | null>
    },
    [dialog]
  )
}

export function usePrompt() {
  const dialog = React.useContext(AlertDialogContext)

  return (params: Params<"prompt">) =>
    dialog({
      ...(typeof params === "string" ? { title: params } : params),
      type: "prompt",
    })
}

export function useAlert() {
  const dialog = React.useContext(AlertDialogContext)
  return (params: Params<"alert">) =>
    dialog({
      ...(typeof params === "string" ? { title: params } : params),
      type: "alert",
    })
}
