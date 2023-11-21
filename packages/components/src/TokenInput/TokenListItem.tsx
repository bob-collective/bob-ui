import { useCurrencyFormatter } from '@interlay/hooks';

import { CoinIcon } from '../CoinIcon';
import { Flex } from '../Flex';
import { useSelectModalContext } from '../Select/SelectModalContext';
import { Span } from '../Text';

import { StyledListItemLabel, StyledListTokenWrapper } from './TokenInput.style';
import { TokenData } from './TokenSelect';

type TokenListItemProps = { isDisabled?: boolean } & TokenData;

const TokenListItem = ({ balance, balanceUSD, value, tickers, isDisabled }: TokenListItemProps): JSX.Element => {
  const isSelected = useSelectModalContext().selectedItem?.key === value && !isDisabled;
  const format = useCurrencyFormatter();

  return (
    <>
      <StyledListTokenWrapper alignItems='center' flex='1' gap='spacing2'>
        <CoinIcon size={tickers ? 'lg' : 'md'} ticker={value} tickers={tickers} />
        <StyledListItemLabel $isSelected={isSelected}>{value}</StyledListItemLabel>
      </StyledListTokenWrapper>
      <Flex alignItems='flex-end' direction='column' flex='0' gap='spacing2'>
        <StyledListItemLabel $isSelected={isSelected}>{balance}</StyledListItemLabel>
        <Span color='tertiary' size='s'>
          {format(balanceUSD)}
        </Span>
      </Flex>
    </>
  );
};

export { TokenListItem };
export type { TokenListItemProps };
