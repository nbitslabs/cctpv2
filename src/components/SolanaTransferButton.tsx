import { useSolanaSigner } from "@/hooks/useSolanaSigner";
import { Button, ButtonProps } from "./ui/button";
import { TransactionSigner } from "gill";

export default function SolanaTransferButton({
  onClick,
  ...props
}: Omit<ButtonProps, "onClick"> & {
  onClick: (solanaSigner?: TransactionSigner) => void;
}) {
  const solanaSigner = useSolanaSigner();
  return <Button onClick={() => onClick(solanaSigner)} {...props} />;
}
