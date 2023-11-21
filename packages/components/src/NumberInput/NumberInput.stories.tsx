import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InformationCircle } from '@interlay/icons';

import { Flex, Span } from '..';

import { NumberInput, NumberInputProps } from '.';

export default {
  title: 'Forms/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered'
  },
  args: {
    label: 'Amount'
  }
} as Meta<typeof NumberInput>;

export const Default: StoryObj<NumberInputProps> = {};

export const Controlled: StoryFn<NumberInputProps> = (args) => {
  const [state, setState] = useState<string>();

  return <NumberInput {...args} value={state} onChange={(e) => setState(e.target.value)} />;
};

export const DefaultValue: StoryObj<NumberInputProps> = {
  args: {
    defaultValue: '2'
  }
};

export const Decimal: StoryObj<NumberInputProps> = {
  args: {
    inputMode: 'decimal'
  }
};

export const WithDescription: StoryObj<NumberInputProps> = {
  args: {
    description: 'Please enter your amount'
  }
};

export const WithErrorMessage: StoryObj<NumberInputProps> = {
  args: {
    errorMessage: 'Please enter your amount'
  }
};

export const WithMultipleErrorMessage: StoryObj<NumberInputProps> = {
  args: {
    errorMessage: ['Please enter your amount', 'Please enter your amount']
  }
};

export const SideLabel: StoryObj<NumberInputProps> = {
  args: {
    labelPosition: 'side'
  }
};

export const Adornments: StoryFn<NumberInputProps> = (args) => (
  <Flex direction='column'>
    <NumberInput {...args} label='Start Adornment' startAdornment={<InformationCircle />} />
    <NumberInput {...args} endAdornment={<InformationCircle />} label='End Adornment' />
    <NumberInput
      {...args}
      bottomAdornment={
        <Span color='tertiary' size='xs'>
          $0.00
        </Span>
      }
      label='Bottom Adornment'
    />
  </Flex>
);

export const Sizes: StoryFn<NumberInputProps> = (args) => (
  <Flex direction='column'>
    <NumberInput {...args} label='Small' size='small' />
    <NumberInput {...args} label='Medium' />
    <NumberInput {...args} label='Large' size='large' />
  </Flex>
);

export const MaxWidth: StoryObj<NumberInputProps> = {
  args: {
    maxWidth: 'spacing12',
    labelPosition: 'side',
    justifyContent: 'space-between',
    style: { width: 150 },
    description: 'Please enter your amount'
  }
};

export const Disabled: StoryObj<NumberInputProps> = {
  args: {
    isDisabled: true
  }
};
