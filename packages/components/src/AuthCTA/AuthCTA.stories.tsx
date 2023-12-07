import { Meta, StoryObj } from '@storybook/react';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { CHAINS, getConfig } from '@gobob/wagmi';

import { AuthCTA, AuthCTAProps } from '.';

export default {
  title: 'Buttons',
  component: AuthCTA,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    (Story) => {
      createWeb3Modal({
        wagmiConfig: getConfig(),
        // FIXME:
        projectId: '12856c58adb5d9ec849c38a42d3e152b',
        chains: CHAINS
      });

      return <Story />;
    }
  ]
} as Meta<typeof AuthCTA>;

export const Default: StoryObj<AuthCTAProps> = {
  name: 'AuthCTA',
  args: {}
};
