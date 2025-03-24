import React, { useEffect, useMemo, useState } from "react";
import { multicall, readContract, writeContract } from '@wagmi/core'
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { config } from "../app/providers"
import { TokenAbi } from '../config/token_abi';
import PresaleAbi from '../config/PresaleABI.json';

import { EVM_PRESALE_ADDRESS, EVM_USDC_ADDRESS, EVM_USDT_ADDRESS } from "@/config/constants";
import { formatEther, isAddress, parseEther, parseUnits } from "viem";

const cookies = new Cookies();


export function usePresaleEvm() {
    const { address } = useAccount();
    const [evmTransactionPending, setEvmTransactionPending] = useState(false);

    const approveAsset = async (tokenAddress: string, approvingAmount: bigint) => {
        setEvmTransactionPending(true);
        try {
            const result = await writeContract(config, {
                abi: TokenAbi,
                address: tokenAddress as `0x${string}`,
                functionName: 'approve',
                args: [EVM_PRESALE_ADDRESS as `0x${string}`, approvingAmount],
            });
        } catch (error) {
            console.error("Approve transaction failed:", error);
            toast.error("Approve transaction failed! Please try again.");
        } finally {
            setEvmTransactionPending(false); // Ensures the pending state is reset even if an error occurs
        }
    }

    const buyTokenWithUsdcOnEvm = async (chosenChainId: number, usdcAmount: number) => {
        if (!address) {
            toast.warning("Wallet is not connected!");
            return;
        }

        setEvmTransactionPending(true);

        try {
            const result = await writeContract(config, {
                abi: PresaleAbi,
                address: EVM_PRESALE_ADDRESS[chosenChainId] as `0x${string}`,
                functionName: 'buyWithUsdc',
                args: [parseUnits(usdcAmount.toString(), EVM_USDC_ADDRESS[chosenChainId].decimals)],
            });
            toast.success("BuyWithUsdc transaction successful!");
            return result;  // Returning the result in case it's needed
        } catch (error) {
            console.error("BuyWithUsdc transaction failed:", error);
            toast.error("BuyWithUsdc transaction failed! Please try again.");
        } finally {
            setEvmTransactionPending(false); // Ensures the pending state is reset even if an error occurs
        }
    };

    const buyTokenWithUsdtOnEvm = async (chosenChainId: number, usdtAmount: number) => {
        if (!address) {
            toast.warning("Wallet is not connected!");
            return;
        }

        setEvmTransactionPending(true);

        try {
            const result = await writeContract(config, {
                abi: PresaleAbi,
                address: EVM_PRESALE_ADDRESS[chosenChainId] as `0x${string}`,
                functionName: 'buyWithUsdt',
                args: [parseUnits(usdtAmount.toString(), EVM_USDT_ADDRESS[chosenChainId].decimals)],
            });
            toast.success("BuyWithUsdt transaction successful!");
            return result;  // Returning the result in case it's needed
        } catch (error) {
            console.error("BuyWithUsdt transaction failed:", error);
            toast.error("BuyWithUsdt transaction failed! Please try again.");
        } finally {
            setEvmTransactionPending(false); // Ensures the pending state is reset even if an error occurs
        }
    };

    return {
        evmTransactionPending,
        approveAsset,
        buyTokenWithUsdcOnEvm,
        buyTokenWithUsdtOnEvm,
    };
}