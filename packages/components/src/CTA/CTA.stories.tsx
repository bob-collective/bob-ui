import { Meta, StoryObj } from '@storybook/react';

import { Flex } from '..';

import { CTA, CTAProps } from '.';

export default {
  title: 'Buttons/CTA',
  component: CTA,
  parameters: {
    layout: 'centered'
  },
  args: {
    href: '#',
    children: 'Button'
  },
  render: (args) => (
    <Flex gap='spacing4'>
      <CTA {...args} />
      <CTA {...args} disabled />
    </Flex>
  )
} as Meta<typeof CTA>;

export const Primary: StoryObj<CTAProps> = {
  args: {
    variant: 'primary'
  }
};

export const Secondary: StoryObj<CTAProps> = {
  args: {
    variant: 'secondary'
  }
};

export const Outlined: StoryObj<CTAProps> = {
  args: {
    variant: 'outlined'
  }
};

export const Text: StoryObj<CTAProps> = {
  args: {
    variant: 'text'
  }
};

export const XSmall: StoryObj<CTAProps> = {
  args: {
    size: 'x-small'
  }
};

export const Small: StoryObj<CTAProps> = {
  args: {
    size: 'small'
  }
};

export const Large: StoryObj<CTAProps> = {
  args: {
    size: 'large'
  }
};

export const Loading: StoryObj<CTAProps> = {
  render: (args) => (
    <Flex direction='column' gap='spacing4'>
      <CTA {...args} />
      <CTA variant='secondary' {...args} />
      <CTA variant='outlined' {...args} />
      <CTA variant='text' {...args} />
      <CTA {...args} />
    </Flex>
  ),
  args: {
    loading: true
  }
};
