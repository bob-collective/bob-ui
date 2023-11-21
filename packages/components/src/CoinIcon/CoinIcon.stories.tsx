import { Meta, StoryFn, StoryObj } from '@storybook/react';

import * as coins from '../../../icons/coin/src';
import { Flex } from '../Flex';

import { CoinIcon, CoinIconProps } from './CoinIcon';

export default {
  title: 'Coin/CoinIcon',
  component: CoinIcon,
  parameters: {
    layout: 'centered'
  },
  args: {
    size: 'xl2'
  }
} as Meta<typeof CoinIcon>;

export const Default: StoryObj<CoinIconProps> = {
  args: {
    ticker: 'BTC'
  },
  argTypes: {
    ticker: { control: 'select', options: Object.keys(coins) }
  }
};

export const LPTokens: StoryFn<CoinIconProps> = (args) => {
  return (
    <Flex wrap gap='spacing4'>
      <CoinIcon {...args} ticker='LP KBTC-KSM' tickers={['KBTC', 'KSM']} />
      <CoinIcon {...args} ticker='LP IBTC-INTR-DOT' tickers={['IBTC', 'INTR', 'DOT']} />
      <CoinIcon {...args} ticker='LP IBTC-INTR-DOT-USDT' tickers={['IBTC', 'INTR', 'DOT', 'USDT']} />
    </Flex>
  );
};
