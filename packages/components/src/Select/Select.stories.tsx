import { Item } from '@react-stately/collections';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Key, useState } from 'react';

import { CoinIcon } from '../CoinIcon';
import { Flex } from '../Flex';
import { CTA } from '..';

import { Select, SelectProps } from './Select';

const Render = (args: SelectProps) => (
  <Select<any> {...args}>
    <Item key='BTC' textValue='BTC'>
      <Flex alignItems='center' gap='spacing2'>
        <CoinIcon ticker='BTC' /> BTC
      </Flex>
    </Item>
    <Item key='ETH' textValue='ETH'>
      <Flex alignItems='center' gap='spacing2'>
        <CoinIcon ticker='ETH' /> ETH
      </Flex>
    </Item>
    <Item key='USDT' textValue='USDT'>
      <Flex alignItems='center' gap='spacing2'>
        <CoinIcon ticker='USDT' /> USDT
      </Flex>
    </Item>
  </Select>
);

export default {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered'
  },
  args: {
    label: 'Coin'
  },
  render: Render
} as Meta<typeof Select>;

export const Listbox: StoryObj<SelectProps> = {};

export const Modal: StoryObj<SelectProps<any>> = {
  args: {
    type: 'modal',
    modalProps: { title: 'Select coin' }
  }
};

export const DefaultValue: StoryObj<SelectProps<any>> = {
  args: {
    type: 'modal',
    modalProps: { title: 'Select coin' },
    defaultValue: 'BTC'
  }
};

const ControlledComponent = (args: SelectProps<any>) => {
  const [state, setState] = useState<Key>();

  return <Render {...(args as any)} value={state} onSelectionChange={setState} />;
};

export const Controlled: StoryObj<SelectProps<any>> = {
  args: {
    type: 'modal',
    modalProps: { title: 'Select coin' }
  },
  render: ControlledComponent
};

const ControlledOpenComponent = (args: SelectProps<any>) => {
  const [state, setState] = useState(true);

  return (
    <>
      <CTA onPress={() => setState(true)}>Open Modal</CTA>
      <Render {...(args as any)} open={state} onOpenChange={setState} />
    </>
  );
};

export const ControlledOpen: StoryObj<SelectProps<any>> = {
  args: {
    type: 'modal',
    modalProps: { title: 'Select coin' }
  },
  render: ControlledOpenComponent
};

export const DisabledKeys: StoryObj<SelectProps<any>> = {
  args: {
    type: 'modal',
    modalProps: { title: 'Select coin' },
    disabledKeys: ['BTC', 'ETH']
  }
};

export const CustomPlaceholder: StoryObj<SelectProps> = {
  args: {
    placeholder: 'Select coin'
  }
};

export const WithDescription: StoryObj<SelectProps> = {
  args: {
    description: 'Please enter your street address'
  }
};

export const WithErrorMessage: StoryObj<SelectProps> = {
  args: {
    errorMessage: 'Please enter your street address'
  }
};

export const WithMultipleErrorMessage: StoryObj<SelectProps> = {
  args: {
    errorMessage: ['Please enter your street address', 'Please enter your street address']
  }
};

export const SideLabel: StoryObj<SelectProps> = {
  args: {
    labelPosition: 'side'
  }
};

export const MaxWidth: StoryObj<SelectProps> = {
  args: {
    maxWidth: 'spacing28'
  }
};

export const Sizes: StoryFn<SelectProps> = (args: any) => (
  <Flex direction='column'>
    <Select {...args} label='Small' size='small' />
    <Select {...args} label='Medium' />
    <Select {...args} label='Large' size='large' />
  </Flex>
);

export const Disabled: StoryObj<SelectProps> = {
  args: {
    disabled: true
  }
};
