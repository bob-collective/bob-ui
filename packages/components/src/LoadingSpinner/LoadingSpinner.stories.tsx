import { Meta, StoryObj } from '@storybook/react';

import { LoadingSpinner, LoadingSpinnerProps } from '.';

export default {
  title: 'Loading/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex' }}>
        <Story />
      </div>
    )
  ]
} as Meta;

export const Indeterminate: StoryObj<LoadingSpinnerProps> = {
  args: {
    diameter: 60,
    thickness: 5,
    variant: 'indeterminate'
  }
};
