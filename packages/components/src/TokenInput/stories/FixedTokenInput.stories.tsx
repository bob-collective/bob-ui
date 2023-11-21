import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import * as coins from '../../../../icons/coin/src';
import { TokenInput, TokenInputProps } from '..';

export default {
  title: 'Forms/TokenInput',
  component: TokenInput,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    ticker: { control: 'select', options: Object.keys(coins) }
  },
  args: {
    label: 'Amount'
  }
} as Meta<typeof TokenInput>;

export const Default: StoryObj<TokenInputProps> = {
  args: {
    ticker: 'BTC'
  }
};

export const UnknownTicker: StoryObj<TokenInputProps> = {
  args: {
    ticker: 'ABCD'
  }
};

export const MultiTokenTicker: StoryObj<TokenInputProps> = {
  args: {
    ticker: { text: 'LP Token', icons: ['BTC', 'ETH', 'USDT'] }
  }
};

export const DefaultValue: StoryObj<TokenInputProps> = {
  args: {
    ticker: 'BTC',
    defaultValue: '10'
  }
};

const ControlledComponent = ({ value, valueUSD: valueUSDProp, ...args }: TokenInputProps) => {
  const [state, setState] = useState<string | undefined>(value?.toString());

  const valueUSD = valueUSDProp === undefined ? undefined : isNaN(state as any) ? 0 : Number(state) * 10;

  return <TokenInput {...args} value={state} valueUSD={valueUSD} onChange={(e) => setState(e.target.value)} />;
};

export const Controlled: StoryObj<TokenInputProps> = {
  args: {
    ticker: 'BTC'
  },
  render: ControlledComponent
};

export const WithValueUSD: StoryObj<TokenInputProps> = {
  args: {
    ticker: 'BTC',
    valueUSD: 0
  },
  render: ControlledComponent
};

export const WithBalance: StoryObj<TokenInputProps> = {
  args: {
    ticker: 'BTC',
    balance: '10'
  }
};

export const WithHumanBalance: StoryObj<TokenInputProps> = {
  args: {
    ticker: 'BTC',
    balance: '10.901231231',
    humanBalance: '11'
  }
};

export const WithCustomBalanceLabel: StoryObj<TokenInputProps> = {
  args: {
    ticker: 'BTC',
    balance: '10',
    balanceLabel: 'Available'
  }
};

export const WithDescription: StoryObj<TokenInputProps> = {
  args: {
    ticker: 'BTC',
    description: 'Please enter your amount'
  }
};

export const WithErrorMessage: StoryObj<TokenInputProps> = {
  args: {
    ticker: 'BTC',
    errorMessage: 'Please enter your amount'
  }
};

export const WithMultipleErrorMessage: StoryObj<TokenInputProps> = {
  args: {
    ticker: 'BTC',
    errorMessage: ['Please enter your amount', 'Please enter your amount']
  }
};

export const Disabled: StoryObj<TokenInputProps> = {
  args: {
    ticker: 'BTC',
    isDisabled: true
  }
};
