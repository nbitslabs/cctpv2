"use client";

import { createContext, useContext, useState } from "react";
import {
  CctpNetworkAdapter,
  CctpNetworkAdapterId,
  findNetworkAdapter,
  networkAdapters,
} from "../networks";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { networks } from "@/lib/wagmi/config";
import { delay } from "@/lib/utils";
import { useWalletClient } from "wagmi";
import { addChain } from "viem/actions";
import { Chain, solana } from "@reown/appkit/networks";

export type ActiveNetworkContextType = {
  activeNetwork: CctpNetworkAdapter;
  setActiveNetwork: (
    networkId: CctpNetworkAdapterId
  ) => Promise<CctpNetworkAdapter>;
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
  const { isConnected } = useAppKitAccount();
  const { data: client } = useWalletClient();
  const { switchNetwork } = useAppKitNetwork();
  const [activeNetwork, setActiveNetworkState] = useState<CctpNetworkAdapter>();

  const setActiveNetwork: ActiveNetworkContextType["setActiveNetwork"] = async (
    networkId
  ) => {
    const appkitNetwork = networks.find(
      (n) => n.id.toString() === networkId.toString()
    );

    if (!appkitNetwork) throw new Error(`Network ${networkId} not found`);
    if (isConnected) {
      if (!client) throw new Error("No wallet client found");
      // There is no way to check if selected wallet has codex chain added, adding a delay 30s for the tries after first accepted
      if (appkitNetwork.id !== solana.id)
        await Promise.race([
          addChain(client, { chain: appkitNetwork as Chain }),
          delay(30_000),
        ]);
      switchNetwork(appkitNetwork);
      // Workaround for async network switch
      await delay(1000);
    }
    const selected = findNetworkAdapter(networkId);
    setActiveNetworkState(selected);
    return selected!;
  };

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
