import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InformationCircle } from '@interlay/icons';

import { Flex, Span } from '..';

import { Input, InputProps } from '.';

export default {
  title: 'Forms/Input',
  component: Input,
  parameters: {
    layout: 'centered'
  },
  args: {
    label: 'Address'
  }
} as Meta<typeof Input>;

export const Default: StoryObj<InputProps> = {};

export const Controlled: StoryFn<InputProps> = (args) => {
  const [state, setState] = useState<string>();

  return <Input {...args} value={state} onChange={(e) => setState(e.target.value)} />;
};

export const DefaultValue: StoryObj<InputProps> = {
  args: {
    defaultValue: 'Sesame Street'
  }
};

export const WithDescription: StoryObj<InputProps> = {
  args: {
    description: 'Please enter your street address'
  }
};

export const WithErrorMessage: StoryObj<InputProps> = {
  args: {
    errorMessage: 'Please enter your street address'
  }
};

export const WithMultipleErrorMessage: StoryObj<InputProps> = {
  args: {
    errorMessage: ['Please enter your street address', 'Please enter your street address']
  }
};

export const SideLabel: StoryObj<InputProps> = {
  args: {
    labelPosition: 'side'
  }
};

export const MaxWidth: StoryObj<InputProps> = {
  args: {
    maxWidth: 'spacing28'
  }
};

export const Adornments: StoryFn<InputProps> = (args) => (
  <Flex direction='column'>
    <Input {...args} label='Start Adornment' startAdornment={<InformationCircle />} />
    <Input {...args} endAdornment={<InformationCircle />} label='End Adornment' />
    <Input
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

export const Sizes: StoryFn<InputProps> = (args) => (
  <Flex direction='column'>
    <Input {...args} label='Small' size='small' />
    <Input {...args} label='Medium' />
    <Input {...args} label='Large' size='large' />
  </Flex>
);

export const Disabled: StoryObj<InputProps> = {
  args: {
    isDisabled: true
  }
};
