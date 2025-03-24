"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data - would come from your wallet connection in a real implementation
const ADMIN_WALLET = "0x1234...5678"

export default function WalletConnect() {
  const router = useRouter()
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const connectWallet = () => {
    // Mock wallet connection - would use ethers.js or web3.js in a real implementation
    setIsConnected(true)
    setWalletAddress(ADMIN_WALLET)
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress("")
  }

  const goToAdmin = () => {
    router.push("/admin")
  }

  const formatAddress = (address: string) => {
    if (!address) return ""
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <>
      {isConnected ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-blue-600/40 border-cyan-400/30 text-white hover:bg-blue-600/60 rounded-full"
            >
              <Wallet className="mr-2 h-4 w-4" />
              {formatAddress(walletAddress)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-blue-900 border-cyan-400/30 text-white">
            <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-cyan-700" />
            <DropdownMenuItem className="cursor-pointer hover:bg-blue-800" onClick={goToAdmin}>
              Admin Panel
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-blue-800" onClick={disconnectWallet}>
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={connectWallet}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full shadow-[0_0_10px_rgba(0,195,255,0.3)]"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      )}
    </>
  )
}

