import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Slider, SliderProps } from '.';

export default {
  title: 'Forms/Slider',
  component: Slider,
  parameters: {
    layout: 'centered'
  },
  args: {
    label: 'Amount'
  }
} as Meta<typeof Slider>;

export const Default: StoryObj<SliderProps> = {};

export const DefaultValue: StoryObj<SliderProps> = {
  args: {
    step: 1,
    maxValue: 5,
    defaultValue: 3
  }
};

export const Controlled: StoryFn<SliderProps> = (args) => {
  const [state, setState] = useState(0);

  return <Slider {...args} value={state} onChange={setState} />;
};

export const WithMarks: StoryObj<SliderProps> = {
  args: {
    marks: true,
    step: 1,
    maxValue: 5
  }
};

export const Decimal: StoryObj<SliderProps> = {
  args: {
    marks: true,
    step: 0.1,
    minValue: 0.1,
    maxValue: 0.5
  }
};

export const CustomMark: StoryObj<SliderProps> = {
  args: {
    marks: true,
    step: 1,
    maxValue: 5,
    renderMarkText: (value) => `${value}x`
  }
};

export const Disabled: StoryObj<SliderProps> = {
  args: {
    isDisabled: true
  }
};
