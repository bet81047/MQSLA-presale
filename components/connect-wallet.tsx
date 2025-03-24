"use client"

import { useRouter } from "next/navigation"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useEffect, useState } from "react"

// Mock data - would come from your contract in a real implementation
const ADMIN_WALLET = "0x40eDDa0874B30463a0B4dCebb87467E959267407"

export default function WalletConnect() {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if connected wallet is admin
    // In a real app, you'd check if the connected address matches the admin address
    if (isConnected && address) {
      // For demo purposes, we'll just check if the address exists
      // In a real app, you'd compare with the actual admin address
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }, [address, isConnected])

  const goToAdmin = () => {
    if (isAdmin) {
      router.push("/admin")
    }
  }

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading"
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated")

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full shadow-[0_0_10px_rgba(0,195,255,0.3)] px-4 py-2 font-medium"
                  >
                    Connect Wallet
                  </button>
                )
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-2 font-medium"
                  >
                    Wrong network
                  </button>
                )
              }

              return (
                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <button
                      onClick={goToAdmin}
                      className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-full px-3 py-1.5 text-sm font-medium"
                    >
                      Admin
                    </button>
                  )}
                  <button
                    onClick={openChainModal}
                    className="bg-blue-600/40 border border-cyan-400/30 text-white hover:bg-blue-600/60 rounded-full px-3 py-1.5 text-sm font-medium flex items-center gap-1"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: "hidden",
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl || "/placeholder.svg"}
                            style={{ width: 16, height: 16 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    className="bg-blue-600/40 border border-cyan-400/30 text-white hover:bg-blue-600/60 rounded-full px-3 py-1.5 text-sm font-medium"
                  >
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ""}
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}







// "use client"

// import { ConnectButton } from "@rainbow-me/rainbowkit"
// export function ConnectWallet() {

//   return (
//     <ConnectButton.Custom>
//       {({ account, chain, openConnectModal, openAccountModal, authenticationStatus, mounted }) => {
//         const ready = mounted && authenticationStatus !== "loading";
//         const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

//         return (
//           <button
//             onClick={connected ? openAccountModal : openConnectModal} // Show modal depending on connection status
//             type="button"
//             className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 text-white border-none rounded-full"
//           >
//             {connected ? (
//               <span>{account.displayName}</span>
//             ) : (
//               "Connect Wallet"
//             )}
//           </button>
//         );
//       }}
//     </ConnectButton.Custom>
//   );
// }