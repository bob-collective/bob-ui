import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { CTA } from '../CTA';

import { Tooltip, TooltipProps } from '.';

export default {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered'
  },
  render: (args) => (
    <Tooltip {...args} isOpen>
      <CTA>Hover Me</CTA>
    </Tooltip>
  ),
  args: {
    label: 'This is a tooltip'
  }
} as Meta<typeof Tooltip>;

export const Default: StoryObj<TooltipProps> = {};

export const WithDelay: StoryObj<TooltipProps> = {
  args: {
    delay: 1000
  }
};

export const Disabled: StoryObj<TooltipProps> = {
  args: {
    isDisabled: true
  }
};

export const WithText: StoryFn<TooltipProps> = (args) => <Tooltip {...args}>Hover this text</Tooltip>;
