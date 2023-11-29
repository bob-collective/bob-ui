import { Card, Dd, Dt, Item, Select, Span, TokenData, TokenListItem } from '@interlay/ui';

import { StyledDl, StyledDlGroup } from './TransactionDetails.style';

// eslint-disable-next-line @typescript-eslint/ban-types
type TransactionDetailsProps = {};

// eslint-disable-next-line no-empty-pattern
const TransactionDetails = ({}: TransactionDetailsProps): JSX.Element => {
  return (
    <Card>
      <StyledDl direction='column' gap='spacing0'>
        <StyledDlGroup>
          <Dt>You will receive</Dt>
          <Dd>0.008678 ETH ($11.00)</Dd>
        </StyledDlGroup>
        <StyledDlGroup>
          <Dt>Transfer time</Dt>
          <Dd>{'< 1 minute'}</Dd>
        </StyledDlGroup>
        <Select<TokenData>
          items={[{ balance: 0, balanceUSD: 0, value: 'ETH' }]}
          justifyContent='space-between'
          label='Gas Token'
          labelPosition='side'
          labelProps={{}}
          modalProps={{ title: 'Select Token' }}
          renderValue={(item) => <Span>{item.value?.value}</Span>}
          size='small'
          type='modal'
          value='ETH'
        >
          {(data: TokenData) => (
            <Item key={data.value} textValue={data.value}>
              <TokenListItem {...data} />
            </Item>
          )}
        </Select>
        <StyledDlGroup>
          <Dt>Estimated Gas</Dt>
          <Dd>0.000000041 ETH ($0.12)</Dd>
        </StyledDlGroup>
      </StyledDl>
    </Card>
  );
};

export { TransactionDetails };
