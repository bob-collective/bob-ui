import { Meta, StoryObj } from '@storybook/react';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { CHAINS, getConfig } from '@gobob/wagmi';
import { BrowserRouter } from 'react-router-dom';

import { Layout, LayoutProps } from '.';

export default {
  title: 'Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => {
      createWeb3Modal({
        wagmiConfig: getConfig(),
        projectId: '12856c58adb5d9ec849c38a42d3e152b',
        chains: CHAINS
      });

      return (
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      );
    }
  ]
} as Meta<typeof Layout>;

export const Default: StoryObj<LayoutProps> = {
  args: {}
};
