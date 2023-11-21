import { Meta, StoryObj } from '@storybook/react';
import { mergeProps } from '@react-aria/utils';

import { Select, Item, Flex, CoinIcon, SelectProps } from '../../../../components/src';
import { useForm } from '../use-form';

export default {
  title: 'Hooks/useForm',
  parameters: {
    layout: 'centered'
  }
} as Meta<typeof Select>;

const RenderSelect = (args: SelectProps) => {
  const form = useForm<{ coin: string }>({ initialValues: { coin: '' }, onSubmit: alert });

  return (
    <>
      <h1>Form object</h1>
      <p>Touched: {JSON.stringify(form.touched)}</p>
      <p>Dirty: {JSON.stringify(form.dirty)}</p>
      <p>Values: {JSON.stringify(form.values)}</p>
      <Select {...mergeProps(args, form.getSelectFieldProps('coin') as any)}>
        <Item key='BTC' textValue='BTC'>
          <Flex alignItems='center' gap='spacing2'>
            <CoinIcon ticker='BTC' /> BTC
          </Flex>
        </Item>
        <Item key='ETH' textValue='ETH'>
          <Flex alignItems='center' gap='spacing2'>
            <CoinIcon ticker='ETH' /> ETH
          </Flex>
        </Item>
        <Item key='USDT' textValue='USDT'>
          <Flex alignItems='center' gap='spacing2'>
            <CoinIcon ticker='USDT' /> USDT
          </Flex>
        </Item>
      </Select>
    </>
  );
};

export const SelectField: StoryObj<SelectProps> = {
  args: {
    type: 'modal',
    label: 'Coin',
    modalProps: { title: 'Select token' }
  },
  render: RenderSelect
};
