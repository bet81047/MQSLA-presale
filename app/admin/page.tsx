"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, DollarSign, Settings, Users } from "lucide-react"
import { HexBackground } from "@/components/hex-background"

// Mock data - would come from your contract in a real implementation
const ADMIN_WALLET = "0x40eDDa0874B30463a0B4dCebb87467E959267407"
const TOKEN_SYMBOL = "MQSLA"
const PRESALE_END_DATE = new Date("2025-06-01T00:00:00Z")
const TOKENS_RAISED = 2500000
const TOKENS_GOAL = 5000000
const TOKEN_PRICE = 0.05

// Mock user data
const MOCK_USERS = Array(25)
  .fill(0)
  .map((_, i) => ({
    id: i + 1,
    wallet: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
    tokens: Math.floor(Math.random() * 10000),
    value: Math.floor(Math.random() * 5000),
    date: `Mar ${Math.floor(Math.random() * 30) + 1}, 2025`,
  }))

export default function AdminPage() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5

  // Calculate pagination
  const totalPages = Math.ceil(MOCK_USERS.length / usersPerPage)
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = MOCK_USERS.slice(indexOfFirstUser, indexOfLastUser)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Check if wallet is connected and authorized
  useEffect(() => {
    // Mock authorization check - would use ethers.js or web3.js in a real implementation
    const checkAuthorization = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll just set to true
      // In a real app, you'd check if the connected wallet matches the admin wallet
      setIsAuthorized(true)
      setIsLoading(false)
    }

    checkAuthorization()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center p-4">
        <div className="presale-card-shape blue-gradient max-w-md w-full glow-effect relative">
          <div className="card-outline"></div>
          <div className="p-8 relative z-10">
            <h2 className="text-xl font-bold text-white mb-4">Access Denied</h2>
            <p className="text-cyan-100 mb-6">You don't have permission to access this page</p>
            <Button
              onClick={() => router.push("/")}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-bold py-4 rounded-lg glow-effect"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900 p-4 md:p-8">
      <HexBackground />
      <div className="container max-w-6xl mx-auto z-10 relative">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="bg-blue-600/40 border-cyan-400/30 text-white hover:bg-blue-600/60 glow-border"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Presale
          </Button>
          <h1 className="text-2xl font-bold text-white glow-text">Admin Panel</h1>
        </div>

        <Tabs defaultValue="presale" className="w-full">
          <TabsList className="grid grid-cols-3 bg-blue-700/40 p-1 mb-6">
            <TabsTrigger
              value="presale"
              className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=inactive]:text-cyan-100"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Presale
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=inactive]:text-cyan-100"
            >
              <Users className="mr-2 h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=inactive]:text-cyan-100"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="presale">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="presale-card-shape blue-gradient glow-effect relative">
                <div className="card-outline"></div>
                <div className="p-8 relative z-10">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center glow-text">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Presale Status
                  </h2>
                  <p className="text-cyan-100 mb-6">Manage your presale settings</p>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="token-price" className="text-cyan-100">
                        Token Price (USD)
                      </Label>
                      <Input
                        id="token-price"
                        type="number"
                        defaultValue={TOKEN_PRICE}
                        className="bg-blue-600/30 border-cyan-400/30 text-white glow-border"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="presale-end" className="text-cyan-100">
                        Presale End Date
                      </Label>
                      <Input
                        id="presale-end"
                        type="datetime-local"
                        defaultValue={PRESALE_END_DATE.toISOString().slice(0, 16)}
                        className="bg-blue-600/30 border-cyan-400/30 text-white glow-border"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="tokens-goal" className="text-cyan-100">
                        Tokens Goal
                      </Label>
                      <Input
                        id="tokens-goal"
                        type="number"
                        defaultValue={TOKENS_GOAL}
                        className="bg-blue-600/30 border-cyan-400/30 text-white glow-border"
                      />
                    </div>

                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white mt-2 glow-effect">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>

              <div className="presale-card-shape blue-gradient glow-effect relative">
                <div className="card-outline"></div>
                <div className="p-8 relative z-10">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center glow-text">
                    <Clock className="mr-2 h-5 w-5" />
                    Presale Statistics
                  </h2>
                  <p className="text-cyan-100 mb-6">Current presale performance</p>
                  <div className="grid gap-4">
                    <div className="bg-blue-600/40 rounded-lg p-4 border border-cyan-400/30 glow-border">
                      <div className="text-sm text-cyan-100 mb-1">Tokens Raised</div>
                      <div className="text-2xl font-bold text-white glow-text">
                        {TOKENS_RAISED.toLocaleString()} {TOKEN_SYMBOL}
                      </div>
                      <div className="text-sm text-cyan-100 mt-1">
                        {((TOKENS_RAISED / TOKENS_GOAL) * 100).toFixed(2)}% of goal
                      </div>
                    </div>

                    <div className="bg-blue-600/40 rounded-lg p-4 border border-cyan-400/30 glow-border">
                      <div className="text-sm text-cyan-100 mb-1">Total Value</div>
                      <div className="text-2xl font-bold text-white glow-text">
                        ${(TOKENS_RAISED * TOKEN_PRICE).toLocaleString()}
                      </div>
                    </div>

                    <div className="bg-blue-600/40 rounded-lg p-4 border border-cyan-400/30 glow-border">
                      <div className="text-sm text-cyan-100 mb-1">Unique Contributors</div>
                      <div className="text-2xl font-bold text-white glow-text">127</div>
                    </div>

                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white glow-effect">
                      Export Data
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="presale-card-shape blue-gradient glow-effect relative">
              <div className="card-outline"></div>
              <div className="p-8 relative z-10">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center glow-text">
                  <Users className="mr-2 h-5 w-5" />
                  User Management
                </h2>
                <p className="text-cyan-100 mb-6">Manage presale participants</p>
                <div className="rounded-lg border border-cyan-400/30 overflow-hidden glow-border">
                  <table className="w-full text-sm">
                    <thead className="bg-blue-600/50">
                      <tr>
                        <th className="py-3 px-4 text-left text-cyan-100">Wallet Address</th>
                        <th className="py-3 px-4 text-left text-cyan-100">Tokens Purchased</th>
                        <th className="py-3 px-4 text-left text-cyan-100">Value (USD)</th>
                        <th className="py-3 px-4 text-left text-cyan-100">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-700/30">
                      {currentUsers.map((user) => (
                        <tr key={user.id} className="bg-blue-600/20 hover:bg-blue-600/40">
                          <td className="py-3 px-4 text-white">{user.wallet}</td>
                          <td className="py-3 px-4 text-white">
                            {user.tokens} {TOKEN_SYMBOL}
                          </td>
                          <td className="py-3 px-4 text-white">${user.value}</td>
                          <td className="py-3 px-4 text-cyan-100">{user.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white glow-effect disabled:opacity-50"
                  >
                    Previous
                  </Button>
                  <div className="text-cyan-100">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white glow-effect disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="presale-card-shape blue-gradient glow-effect relative">
              <div className="card-outline"></div>
              <div className="p-8 relative z-10">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center glow-text">
                  <Settings className="mr-2 h-5 w-5" />
                  Admin Settings
                </h2>
                <p className="text-cyan-100 mb-6">Configure admin access and security</p>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="admin-wallet" className="text-cyan-100">
                      Admin Wallet Address
                    </Label>
                    <Input
                      id="admin-wallet"
                      defaultValue={ADMIN_WALLET}
                      className="bg-blue-600/30 border-cyan-400/30 text-white glow-border"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="min-contribution" className="text-cyan-100">
                      Minimum Contribution (USD)
                    </Label>
                    <Input
                      id="min-contribution"
                      type="number"
                      defaultValue="50"
                      className="bg-blue-600/30 border-cyan-400/30 text-white glow-border"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="max-contribution" className="text-cyan-100">
                      Maximum Contribution (USD)
                    </Label>
                    <Input
                      id="max-contribution"
                      type="number"
                      defaultValue="10000"
                      className="bg-blue-600/30 border-cyan-400/30 text-white glow-border"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-cyan-100">Accepted Payment Methods</Label>
                    <div className="flex flex-wrap gap-2">
                      {["USDT", "USDC", "BUSD", "ETH", "BNB"].map((token) => (
                        <div key={token} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`token-${token}`}
                            defaultChecked={["USDT", "USDC", "BUSD"].includes(token)}
                            className="rounded border-cyan-400/50 bg-blue-600/30 text-cyan-500"
                          />
                          <Label htmlFor={`token-${token}`} className="text-white">
                            {token}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white mt-2 glow-effect">
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

