"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  CctpNetworkAdapter,
  CctpNetworkAdapterId,
  networkAdapters,
} from "../networks";
import { switchChain } from "wagmi/actions";
import { wagmiConfig } from "@/lib/wagmi/config";

export type ActiveNetworkContextType = {
  activeNetwork: CctpNetworkAdapter;
  setActiveNetwork: (networkId: CctpNetworkAdapterId) => Promise<void>;
};

export const ActiveNetworkContext = createContext<ActiveNetworkContextType>(
  null as unknown as ActiveNetworkContextType
);

export function useActiveNetwork() {
  const context = useContext(ActiveNetworkContext);
  if (!context) {
    throw new Error(
      "useActiveNetwork must be used within an ActiveNetworkProvider"
    );
  }
  return context;
}

export function ActiveNetworkProvider({ children }: React.PropsWithChildren) {
  const [activeNetwork, setActiveNetworkState] = useState<CctpNetworkAdapter>();

  const setActiveNetwork = async (networkId: CctpNetworkAdapterId) => {
    const network = networkAdapters.find((adapter) => adapter.id === networkId);
    if (!network) throw new Error(`Network ${networkId} not found`);

    if (network.type === "evm") {
      await switchChain(wagmiConfig, { chainId: Number(networkId) });
    }
    setActiveNetworkState(network);
  };

  useEffect(() => {
    setActiveNetwork(networkAdapters[0].id);
  }, []);

  return (
    <ActiveNetworkContext.Provider
      value={{
        activeNetwork: activeNetwork || networkAdapters[0],
        setActiveNetwork,
      }}
    >
      {children}
    </ActiveNetworkContext.Provider>
  );
}
