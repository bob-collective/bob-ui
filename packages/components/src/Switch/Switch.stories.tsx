import { Meta, StoryObj } from '@storybook/react';

import { Switch, SwitchProps } from '.';

export default {
  title: 'Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered'
  },
  args: {
    children: 'Subscribe'
  }
} as Meta<typeof Switch>;

export const Default: StoryObj<SwitchProps> = {};

export const Selected: StoryObj<SwitchProps> = {
  args: {
    isSelected: true
  }
};

export const LeftPlacement: StoryObj<SwitchProps> = {
  args: {
    labelPlacement: 'left'
  }
};

export const Disabled: StoryObj<SwitchProps> = {
  args: {
    isDisabled: true
  }
};
