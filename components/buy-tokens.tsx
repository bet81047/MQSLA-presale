"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription} from "@/components/ui/alert"
import { AlertCircle} from "lucide-react"
import { cn } from "@/lib/utils"

import toast from "react-hot-toast"
import { multicall, readContract } from '@wagmi/core'
import { useAccount, useChainId, useWalletClient } from "wagmi"
import { ethers } from "ethers"

import { Address, erc20Abi, formatEther, formatUnits, parseUnits } from 'viem';
import { EVM_PRESALE_ADDRESS, EVM_BUSD_ADDRESS, EVM_USDC_ADDRESS, EVM_USDT_ADDRESS, web3Clients} from "@/config/constants"
import { config } from "../app/providers"
import PresaleAbi from "@/config/PresaleABI.json"
import { TokenAbi } from "@/config/token_abi"
import { usePresaleEvm } from "@/hooks/useEvmPresale";

interface BuyTokensProps {
  tokenSymbol: string
  tokenPrice: string
}

type PaymentMethod = "BUSD" | "USDC" | "USDT"

export function BuyTokens({ tokenSymbol, tokenPrice }: BuyTokensProps) {
  const [loading, setLoading] = useState(false)

  const { data: walletClient } = useWalletClient()
  const [amount, setAmount] = useState<string>("")

  const { address, isConnected } = useAccount()
  const [slidePage, setSlidepage] = useState(0);
  // const calculateTokens = () => {
  //   if (!amount) return "0"
  //   const ethAmount = Number.parseFloat(amount)
  //   return (ethAmount * 1000).toLocaleString()
  // }
  const { buyTokenWithUsdcOnEvm, buyTokenWithUsdtOnEvm } = usePresaleEvm();
  

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("USDT")
  const [payAmount, setPayAmount] = useState<string>("")
  const [receiveAmount, setReceiveAmount] = useState<string>("")
  const [balance, setBalance] = useState<Record<PaymentMethod, number>>({
    BUSD: 1250,
    USDC: 750,
    USDT: 500,
  })
  const [error, setError] = useState<string | null>(null)

  // Handle pay amount change
  const handlePayAmountChange = (value: string) => {
    setPayAmount(value)

    if (!value || isNaN(Number.parseFloat(value))) {
      setReceiveAmount("")
      setError(null)
      return
    }

    const numValue = Number.parseFloat(value)

    if (numValue > balance[paymentMethod]) {
      setError("Insufficient funds")
    } else {
      setError(null)
    }

    // Calculate tokens to receive
    const tokensToReceive = numValue / (Number)(tokenPrice)
    setReceiveAmount(tokensToReceive.toFixed(2))
  }

  // Handle receive amount change
  const handleReceiveAmountChange = (value: string) => {
    setReceiveAmount(value)

    if (!value || isNaN(Number.parseFloat(value))) {
      setPayAmount("")
      setError(null)
      return
    }

    // Calculate payment amount
    const numValue = Number.parseFloat(value)
    const paymentAmount = numValue * (Number(tokenPrice))
    setPayAmount(paymentAmount.toFixed(2))

    if (paymentAmount > balance[paymentMethod]) {
      setError("Insufficient funds")
    } else {
      setError(null)
    }
  }


  const handleBuy = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first.")
      return
    }
    setLoading(true)
    let res;
    if(paymentMethod === "USDC"){
      res = await buyTokenWithUsdcOnEvm(11155111, Number.parseFloat(payAmount));
    } 
    else if (paymentMethod === "USDT") {
      res = await buyTokenWithUsdtOnEvm(11155111, Number.parseFloat(payAmount));
    }
    

  }

  // Fetch Currency Balance
  useEffect(() => {
    console.log(`enter useEffect Fetch currency balance ${address}`)
    async function fetchEvmCurrencyBalances() {
      if (!address) {
        return;
      }
      let accountBalance = await web3Clients[11155111].eth.getBalance(address);
      const nativeBalance = Number(formatEther(accountBalance));
      console.log(`nativeBalance ${nativeBalance}`)
      const mulResult = await multicall(config, {
        contracts: [
          {
            address: EVM_BUSD_ADDRESS[11155111].address as `0x${string}`,
            abi: TokenAbi,
            functionName: 'balanceOf',
            args: [address]
          },
          {
            address: EVM_BUSD_ADDRESS[11155111].address as `0x${string}`,
            abi: TokenAbi,
            functionName: 'decimals',
            args: []
          },
          {
            address: EVM_USDC_ADDRESS[11155111].address as `0x${string}`,
            abi: TokenAbi,
            functionName: 'balanceOf',
            args: [address]
          },
          {
            address: EVM_USDC_ADDRESS[11155111].address as `0x${string}`,
            abi: TokenAbi,
            functionName: 'decimals',
            args: []
          },
          {
            address: EVM_USDT_ADDRESS[11155111].address as `0x${string}`,
            abi: TokenAbi,
            functionName: 'balanceOf',
            args: [address]
          },
          {
            address: EVM_USDT_ADDRESS[11155111].address as `0x${string}`,
            abi: TokenAbi,
            functionName: 'decimals',
            args: []
          },
        ],
      })
      let busdBalance = 0;
      let usdcBalance = 0;
      let usdtBalance = 0;
      console.log(`mulResult[0] ${mulResult[0].result}`)
      if (mulResult[0]?.result && mulResult[1]?.result && mulResult[2]?.result && mulResult[3]?.result && mulResult[4]?.result && mulResult[5]?.result) {
        busdBalance = Number(formatUnits(mulResult[0].result, mulResult[1].result));
        usdcBalance = Number(formatUnits(mulResult[2].result, mulResult[3].result));
        usdtBalance = Number(formatUnits(mulResult[4].result, mulResult[5].result));
      }
      setBalance({
        BUSD: busdBalance,
        USDC: usdcBalance,
        USDT: usdtBalance,
      });
    }
    fetchEvmCurrencyBalances();
  }, [address, paymentMethod]);


  return (
    <div className="mb-8">
      {/* Token Price */}
      <div className="flex items-center justify-between mb-6 bg-blue-600/30 p-3 rounded-lg border border-cyan-400/30 glow-border">
          <div className="flex items-center">
            <div className="w-16 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center mr-2">
              <span className="text-xs font-bold text-white">{ tokenSymbol }</span>
            </div>
            <span className="text-white">Token Price</span>
          </div>
          <div className="text-white font-bold glow-text">${tokenPrice}</div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <div className="text-sm text-cyan-100 mb-2">Payment Method</div>
          <Tabs defaultValue="USDT" onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
            <TabsList className="grid grid-cols-3 bg-blue-700/40 p-1">
              {["BUSD", "USDC", "USDT"].map((method) => (
                <TabsTrigger
                  key={method}
                  value={method}
                  className={cn(
                    "data-[state=active]:bg-cyan-500 data-[state=active]:text-white",
                    "data-[state=inactive]:text-cyan-100",
                  )}
                >
                  {method}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="mt-2 text-sm text-right text-cyan-100">
              Balance: {balance[paymentMethod]} {paymentMethod}
            </div>
          </Tabs>
        </div>

        {/* Input Fields */}
        <div className="grid gap-4 mb-6">
          <div>
            <div className="text-sm text-cyan-100 mb-2">You Pay</div>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={payAmount}
                onChange={(e) => handlePayAmountChange(e.target.value)}
                className="bg-blue-600/30 border-cyan-400/30 text-white pr-16 glow-border"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-100">{paymentMethod}</div>
            </div>
          </div>

          <div>
            <div className="text-sm text-cyan-100 mb-2">You Receive</div>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={receiveAmount}
                onChange={(e) => handleReceiveAmountChange(e.target.value)}
                className="bg-blue-600/30 border-cyan-400/30 text-white pr-16 glow-border"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-100">{ tokenSymbol }</div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-6 bg-red-900/30 border-red-500/30">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Buy Button */}
        <Button
          onClick={handleBuy}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-bold py-6 rounded-lg glow-effect"
          disabled={!!error || !payAmount}
        >
          Buy Tokens
        </Button>
    </div>
  )
}

