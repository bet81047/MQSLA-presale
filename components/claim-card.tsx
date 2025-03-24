"use client"

import { Button } from "@/components/ui/button"
import { Coins, Gift } from "lucide-react"

// Mock data - would come from your contract in a real implementation
const TOKEN_SYMBOL = "TKN"
const CLAIMABLE_TOKENS = 5000
const CLAIMED_TOKENS = 2000
const NEXT_CLAIM_DATE = new Date("2025-04-15T00:00:00Z")

export default function ClaimCard() {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="presale-card-shape blue-gradient glow-effect overflow-hidden relative">
      <div className="card-outline"></div>
      <div className="relative p-8 z-10">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center glow-text">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(0,195,255,0.5)]">
            <Gift className="w-5 h-5 text-white" />
          </div>
          Token Claim
        </h2>

        <div className="mb-8">
          <div className="bg-blue-600/40 rounded-lg p-4 border border-cyan-400/30 mb-4 glow-border">
            <div className="text-sm text-cyan-100 mb-1">Claimable Tokens</div>
            <div className="text-2xl font-bold text-white flex items-center glow-text">
              <Coins className="w-5 h-5 mr-2 text-cyan-400" />
              {CLAIMABLE_TOKENS.toLocaleString()} {TOKEN_SYMBOL}
            </div>
          </div>

          <div className="bg-blue-600/40 rounded-lg p-4 border border-cyan-400/30 glow-border">
            <div className="text-sm text-cyan-100 mb-1">Already Claimed</div>
            <div className="text-2xl font-bold text-white flex items-center glow-text">
              <Coins className="w-5 h-5 mr-2 text-cyan-400" />
              {CLAIMED_TOKENS.toLocaleString()} {TOKEN_SYMBOL}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-sm text-cyan-100 mb-2">Next Claim Date</div>
          <div className="bg-blue-600/40 rounded-lg p-4 border border-cyan-400/30 glow-border">
            <div className="text-lg font-medium text-white">{formatDate(NEXT_CLAIM_DATE)}</div>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-bold py-6 rounded-lg glow-effect">
          Claim Tokens
        </Button>
      </div>
    </div>
  )
}

