import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { mergeProps } from '@react-aria/utils';

import * as coins from '../../../../icons/coin/src';
import { TokenInput, TokenInputProps } from '..';

const items = [
  { balance: 1, value: 'BTC', balanceUSD: 10000 },
  { balance: 2, value: 'ETH', balanceUSD: 900 },
  { balance: 500, value: 'USDT', balanceUSD: 500 },
  { balance: 120, value: 'LP Token', tickers: ['BTC', 'ETH', 'USDT'], balanceUSD: 230 }
];

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
    type: 'selectable',
    label: 'Amount',
    selectProps: {
      items
    }
  }
} as Meta<typeof TokenInput>;

export const Selectable: StoryObj<TokenInputProps> = {};

export const SelectableDefaultValue: StoryObj<TokenInputProps> = {
  args: {
    selectProps: {
      defaultValue: 'BTC',
      items
    }
  }
};

const ControlledSelectComponent = (args: any) => {
  const [state, setState] = useState<string>();

  return (
    <TokenInput
      {...args}
      selectProps={mergeProps(args.selectProps, { value: state, onSelectionChange: setState })}
      type='selectable'
    />
  );
};

export const SelectableControlledValue: StoryObj<TokenInputProps> = {
  render: ControlledSelectComponent
};

export const SelectableWithBalance: StoryObj<TokenInputProps> = {
  args: {
    balance: '10'
  }
};

export const SelectableDescription: StoryObj<TokenInputProps> = {
  args: {
    selectProps: {
      items,
      description: 'Please select a token'
    }
  }
};

export const SelectableErrorMessage: StoryObj<TokenInputProps> = {
  args: {
    selectProps: {
      items,
      errorMessage: 'Token field is required'
    }
  }
};
