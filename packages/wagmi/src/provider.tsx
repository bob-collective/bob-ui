import { WagmiConfig as WagmiLibConfig, WagmiConfigProps, createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { BOB_CHAIN } from './config';

const { publicClient, webSocketPublicClient } = configureChains([BOB_CHAIN], [publicProvider()]);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient
});

// TODO: might need different config for test env
const WagmiConfig: React.FC<Omit<WagmiConfigProps, 'config'>> = (props) => (
  <WagmiLibConfig {...props} config={config} />
);

export { WagmiConfig };
export type { WagmiConfigProps };
