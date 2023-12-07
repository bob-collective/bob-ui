import { Flex, TokenInput } from '@interlay/ui';
import { useForm } from '@interlay/hooks';
import { Ethereum, MonetaryAmount } from '@interlay/monetary-js';
import { mergeProps } from '@react-aria/utils';
import { useMemo } from 'react';
import { AuthCTA } from '@gobob/ui';

import {
  BRIDGE_DEPOSIT_AMOUNT,
  BRIDGE_DEPOSIT_GAS_TOKEN,
  BridgeDepositFormValidationParams,
  BridgeDepositFormValues,
  bridgeDepositSchema
} from '../../../../lib/form/bridge';
import { isFormDisabled } from '../../../../lib/form/utils';
import { TransactionDetails } from '../TransactionDetails';

import { ChainSelect } from './ChainSelect';

type DepositFormProps = { onSubmit: (values: BridgeDepositFormValues) => void };

const DepositForm = ({ onSubmit }: DepositFormProps): JSX.Element => {
  const handleSubmit = async (values: BridgeDepositFormValues) => {
    onSubmit(values);
  };

  const initialValues = useMemo(
    () => ({
      [BRIDGE_DEPOSIT_AMOUNT]: '',
      [BRIDGE_DEPOSIT_GAS_TOKEN]: 'ETH'
    }),
    []
  );

  // TODO: add correct params
  const params: BridgeDepositFormValidationParams = {
    [BRIDGE_DEPOSIT_AMOUNT]: {
      maxAmount: new MonetaryAmount(Ethereum, 100000),
      minAmount: new MonetaryAmount(Ethereum, 0)
    }
  };

  const form = useForm<BridgeDepositFormValues>({
    initialValues,
    validationSchema: bridgeDepositSchema(params),
    onSubmit: handleSubmit
  });

  const isSubmitDisabled = isFormDisabled(form);

  return (
    <Flex direction='column'>
      <form onSubmit={form.handleSubmit}>
        <Flex direction='column' gap='spacing6'>
          <Flex wrap gap='spacing2'>
            <ChainSelect label='From' name='Ethereum' ticker='ETH' />
            <ChainSelect label='To' name='BOB' ticker='BOB' />
          </Flex>
          <TokenInput
            balance={0}
            label='Amount'
            placeholder='0.00'
            // TODO: add balance
            ticker='ETH'
            // TODO: add valueUSD
            valueUSD={0}
            {...mergeProps(form.getFieldProps(BRIDGE_DEPOSIT_AMOUNT))}
          />
          <TransactionDetails
            selectProps={mergeProps(form.getSelectFieldProps(BRIDGE_DEPOSIT_GAS_TOKEN), {
              items: [{ balance: 0, balanceUSD: 0, value: 'ETH' }]
            })}
          />
          <AuthCTA disabled={isSubmitDisabled} size='large' type='submit'>
            Bridge Asset
          </AuthCTA>
        </Flex>
      </form>
    </Flex>
  );
};

export { DepositForm };
