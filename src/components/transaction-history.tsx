"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Alchemy } from "@/lib/alchemy/type";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { useAppKitAccount } from "@reown/appkit/react";
import Image from "next/image";
import ExternalLink from "./ui2/ExternalLink";
import CopyIconTooltip from "./ui2/CopyIconTooltip";

const ITEMS_PER_PAGE = 5;

export default function TransactionHistory({
  transactions,
  isLoading,
  explorerUrl,
}: {
  transactions: Alchemy.Transfer[] | undefined;
  isLoading?: boolean;
  explorerUrl: string;
}) {
  const { address } = useAppKitAccount();
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const totalPages = Math.ceil((transactions?.length ?? 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTransactions = transactions?.slice(startIndex, endIndex);
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center gap-0 font-semibold text-sm cursor-pointer">
        Transaction History
        <ChevronRight className={cn("size-4", isOpen && "rotate-90")} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Table className="rounded-md overflow-hidden mt-2">
          <TableCaption className="my-1 text-xs">
            *Only USDC, ETH transactions are shown
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-primary/5 *:h-8">
              <TableHead>Hash</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  <div className="flex justify-center items-center h-20">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : transactions && transactions.length > 0 ? (
              currentTransactions?.map((tx) => {
                const fromMe = tx.from.toLowerCase() === address?.toLowerCase();
                const youOrLink = (addressToCheck: string) => (
                  <div className="flex items-center gap-1">
                    <ExternalLink
                      href={`${explorerUrl}/address/${addressToCheck}`}
                      className="hover:underline"
                    >
                      {addressToCheck.toLowerCase() ===
                      address?.toLowerCase() ? (
                        <Button variant="outline" size={"sm"}>
                          You
                        </Button>
                      ) : (
                        `${addressToCheck.slice(0, 6)}...${addressToCheck.slice(-4)}`
                      )}
                    </ExternalLink>
                    <CopyIconTooltip text={addressToCheck} />
                  </div>
                );
                return (
                  <TableRow key={tx.uniqueId}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-1">
                        <ExternalLink
                          href={`${explorerUrl}/tx/${tx.hash}`}
                          className={cn(
                            "hover:underline flex items-center gap-1",
                            fromMe ? "text-red-600" : "text-green-600"
                          )}
                        >
                          {fromMe ? (
                            <ArrowUp className="size-4" />
                          ) : (
                            <ArrowDown className="size-4" />
                          )}
                          {`${tx.hash.slice(0, 6)}...${tx.hash.slice(-4)}`}
                        </ExternalLink>
                        <CopyIconTooltip text={tx.hash} />
                      </div>
                    </TableCell>
                    <TableCell>{youOrLink(tx.from)}</TableCell>
                    <TableCell>{youOrLink(tx.to)}</TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex justify-end items-center gap-1 pl-2">
                        {formatNumber(tx.value, { maximumFractionDigits: 4 })}{" "}
                        <Image
                          src={`/images/tokens/${tx.asset}.png`}
                          alt={tx.asset}
                          width={14}
                          height={14}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  <p className="text-muted-foreground">
                    No transactions found.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {transactions && transactions.length > 0 && (
          <Pagination>
            <PaginationContent className="text-sm w-full bg-foreground/5 rounded-b">
              <PaginationItem>
                <span className="p-1 pb-2 text-muted-foreground">
                  Page <strong className="text-primary">{currentPage}</strong>{" "}
                  of {totalPages}
                </span>
              </PaginationItem>

              <Button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                variant="ghost"
                size={"iconSm"}
                className="ml-auto"
              >
                <ChevronLeft />
              </Button>

              <PaginationItem>
                <Button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  variant="ghost"
                  size={"iconSm"}
                >
                  <ChevronRight />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
