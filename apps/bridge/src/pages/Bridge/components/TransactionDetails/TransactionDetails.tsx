import { Dd, DlProps, Flex, Item, SelectProps, Span, TokenData, TokenListItem } from '@interlay/ui';

import { StyledDl, StyledDlGroup, StyledDt, StyledSelect } from './TransactionDetails.style';

type Props = { selectProps?: Omit<SelectProps<TokenData>, 'children'> };

type InheritAttrs = Omit<DlProps, keyof Props>;

type TransactionDetailsProps = Props & InheritAttrs;

// eslint-disable-next-line no-empty-pattern
const TransactionDetails = ({ selectProps, ...props }: TransactionDetailsProps): JSX.Element => {
  return (
    <StyledDl direction='column' gap='spacing0' {...props}>
      <StyledDlGroup justifyContent='space-between'>
        <StyledDt color='primary'>You will receive</StyledDt>
        <Dd>0.008678 ETH ($11.00)</Dd>
      </StyledDlGroup>
      <StyledDlGroup justifyContent='space-between'>
        <StyledDt color='primary'>Transfer time</StyledDt>
        <Dd>{'< 1 minute'}</Dd>
      </StyledDlGroup>
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
        <Dd>0.000000041 ETH ($0.12)</Dd>
      </StyledDlGroup>
    </StyledDl>
  );
};

export { TransactionDetails };
