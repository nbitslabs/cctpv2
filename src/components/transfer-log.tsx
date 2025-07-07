"use client";

import { Logs } from "lucide-react";
import { useEffect, useRef } from "react";

export function TransferLog({ logs }: { logs: React.ReactNode[] }) {
  const logsEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logsEndRef.current && containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 100;

      if (isNearBottom) {
        logsEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [logs]);

  return (
    <div
      ref={containerRef}
      className="w-full mt-8 p-4 bg-background rounded-lg h-64 overflow-y-auto"
    >
      <ul className="text-sm font-mono text-muted-foreground">
        {logs.length > 0 ? (
          logs
        ) : (
          <li className="text-center py-8 flex flex-col items-center gap-1">
            <Logs className="size-8" />
            Your transaction logs will appear here.
          </li>
        )}
        <div ref={logsEndRef} />
      </ul>
    </div>
  );
}
