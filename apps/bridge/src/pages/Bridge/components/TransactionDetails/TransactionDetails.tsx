import { Dd, DlProps, Flex, Item, SelectProps, Span, TokenData, TokenListItem } from '@interlay/ui';
import { formatEther } from 'viem';
import { usePrices } from '@gobob/react-query';
import Big from 'big.js';
import { useCurrencyFormatter } from '@interlay/hooks';

import { CrossChainTransferMessage } from '../../../../types/cross-chain';

import { StyledDl, StyledDlGroup, StyledDt, StyledSelect } from './TransactionDetails.style';

type Props = { message: CrossChainTransferMessage | undefined; selectProps?: Omit<SelectProps<TokenData>, 'children'> };

type InheritAttrs = Omit<DlProps, keyof Props>;

type TransactionDetailsProps = Props & InheritAttrs;

const TransactionDetails = ({ selectProps, message, ...props }: TransactionDetailsProps): JSX.Element => {
  const { getPrice } = usePrices();
  const format = useCurrencyFormatter();

  const etherValueUSD = getPrice('ethereum') || 0;

  const amount = message?.amount ? formatEther(message?.amount) : 0;
  const amountUSD = new Big(amount).mul(etherValueUSD).toNumber();

  const gasEstimate = message?.gasEstimate ? formatEther(message.gasEstimate) : 0;
  const gasEstimateUSD = new Big(gasEstimate).mul(etherValueUSD).toNumber();

  return (
    <StyledDl direction='column' gap='spacing0' {...props}>
      <StyledDlGroup justifyContent='space-between'>
        <StyledDt color='primary'>You will receive</StyledDt>
        <Dd>
          {message?.amount ? formatEther(message?.amount) : 0} ETH ({format(amountUSD)})
        </Dd>
      </StyledDlGroup>
      {message?.waitTime && (
        <StyledDlGroup justifyContent='space-between'>
          <StyledDt color='primary'>Transfer time</StyledDt>
          <Dd>{message.waitTime} sec</Dd>
        </StyledDlGroup>
      )}

      {selectProps ? (
        <Flex alignItems='center' justifyContent='space-between'>
          <Span>Gas Token</Span>
          <StyledSelect<TokenData>
            aria-label='select gas token'
            modalProps={{ title: 'Select Token' }}
            renderValue={(item) => <Span>{item.value?.value}</Span>}
            size='small'
            type='modal'
            {...selectProps}
          >
            {(data: TokenData) => (
              <Item key={data.value} textValue={data.value}>
                <TokenListItem {...data} />
              </Item>
            )}
          </StyledSelect>
        </Flex>
      ) : (
        <StyledDlGroup justifyContent='space-between'>
          <StyledDt color='primary'>Gas Token</StyledDt>
          <Dd>ETH</Dd>
        </StyledDlGroup>
      )}
      <StyledDlGroup justifyContent='space-between'>
        <StyledDt color='primary'>Estimated Gas</StyledDt>
        <Dd>
          <>
            {message?.gasEstimate ? formatEther(message.gasEstimate) : 0} ETH ({format(gasEstimateUSD)})
          </>
        </Dd>
      </StyledDlGroup>
    </StyledDl>
  );
};

export { TransactionDetails };
