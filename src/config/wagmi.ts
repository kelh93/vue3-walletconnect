import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { createStorage, cookieStorage } from 'wagmi'
import { mainnet } from '@reown/appkit/networks'

export const projectId = import.meta.env.VITE_REOWN_PROJECT_ID!
export const networks = [mainnet] // Extendable to other chains

// No connector available, so rely only on Tron adapter in Vue layers
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
  connectors: [], // leave empty
  storage: createStorage({ storage: cookieStorage }),
})

export const wagmiConfig = wagmiAdapter.wagmiConfig
