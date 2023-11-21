import { mergeProps } from '@react-aria/utils';

import { CoinIcon } from '../CoinIcon';
import { Flex } from '../Flex';
import { Item, Select, ModalSelectProps } from '../Select';
import { Span } from '../Text';

import { StyledTicker, StyledTokenSelect } from './TokenInput.style';
import { TokenListItem } from './TokenListItem';

const Value = ({ data }: { data: TokenData }) => (
  <Flex alignItems='center' gap='spacing1' justifyContent='space-evenly'>
    <CoinIcon size={data.tickers ? 'lg' : 'md'} ticker={data.value} tickers={data.tickers} />
    <StyledTicker>{data.value}</StyledTicker>
  </Flex>
);

type TokenData = {
  value: string;
  tickers?: string[];
  balance: string | number;
  balanceUSD: number;
};

type TokenSelectProps = Omit<ModalSelectProps<TokenData>, 'children' | 'type'>;

const TokenSelect = ({ modalProps, ...props }: TokenSelectProps): JSX.Element => (
  <Select<TokenData>
    {...props}
    aria-label='select token'
    asSelectTrigger={StyledTokenSelect}
    modalProps={mergeProps({ title: 'Select Token' }, modalProps)}
    placeholder={<Span>Select Token</Span>}
    renderValue={(item) => <Value data={item.value as TokenData} />}
    type='modal'
  >
    {(data: TokenData) => (
      <Item key={data.value} textValue={data.value}>
        <TokenListItem {...data} />
      </Item>
    )}
  </Select>
);

export { TokenSelect };
export type { TokenData, TokenSelectProps };
