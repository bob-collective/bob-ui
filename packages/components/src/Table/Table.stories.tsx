import { Meta, StoryObj } from '@storybook/react';
import { ChevronRight } from '@interlay/icons';

import { CTA } from '../CTA';

import { ColumnProps, RowProps, Table, TableProps } from '.';

const action = (
  <CTA size='small' variant='text' onPress={() => alert('Pressed')}>
    <ChevronRight size='s' />
  </CTA>
);
const columns: ColumnProps[] = [
  { name: 'Coin', id: 'coin' },
  { name: 'Price', id: 'price' },
  { name: 'Action', id: 'action', hideHeader: true }
];

const rows: RowProps[] = [
  {
    id: 1,
    coin: 'BTC',
    price: '$22,996.31',
    action
  },
  { id: 2, coin: 'DOT', price: '$8.13', action },
  { id: 3, coin: 'KINT', price: '$2.80', action },
  { id: 4, coin: 'kBTC', price: '$23,074.29', action }
];

export default {
  title: 'Collections/Table',
  component: Table,
  parameters: {
    layout: 'centered'
  },
  args: {
    style: { minWidth: 300 }
  },
  render: (args) => <Table {...args} aria-label='story table' columns={columns} rows={rows} />
} as Meta<typeof Table>;

export const Default: StoryObj<TableProps> = {};

export const SelectableRow: StoryObj<TableProps> = {
  args: {
    onRowAction: (key) => alert(`Row ${key} selected`)
  }
};
