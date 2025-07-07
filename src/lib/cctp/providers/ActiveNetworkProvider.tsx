"use client";

import { createContext, useContext, useState } from "react";
import {
  CctpNetworkAdapter,
  CctpNetworkAdapterId,
  findNetworkAdapter,
  networkAdapters,
} from "../networks";
import { useAppKitNetwork } from "@reown/appkit/react";
import { networks } from "@/lib/wagmi/config";
import { delay } from "@/lib/utils";

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
  const { switchNetwork } = useAppKitNetwork();
  const [activeNetwork, setActiveNetworkState] = useState<CctpNetworkAdapter>();

  const setActiveNetwork: ActiveNetworkContextType["setActiveNetwork"] = async (
    networkId
  ) => {
    const appkitNetwork = networks.find(
      (n) => n.id.toString() === networkId.toString()
    );

    if (!appkitNetwork) throw new Error(`Network ${networkId} not found`);
    switchNetwork(appkitNetwork);
    // Workaround for async network switch
    await delay(500);
    const selected = findNetworkAdapter(networkId);
    setActiveNetworkState(selected);
    return selected!;

    // if (!appkitEvents.data.address) {
    //   toast.warning(
    //     "No connected account found after network switch. Please connect wallet and try again."
    //   );
    //   await delay(1000);
    //   open({ namespace: caipNetwork?.chainNamespace });
    //   throw new Error("No connected account found after network switch");
    // }
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
