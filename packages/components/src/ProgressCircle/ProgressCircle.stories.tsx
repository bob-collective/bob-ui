import { Meta, StoryObj } from '@storybook/react';

import { ProgressCircle, ProgressCircleProps } from '.';

export default {
  title: 'Status/ProgressCircle',
  component: ProgressCircle,
  parameters: {
    layout: 'centered'
  }
} as Meta<typeof ProgressCircle>;

const Determinate: StoryObj<ProgressCircleProps> = {
  args: {
    value: 10,
    minValue: 0,
    maxValue: 100,
    diameter: 64,
    thickness: 3
  }
};

export { Determinate };
