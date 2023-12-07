import { Tabs, TabsItem } from '@interlay/ui';
import { useCallback, useState } from 'react';

import { TransactionModal } from '../TransactionModal';

import { StyledCard, StyledFormWrapper } from './BridgeForm.style';
import { DepositForm } from './DepositForm';
import { WithdrawForm } from './WithdrawForm';

// eslint-disable-next-line @typescript-eslint/ban-types
type BridgeFormProps = {};

// eslint-disable-next-line no-empty-pattern
const BridgeForm = ({}: BridgeFormProps): JSX.Element => {
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);

  const handleDeposit = useCallback(() => {
    setTransactionModalOpen(true);
  }, []);

  const handleClose = () => {
    setTransactionModalOpen(false);
  };

  return (
    <>
      <StyledCard gap='spacing2' padding='spacing8'>
        <Tabs fullWidth size='large'>
          <TabsItem key='deposit' title='Deposit'>
            <StyledFormWrapper>
              <DepositForm onSubmit={handleDeposit} />
            </StyledFormWrapper>
          </TabsItem>
          <TabsItem key='withdraw' title='Withdraw'>
            <StyledFormWrapper>
              <WithdrawForm onSubmit={handleDeposit} />
            </StyledFormWrapper>
          </TabsItem>
        </Tabs>
      </StyledCard>
      <TransactionModal isOpen={isTransactionModalOpen} onClose={handleClose} />
    </>
  );
};

export { BridgeForm };
export type { BridgeFormProps };
