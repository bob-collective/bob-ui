import { Meta, StoryObj } from '@storybook/react';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { CHAINS, getConfig } from '@gobob/wagmi';

import { ConnectWallet, ConnectWalletProps } from '.';

export default {
  title: 'Buttons',
  component: ConnectWallet,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    (Story) => {
      createWeb3Modal({
        wagmiConfig: getConfig(),
        projectId: '12856c58adb5d9ec849c38a42d3e152b',
        chains: CHAINS
      });

      return <Story />;
    }
  ]
} as Meta<typeof ConnectWallet>;

export const Default: StoryObj<ConnectWalletProps> = {
  name: 'ConnectWallet',
  args: {}
};
