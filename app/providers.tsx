"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  darkTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";
import {
  argentWallet,
  coinbaseWallet,
  imTokenWallet,
  ledgerWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

import type React from "react";
import { WagmiProvider, createConfig } from "wagmi";
import { http } from "viem"; // Needed for defining transport
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "tcopresale";

if (!walletConnectProjectId) {
  throw new Error("You need to provide NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable");
}

// Define wallet connectors correctly
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, coinbaseWallet, walletConnectWallet],
    },
  ],
  {
    appName: "My RainbowKit App",
    projectId: walletConnectProjectId,
  }
);

export const config = createConfig({
  connectors,
  chains: [sepolia], // Define supported chains
  transports: {
    [sepolia.id]: http(), // Set the correct transport for Sepolia
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact" // Options: "wide", "compact"
          theme={darkTheme({
            accentColor: "rgba(255, 255, 255, 0.2)",
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
