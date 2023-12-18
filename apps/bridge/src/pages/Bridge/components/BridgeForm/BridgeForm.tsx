// import { Tabs, TabsItem } from '@interlay/ui';

import { StyledCard, StyledFormWrapper } from './BridgeForm.style';
import { DepositForm } from './DepositForm';

// eslint-disable-next-line @typescript-eslint/ban-types
type BridgeFormProps = {};

// eslint-disable-next-line no-empty-pattern
const BridgeForm = ({}: BridgeFormProps): JSX.Element => {
  return (
    <>
      <StyledCard gap='spacing2' padding='spacing8'>
        {/* <Tabs fullWidth size='large'> */}
        {/* <TabsItem key='deposit' title='Deposit'> */}
        <StyledFormWrapper>
          <DepositForm />
        </StyledFormWrapper>
        {/* </TabsItem> */}
        {/* TODO: Show Withdraw tab when withdrawal is implemented. */}
        {/* <TabsItem key='withdraw' title='Withdraw'>
            <StyledFormWrapper>
              <WithdrawForm />
            </StyledFormWrapper>
          </TabsItem> */}
        {/* </Tabs> */}
      </StyledCard>
    </>
  );
};

export { BridgeForm };
export type { BridgeFormProps };
