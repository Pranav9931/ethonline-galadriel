import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

const projectId = import.meta.env.VITE_WALLET_PROJECT_ID

// 2. Set chains
const mainnet = {
  chainId: 696969,
  name: 'Galadriel Devnet',
  currency: 'GAL',
  explorerUrl: 'https://explorer.galadriel.com',
  rpcUrl: 'https://devnet.galadriel.com'
}

// 3. Create a metadata object
const metadata = {
  name: 'Galadriel ETHOnline',
  description: 'ETHOnline Project for Galadriel',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
})

// 5. Create a AppKit instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
