import { Chain, configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

const RPC_URL = 'https://l2-fluffy-bob-7mjgi9pmtg.t.conduit.xyz';
const WSS_URL = 'wss://l2-fluffy-bob-7mjgi9pmtg.t.conduit.xyz';

const BOB_CHAIN: Chain = {
  id: 901,
  name: 'BOB',
  network: 'bob',
  nativeCurrency: {
    decimals: 18,
    name: 'Bob',
    symbol: 'BOB'
  },
  rpcUrls: {
    public: { http: [RPC_URL], webSocket: [WSS_URL] },
    default: { http: [RPC_URL], webSocket: [WSS_URL] }
  },
  blockExplorers: {
    default: { name: 'BobScan', url: 'https://explorerl2-fluffy-bob-7mjgi9pmtg.t.conduit.xyz' }
  },
  contracts: {
    multicall3: {
      address: '0x2d94665b0A08cba915C039b94bA2d6b85B96e4e7'
    }
  }
} as const;

const CHAINS = [BOB_CHAIN];

const getConfig = () => {
  const { chains, publicClient, webSocketPublicClient } = configureChains([BOB_CHAIN], [publicProvider()]);

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

export { BOB_CHAIN, CHAINS, getConfig };
