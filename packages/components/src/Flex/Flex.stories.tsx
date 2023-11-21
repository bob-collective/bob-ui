import { Meta, StoryObj } from '@storybook/react';

import { Flex, FlexProps } from '.';

export default {
  title: 'Layout/Flex',
  component: Flex,

  args: {
    gap: 'spacing2'
  },
  render: (args: FlexProps) => (
    <Flex {...args}>
      <div style={{ height: 60, width: 100, background: 'red' }} />
      <div style={{ height: 60, width: 100, background: 'blue' }} />
      <div style={{ height: 60, width: 100, background: 'green' }} />
    </Flex>
  )
} as Meta<typeof Flex>;

export const Horizontal: StoryObj<FlexProps> = {};

export const Vertical: StoryObj<FlexProps> = {
  args: {
    direction: 'column'
  }
};
