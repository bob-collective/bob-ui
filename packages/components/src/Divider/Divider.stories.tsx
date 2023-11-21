import { Meta, StoryObj } from '@storybook/react';

import { DividerProps, Flex } from '..';
import { H1, P } from '..';

import { Divider } from '.';

export default {
  title: 'Content/Divider',
  component: Divider,
  parameters: {
    layout: 'centered'
  },
  render: (args) => (
    <Flex
      alignItems='center'
      direction={args.orientation === 'horizontal' ? 'column' : 'row'}
      gap='spacing4'
      justifyContent='center'
      style={{ width: 400 }}
    >
      <H1 size='xl4'>Divider</H1>
      <Divider {...args} />
      <P size='s'>Divides content</P>
    </Flex>
  )
} as Meta<typeof Divider>;

export const Horizontal: StoryObj<DividerProps> = {
  args: {
    orientation: 'horizontal'
  }
};

export const Vertical: StoryObj<DividerProps> = {
  args: {
    orientation: 'vertical'
  }
};
