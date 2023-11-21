import { Meta, StoryFn } from '@storybook/react';

import { Flex } from '..';

import { TokenStack, TokenStackProps } from '.';

export default {
  title: 'Coin/TokenStack',
  component: TokenStack,
  parameters: {
    layout: 'centered'
  },
  args: {
    size: 'xl2'
  }
} as Meta<typeof TokenStack>;

const Default: StoryFn<TokenStackProps> = (args) => (
  <Flex direction='column' gap='spacing2'>
    <TokenStack {...args} tickers={['BTC']} />
    <TokenStack {...args} tickers={['BTC', 'ETH']} />
    <TokenStack {...args} tickers={['BTC', 'ETH', 'USDT']} />
    <TokenStack {...args} tickers={['BTC', 'ETH', 'USDT', 'IBTC']} />
    <TokenStack {...args} tickers={['BTC', 'ETH', 'USDT', 'IBTC', 'KBTC']} />
    <TokenStack {...args} tickers={['BTC', 'ETH', 'USDT', 'IBTC', 'KBTC', 'KINT']} />
    <TokenStack {...args} tickers={['BTC', 'ETH', 'USDT', 'IBTC', 'KBTC', 'KINT', 'INTR']} />
  </Flex>
);

export { Default };
