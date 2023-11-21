import { Meta, StoryObj } from '@storybook/react';

import { ProgressBar, ProgressBarProps } from '.';

export default {
  title: 'Status/ProgressBar',
  component: ProgressBar
} as Meta<typeof ProgressBar>;

export const Default: StoryObj<ProgressBarProps> = { args: { label: 'Loading...', value: 20 } };
