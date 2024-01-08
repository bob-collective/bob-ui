// import { Tabs, TabsItem } from '@interlay/ui';

import { Tabs, TabsItem } from '@interlay/ui';
import { StyledCard, StyledFormWrapper } from './BridgeForm.style';
import { DepositForm } from './DepositForm';
import { WithdrawForm } from './WithdrawForm';
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/ban-types
type BridgeFormProps = {};

// eslint-disable-next-line no-empty-pattern
const BridgeForm = ({}: BridgeFormProps): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams(new URLSearchParams('action=deposit'));

  const selectedTabKey = searchParams.get('action') || undefined;

  return (
    <>
      <StyledCard gap='spacing2' padding='spacing8'>
        <Tabs
          fullWidth
          size='large'
          selectedKey={selectedTabKey}
          onSelectionChange={(key) => {
            setSearchParams(() => {
              const newParams = new URLSearchParams();
              newParams.set('action', key as string);
              return newParams;
            });
          }}
        >
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
    </>
  );
};

export { BridgeForm };
export type { BridgeFormProps };
