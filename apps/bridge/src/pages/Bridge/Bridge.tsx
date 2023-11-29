import { Flex, H1, H2, P, Tabs, TabsItem, TextLink } from '@interlay/ui';

import { StyledBridge, StyledCard, StyledFormWrapper } from './Bridge.style';
import { DepositForm, WithdrawForm } from './components';

const Bridge = (): JSX.Element => {
  return (
    <StyledBridge gap='spacing4'>
      <Flex direction='column' flex={1} gap='spacing4'>
        <H1 size='base'>Bridge</H1>
        <StyledCard gap='spacing2' padding='spacing8'>
          <Tabs fullWidth size='large'>
            <TabsItem key='deposit' title='Deposit'>
              <StyledFormWrapper>
                <DepositForm />
              </StyledFormWrapper>
            </TabsItem>
            <TabsItem key='withdraw' title='Withdraw'>
              <StyledFormWrapper>
                <WithdrawForm />
              </StyledFormWrapper>
            </TabsItem>
          </Tabs>
        </StyledCard>
      </Flex>
      <Flex direction='column' flex={1} gap='spacing4'>
        <H2 size='base'>Activity</H2>
        <StyledCard gap='spacing2'>
          <P align='center' size='xs'>
            No bridging operations in process
          </P>
        </StyledCard>
        <TextLink external icon size='xs'>
          View All Transactions
        </TextLink>
      </Flex>
    </StyledBridge>
  );
};

export { Bridge };
