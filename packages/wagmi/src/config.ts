import { Chain, configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

const L2_RPC_URL = 'https://l2-puff-bob-jznbxtoq7h.t.conduit.xyz';
const L2_WSS_URL = 'wss://l2-puff-bob-jznbxtoq7h.t.conduit.xyz';
const L2_BLOCK_EXPLORER = 'https://explorerl2-puff-bob-jznbxtoq7h.t.conduit.xyz';
const L2_CHAIN_ID = 111;
const L2_MULTICALL3_ADDRESS = '0x089b191d95417817389c8eD9075b51a38ca46DE8';

const L1_RPC_URL = 'https://ethereum-sepolia.publicnode.com';
const L1_WSS_URL = 'wss://ethereum-sepolia.publicnode.com';
const L1_BLOCK_EXPLORER = 'https://sepolia.etherscan.io';
const L1_CHAIN_ID = 11155111;
const L1_MULTICALL3_ADDRESS = '0xcA11bde05977b3631167028862bE2a173976CA11';

const BOB_CHAIN: Chain = {
  id: L2_CHAIN_ID,
  name: 'BoB Testnet',
  network: 'BoB Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH'
  },
  rpcUrls: {
    public: { http: [L2_RPC_URL], webSocket: [L2_WSS_URL] },
    default: { http: [L2_RPC_URL], webSocket: [L2_WSS_URL] }
  },
  blockExplorers: {
    default: { name: 'BobScan', url: L2_BLOCK_EXPLORER }
  },
  contracts: {
    multicall3: {
      address: L2_MULTICALL3_ADDRESS
    }
  }
} as const;

const SEPOLIA: Chain = {
  id: L1_CHAIN_ID,
  name: 'Sepolia',
  network: 'Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH'
  },
  rpcUrls: {
    public: { http: [L1_RPC_URL], webSocket: [L1_WSS_URL] },
    default: { http: [L1_RPC_URL], webSocket: [L1_WSS_URL] }
  },
  blockExplorers: {
    default: { name: 'EtherScan Sepolia', url: L1_BLOCK_EXPLORER }
  },
  contracts: {
    multicall3: {
      address: L1_MULTICALL3_ADDRESS
    }
  }
} as const;

const CHAINS = [BOB_CHAIN, SEPOLIA];

const getConfig = () => {
  const { chains, publicClient, webSocketPublicClient } = configureChains(CHAINS, [publicProvider()]);

  return createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
    connectors: [
      new InjectedConnector({
        chains,
        options: {
          shimDisconnect: true
        }
      }),
      new MetaMaskConnector({
        chains,
        options: {
          shimDisconnect: true
        }
      }),
      new WalletConnectConnector({
        chains,
        options: {
          showQrModal: true,
          projectId: '12856c58adb5d9ec849c38a42d3e152b',
          metadata: {
            name: 'BOB',
            description: 'NOTE: TO BE ADDED',
            url: 'https://www.gobob.xyz',
            // TODO: change
            icons: ['https://uploads-ssl.webflow.com/64e85c2f3609488b3ed725f4/64ecae53ef4b561482f1c49f_bob1.jpg']
          }
        }
      })
    ]
  });
};

export {
  BOB_CHAIN,
  CHAINS,
  getConfig,
  L2_BLOCK_EXPLORER,
  L2_RPC_URL,
  L2_WSS_URL,
  L2_CHAIN_ID,
  L2_MULTICALL3_ADDRESS,
  L1_BLOCK_EXPLORER,
  L1_CHAIN_ID,
  L1_MULTICALL3_ADDRESS,
  L1_RPC_URL,
  L1_WSS_URL
};
