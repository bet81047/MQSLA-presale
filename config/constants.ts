import Web3 from 'web3'

const PROVIDER_URL_ETH = 'https://ethereum-rpc.publicnode.com'
const PROVIDER_URL_SEPOLIA = 'https://ethereum-sepolia-rpc.publicnode.com'
const PROVIDER_URL_BSC = 'https://bsc-rpc.publicnode.com'
const PROVIDER_URL_TESTBSC = 'https://bsc-testnet-rpc.publicnode.com'

export const web3Client = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_ETH))
export const sepoliaWeb3Client = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_SEPOLIA))
export const web3ClientBsc = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_BSC))
export const web3ClientTestBsc = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_TESTBSC))

export const web3Clients: Record<number, Web3> = {
    1: web3Client,
    11155111: sepoliaWeb3Client,
    56: web3ClientBsc,
    97: web3ClientTestBsc,
  };


export const EVM_BUSD_ADDRESS: Record<number, { address: string; decimals: number }> = {
    1: { address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6 },
    56: { address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", decimals: 18 },
    97: { address: "0x64544969ed7EBf5f083679233325356EbE738930", decimals: 18 }, // Fixed typo: `decimasl` → `decimals`
    11155111: { address: "0xaAE90D6f733286e97327479Df0eDD23eA360d9A6", decimals: 18 },
  };

export const EVM_USDT_ADDRESS: Record<number, { address: string; decimals: number }> = {
    1: { address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", decimals: 6 },
    56: { address: "0x55d398326f99059fF775485246999027B3197955", decimals: 18 },
    97: { address: "0x6516A8c4C52698969eBC51fBE3Ac516234083BB3", decimals: 6 }, // Fixed typo: `decimasl` → `decimals`
    11155111: { address: "0xD0984278565e87C17e80a2eD2Da32A2B8dd923b4", decimals: 18 },
  };

  export const EVM_USDC_ADDRESS: Record<number, { address: string; decimals: number }> = {
    1: { address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6 },
    56: { address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", decimals: 18 },
    97: { address: "0x64544969ed7EBf5f083679233325356EbE738930", decimals: 18 }, // Fixed typo: `decimasl` → `decimals`
    11155111: { address: "0x585A7B436e59556FD2e07b093cE5730C7ce768D3", decimals: 6 },
  };

  export const EVM_PRESALE_ADDRESS: Record<number, string> = {
    1: '0x0000000000000000000000000000000000000000',
    56: '0x0000000000000000000000000000000000000000',
    97: '0x162bfea542c4a9a03876Ce16f50d6591A2cC96A1',
    11155111: '0x035F7f31783a27bfD49014E79B95b6809f7E30B9',
  };