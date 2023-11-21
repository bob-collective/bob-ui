import { Meta, StoryObj } from '@storybook/react';

import { BreadcrumbItem, Breadcrumbs, BreadcrumbsProps } from '.';

export default {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered'
  },
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem href='#'>Strategies</BreadcrumbItem>
      <BreadcrumbItem href='#'>BTC Passive Income</BreadcrumbItem>
    </Breadcrumbs>
  )
} as Meta<typeof Breadcrumbs>;

export const Default: StoryObj<BreadcrumbsProps> = {};
