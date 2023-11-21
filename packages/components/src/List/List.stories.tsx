import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { List, ListItem, ListProps, Selection } from '.';

const Render = (args: ListProps) => (
  <List aria-label='Example List' style={{ minWidth: 200 }} {...args}>
    <ListItem key='1' textValue='BTC'>
      BTC
    </ListItem>
    <ListItem key='2' textValue='ETH'>
      ETH
    </ListItem>
    <ListItem key='3' textValue='USDT'>
      USDT
    </ListItem>
  </List>
);

export default {
  title: 'Collections/List',
  component: List,
  parameters: {
    layout: 'centered'
  },
  render: Render
} as Meta<typeof List>;

export const Default: StoryObj<ListProps> = {};

export const Secondary: StoryObj<ListProps> = {
  args: {
    variant: 'secondary'
  }
};

export const Card: StoryObj<ListProps> = {
  args: {
    variant: 'card'
  }
};

export const Horizontal: StoryObj<ListProps> = {
  args: {
    direction: 'row'
  }
};

export const SingleSelection: StoryObj<ListProps> = {
  args: {
    selectionMode: 'multiple',
    selectionBehavior: 'replace'
  }
};

export const MultipleSelection: StoryObj<ListProps> = {
  args: {
    selectionMode: 'multiple'
  }
};

export const HorizontalSelection: StoryObj<ListProps> = {
  args: {
    selectionMode: 'multiple',
    selectionBehavior: 'replace',
    direction: 'row'
  }
};

export const DefaultSelected: StoryObj<ListProps> = {
  args: {
    selectionMode: 'multiple',
    selectionBehavior: 'replace',
    selectedKeys: ['3']
  }
};

const ControlledComponent = (args: ListProps) => {
  const [state, setState] = useState<Selection>();

  return <Render {...args} selectedKeys={state} onSelectionChange={setState} />;
};

export const Controlled: StoryObj<ListProps> = {
  args: {
    selectionMode: 'multiple',
    selectionBehavior: 'replace'
  },
  render: ControlledComponent
};

export const DisabledKeys: StoryObj<ListProps> = {
  args: {
    selectionMode: 'multiple',
    selectionBehavior: 'replace',
    disabledKeys: ['1', '2']
  }
};
