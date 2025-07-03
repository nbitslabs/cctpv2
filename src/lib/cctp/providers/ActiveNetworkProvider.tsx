"use client";

import { createContext, useContext, useState } from "react";
import {
  CctpNetworkAdapter,
  CctpNetworkAdapterId,
  findNetworkAdapter,
  networkAdapters,
} from "../networks";
import {
  useAppKit,
  useAppKitConnections,
  useAppKitEvents,
  useAppKitNetwork,
} from "@reown/appkit/react";
import { networks } from "@/lib/wagmi/config";
import { delay, intervalAsyncWithTimeout } from "@/lib/utils";
import { toast } from "sonner";

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
  const { switchNetwork, caipNetwork } = useAppKitNetwork();
  const { connections } = useAppKitConnections();
  const { open } = useAppKit();
  const appkitEvents = useAppKitEvents();
  const [activeNetwork, setActiveNetworkState] = useState<CctpNetworkAdapter>();

  const setActiveNetwork: ActiveNetworkContextType["setActiveNetwork"] = async (
    networkId
  ) => {
    const appkitNetwork = networks.find(
      (n) => n.id.toString() === networkId.toString()
    );

    if (appkitNetwork?.id.toString() === networkId.toString()) {
      const selected = findNetworkAdapter(networkId);
      setActiveNetworkState(selected);
      return selected!;
    }

    if (!appkitNetwork) throw new Error(`Network ${networkId} not found`);
    const successfulSwitched = await intervalAsyncWithTimeout(
      500,
      30 * 1000,
      () => switchNetwork(appkitNetwork),
      () => {
        if (appkitEvents.data.event === "SWITCH_NETWORK") {
          if (appkitEvents.data.address) return true;
          return false;
        }
        return undefined;
      }
    );

    if (!successfulSwitched) {
      toast.warning(
        "No connected account found after network switch. Please connect wallet and try again."
      );
      await delay(1000);
      open({ namespace: caipNetwork?.chainNamespace });
      throw new Error("No connected account found after network switch");
    }

    const selected = findNetworkAdapter(caipNetwork?.id) ?? networkAdapters[0];
    setActiveNetworkState(selected);
    return selected;
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
