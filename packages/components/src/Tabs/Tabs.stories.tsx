import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Key, useState } from 'react';

import { P } from '../Text';

import { Tabs, TabsItem, TabsProps } from '.';

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered'
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsItem key='all' title='All'>
        <P>All</P>
      </TabsItem>
      <TabsItem key='pending' title='Pending'>
        <P>Pending</P>
      </TabsItem>
      <TabsItem key='completed' title='Completed'>
        <P>Completed</P>
      </TabsItem>
      <TabsItem key='failed' title='Failed'>
        <P>Failed</P>
      </TabsItem>
    </Tabs>
  )
} as Meta<typeof Tabs>;

export const Default: StoryObj<TabsProps> = {};

export const DefaultSelected: StoryObj<TabsProps> = {
  args: {
    defaultSelectedKey: 'completed'
  }
};

export const DisabledKeys: StoryObj<TabsProps> = {
  args: {
    disabledKeys: ['all', 'pending', 'completed']
  }
};

export const ControlledSelected: StoryFn<TabsProps> = (args) => {
  const [state, setState] = useState<Key>();

  return (
    <Tabs {...args} selectedKey={state} onSelectionChange={setState}>
      <TabsItem key='all' title='Recent'>
        <P>All</P>
      </TabsItem>
      <TabsItem key='pending' title='Pending'>
        <P>Pending</P>
      </TabsItem>
      <TabsItem key='completed' title='Completed'>
        <P>Completed</P>
      </TabsItem>
      <TabsItem key='failed' title='Failed'>
        <P>Failed</P>
      </TabsItem>
    </Tabs>
  );
};
