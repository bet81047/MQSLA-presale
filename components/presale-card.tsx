"use client"

import { useState, useEffect ,useCallback } from "react"
import { DollarSign } from "lucide-react"

import { BuyTokens } from "@/components/buy-tokens"
import { CountdownTimer } from "@/components/countdown-timer"

import { ethers } from "ethers"
import { EVM_PRESALE_ADDRESS } from "@/config/constants";
import PresaleABI from "@/config/PresaleABI.json"

// Mock data - would come from your contract in a real implementation
const TOKEN_SYMBOL = "MQSLA"


export default function PresaleCard() {

  // @ai_crypto_guru_2025_03_22_fetch_contract_data
  const [isLoading, setIsLoading] = useState(true);

  const [totalDepositedBusdBalnace, setTotalDepositedBusdBalnace] = useState<number>(0);
  const [totalDepositedUsdcBalnace, setTotalDepositedUsdcBalnace] = useState<number>(0);
  const [totalDepositedUsdtBalnace, setTotalDepositedUsdtBalnace] = useState<number>(0);
  const [totalTokenSold, setTotalTokenSold] = useState<string>("0");
  const [stageInfo, setStageInfo] = useState({
    pricePerToken: "",
    nextPricePerToken: "",
    maxTokens: "",
    tokensSold: "",
    startTime: "",
    endTime: "",
    isPaused: false,
  });

  const [userInfo, setUserInfo] = useState(null);

  const RPC_URL = "https://sepolia.drpc.org"
  const fetchContractData = useCallback(async () => {
    try {
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const contract = new ethers.Contract(EVM_PRESALE_ADDRESS[11155111], PresaleABI, provider);
      
      // Make individual requests instead of using Promise.all
      const totalDepBusd = await contract.totalDepositedBusdBalance();
      const totalDepUsdc = await contract.totalDepositedUsdcBalance();
      const totalDepUsdt = await contract.totalDepositedUsdtBalance();
      const totalTokensSold = await contract.totalTokensSold();

      const info = await contract.stageInfo(3);
      setStageInfo({
        pricePerToken: ethers.formatUnits(info.pricePerToken, 4), // Convert to readable format
        nextPricePerToken: ethers.formatUnits(info.nextPricePerToken, 18), // Convert to readable format
        maxTokens: ethers.formatUnits(info.maxTokens, 18),
        tokensSold: ethers.formatUnits(info.tokensSold, 18),
        startTime: new Date(Number(info.startTime) * 1000).toLocaleString(),
        endTime: new Date(Number(info.endTime) * 1000).toLocaleString(),
        isPaused: info.isPaused,
      });
      setTotalDepositedBusdBalnace(totalDepBusd);
      setTotalDepositedUsdcBalnace(totalDepUsdc);
      setTotalDepositedUsdtBalnace(totalDepUsdt);
      setTotalTokenSold(ethers.formatUnits(totalTokensSold, 18));

    } catch (error) {
      console.error("Error fetching contract data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [])

  useEffect(() => {
    fetchContractData() // Fetch data immediately on component mount

    // Set up interval to fetch data every 1 minute
    const intervalId = setInterval(fetchContractData, 1 * 60 * 1000)

    // Clean up interval on component PaymentMethod
    return () => clearInterval(intervalId)
  }, [fetchContractData])

  const progressPercentage = (Number(stageInfo.tokensSold) / Number(stageInfo.maxTokens)) * 100

  return (
    <div className="presale-card-shape blue-gradient glow-effect overflow-hidden relative">
      <div className="card-outline"></div>
      <div className="relative p-8 z-10">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center glow-text">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center mr-3 shadow-[0_0_10px_rgba(0,195,255,0.5)]">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          Token Presale
        </h2>

        {/* Countdown Timer */}
        <CountdownTimer startDate={stageInfo.startTime} endDate={stageInfo.endTime} />

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-cyan-100">TOTAL BUSD RAISED:</span>
            <span className="text-sm text-cyan-100">
              ${ethers.formatUnits(totalDepositedBusdBalnace, 18).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-cyan-100">TOTAL USDT RAISED:</span>
            <span className="text-sm text-cyan-100">
              ${ethers.formatUnits(totalDepositedUsdtBalnace, 18).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-cyan-100">TOTAL USDC RAISED:</span>
            <span className="text-sm text-cyan-100">
              ${ethers.formatUnits(totalDepositedUsdcBalnace, 6).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-cyan-100">TOTAL TOKENS SOLD:</span>
            <span className="text-sm text-cyan-100">
              {totalTokenSold.toLocaleString()} {TOKEN_SYMBOL} 
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-cyan-100">Round Progress</span>
            <span className="text-sm text-cyan-100">
              {stageInfo.tokensSold.toLocaleString()} / {stageInfo.maxTokens.toLocaleString()} {TOKEN_SYMBOL} 
            </span>
          </div>
          <div className="progress-bar-custom relative">
            {/* <div className="progress-bar-text">UNTIL PRICE RISE</div> */}
            <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
        <BuyTokens
          tokenSymbol={TOKEN_SYMBOL}
          tokenPrice={stageInfo.pricePerToken}
        />       
      </div>
    </div>
  )
}

