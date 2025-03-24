"use client"

import { useState } from "react"
import { Suspense } from "react"
import PresaleCard from "@/components/presale-card"
import ClaimCard from "@/components/claim-card"
import { HexBackground } from "@/components/hex-background"
import { Navbar } from "@/components/navbar"

export default function Home() {
  const [activeCard, setActiveCard] = useState<"presale" | "claim">("presale")

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900 flex flex-col items-center justify-start p-0">
      <HexBackground />

      <Navbar onNavChange={setActiveCard} activeCard={activeCard} />

      <div className="container max-w-6xl mx-auto z-10 flex flex-col items-center justify-center p-4 md:p-8 mt-28">
        <div className="w-full max-w-xl transition-all duration-500 ease-in-out">
          {activeCard === "presale" ? (
            <Suspense fallback={<div className="h-[500px] rounded-lg bg-blue-800/20 animate-pulse"></div>}>
              <div className="animate-slide-in-right">
                <PresaleCard />
              </div>
            </Suspense>
          ) : (
            <Suspense fallback={<div className="h-[500px] rounded-lg bg-blue-800/20 animate-pulse"></div>}>
              <div className="animate-slide-in-right">
                <ClaimCard />
              </div>
            </Suspense>
          )}
        </div>
      </div>
    </main>
  )
}

