import { Meta, StoryObj } from '@storybook/react';

import { TextLink, TextLinkProps } from '.';

export default {
  title: 'Navigation/TextLink',
  component: TextLink,
  parameters: {
    layout: 'centered'
  },
  args: {
    children: 'Text Link',
    href: '#'
  }
} as Meta<typeof TextLink>;

export const Default: StoryObj<TextLinkProps> = {};

export const External: StoryObj<TextLinkProps> = {
  args: {
    external: true,
    icon: true
  }
};
