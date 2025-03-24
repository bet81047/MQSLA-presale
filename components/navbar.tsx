"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import WalletConnect from "@/components/connect-wallet"

interface NavbarProps {
  onNavChange: (card: "presale" | "claim") => void
  activeCard: "presale" | "claim"
}

export function Navbar({ onNavChange, activeCard }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled ? "bg-blue-900/80 backdrop-blur-md shadow-lg" : "bg-transparent",
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 py-3">
        <div className="rounded-full bg-gradient-to-r from-blue-900/80 to-purple-900/80 backdrop-blur-sm border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)] px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center">
              <div className="w-20 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_10px_rgba(0,195,255,0.5)]">
                <span className="text-lg font-bold text-white">MQSLA</span>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavChange("presale")}
                className={cn(
                  "px-4 py-1.5 rounded-full transition-all duration-200",
                  activeCard === "presale"
                    ? "bg-cyan-500 text-white shadow-[0_0_10px_rgba(0,195,255,0.3)]"
                    : "text-cyan-100 hover:bg-blue-800/40",
                )}
              >
                Presale
              </button>
              <button
                onClick={() => onNavChange("claim")}
                className={cn(
                  "px-4 py-1.5 rounded-full transition-all duration-200",
                  activeCard === "claim"
                    ? "bg-cyan-500 text-white shadow-[0_0_10px_rgba(0,195,255,0.3)]"
                    : "text-cyan-100 hover:bg-blue-800/40",
                )}
              >
                Claim
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  )
}

