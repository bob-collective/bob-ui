import { Meta, StoryObj } from '@storybook/react';

import { Flex } from '..';

import { CTALink, CTALinkProps } from '.';

export default {
  title: 'Navigation/CTALink',
  component: CTALink,
  parameters: {
    layout: 'centered'
  },
  args: {
    href: '#',
    children: 'Button'
  },
  render: (args) => (
    <Flex gap='spacing4'>
      <CTALink {...args} />
      <CTALink {...args} disabled />
    </Flex>
  )
} as Meta<typeof CTALink>;

export const Primary: StoryObj<CTALinkProps> = {
  args: {
    variant: 'primary'
  }
};

export const Secondary: StoryObj<CTALinkProps> = {
  args: {
    variant: 'secondary'
  }
};

export const Outlined: StoryObj<CTALinkProps> = {
  args: {
    variant: 'outlined'
  }
};

export const Text: StoryObj<CTALinkProps> = {
  args: {
    variant: 'text'
  }
};

export const XSmall: StoryObj<CTALinkProps> = {
  args: {
    size: 'x-small'
  }
};

export const Small: StoryObj<CTALinkProps> = {
  args: {
    size: 'small'
  }
};

export const Large: StoryObj<CTALinkProps> = {
  args: {
    size: 'large'
  }
};
