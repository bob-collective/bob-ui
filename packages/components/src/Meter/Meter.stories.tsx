import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Flex, NumberInput } from '..';

import { Meter, MeterProps } from '.';

const Render = (args: MeterProps) => {
  const [warning, setWarning] = useState(60);
  const [error, setError] = useState(80);

  return (
    <Flex direction='column' gap='spacing4'>
      <Flex direction='row' gap='spacing4'>
        <NumberInput
          label='Warning'
          value={warning}
          onChange={(e) => e.target.value && setWarning(Number(e.target.value))}
        />
        <NumberInput label='Error' value={error} onChange={(e) => e.target.value && setError(Number(e.target.value))} />
      </Flex>
      <Meter {...args} ranges={[0, warning, error, 100]} />
    </Flex>
  );
};

export default {
  title: 'Status/Meter',
  component: Meter,
  parameters: {
    layout: 'centered'
  },
  render: Render
} as Meta<typeof Meter>;

export const StaticMeter: StoryObj<MeterProps> = {
  args: {
    value: 20,
    ranges: [0, 20, 40, 60],
    variant: 'primary'
  }
};

export const DynamicMeter: StoryObj<MeterProps> = {
  args: {
    value: 20,
    ranges: [0, 60, 80, 100],
    variant: 'secondary'
  }
};
