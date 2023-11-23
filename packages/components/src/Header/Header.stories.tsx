import { Meta, StoryObj } from '@storybook/react';

import { Header, HeaderProps } from '.';

export default {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'centered'
  }
} as Meta<typeof Header>;

export const Success: StoryObj<HeaderProps> = {
  args: {}
};
