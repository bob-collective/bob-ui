import { Card, Flex, P, Radio, RadioGroup, TextLink, TokenInput } from '@interlay/ui';
import { AuthCTA } from '@gobob/ui';
import { useForm } from '@interlay/hooks';
import { InformationCircle } from '@interlay/icons';
import { Ethereum, MonetaryAmount } from '@interlay/monetary-js';
import { mergeProps } from '@react-aria/utils';
import { useMemo, useState } from 'react';

import { TransactionDetails } from '../TransactionDetails';
import {
  BRIDGE_WITHDRAW_AMOUNT,
  BRIDGE_WITHDRAW_GAS_TOKEN,
  BridgeWithdrawFormValidationParams,
  BridgeWithdrawFormValues,
  bridgeWithdrawSchema
} from '../../../../lib/form/bridge';
import { isFormDisabled } from '../../../../lib/form/utils';

import { StyledChain, StyledRadioCard } from './BridgeForm.style';
import { ChainSelect } from './ChainSelect';
import { ExternalBridgeCard } from './ExternalBridgeCard';

enum BridgeEntity {
  BOB = 'bob',
  EXTERNAL = 'external'
}

const WithdrawForm = (): JSX.Element => {
  const [entity, setEntity] = useState(BridgeEntity.BOB);

  const handleSubmit = async () => {
    // TODO: pass form values as function arg
  };

  const initialValues = useMemo(
    () => ({
      [BRIDGE_WITHDRAW_AMOUNT]: '',
      [BRIDGE_WITHDRAW_GAS_TOKEN]: 'ETH'
    }),
    []
  );

  // TODO: add correct params
  const params: BridgeWithdrawFormValidationParams = {
    [BRIDGE_WITHDRAW_AMOUNT]: {
      maxAmount: new MonetaryAmount(Ethereum, 100000),
      minAmount: new MonetaryAmount(Ethereum, 0)
    }
  };

  const form = useForm<BridgeWithdrawFormValues>({
    initialValues,
    validationSchema: bridgeWithdrawSchema(params),
    onSubmit: handleSubmit
  });

  const handleChangeEntity = (value: string) => {
    setEntity(value as BridgeEntity);
  };

  const isSubmitDisabled = isFormDisabled(form);

  return (
    <Flex direction='column'>
      <form onSubmit={form.handleSubmit}>
        <Flex direction='column' gap='spacing6'>
          <RadioGroup label='Use' orientation='horizontal' value={entity} onValueChange={handleChangeEntity}>
            <StyledRadioCard background='secondary' padding='spacing3' shadowed={false} variant='bordered'>
              <StyledChain alignItems='center' direction='row' gap='spacing1'>
                <Radio value={BridgeEntity.BOB}>BOB Bridge</Radio>
              </StyledChain>
            </StyledRadioCard>
            <Card background='secondary' padding='spacing3' shadowed={false} variant='bordered'>
              <StyledChain alignItems='center' direction='row'>
                <Radio value={BridgeEntity.EXTERNAL}>3rd Party Bridge</Radio>
              </StyledChain>
            </Card>
          </RadioGroup>
          <Card
            alignItems='center'
            background='secondary'
            direction='row'
            gap='spacing2'
            padding='spacing2'
            shadowed={false}
          >
            <InformationCircle />
            <P color='tertiary' size='xs'>
              Our bridge includes a {<TextLink external>challenge period</TextLink>}, usually takes about 7 days to
              finish. It allows for the bridging of any token to the Ethereum Mainnet.
            </P>
          </Card>
          {entity === BridgeEntity.BOB ? (
            <>
              <Flex wrap gap='spacing2'>
                <ChainSelect label='From' name='BOB' ticker='BOB' />
                <ChainSelect label='To' name='Ethereum' ticker='ETH' />
              </Flex>
              <TokenInput
                balance={0}
                label='Amount'
                placeholder='0.00'
                // TODO: add balance
                ticker='ETH'
                // TODO: add valueUSD
                valueUSD={0}
                // FIXME: throw in token input component if wrong field getter is passed
                {...mergeProps(form.getTokenFieldProps(BRIDGE_WITHDRAW_AMOUNT))}
              />
              <TransactionDetails
                message={undefined}
                selectProps={mergeProps(form.getSelectFieldProps(BRIDGE_WITHDRAW_GAS_TOKEN), {
                  items: [{ balance: 0, balanceUSD: 0, value: 'ETH' }]
                })}
              />
              <AuthCTA disabled={isSubmitDisabled} size='large' type='submit'>
                Withdraw Asset
              </AuthCTA>
            </>
          ) : (
            <>
              {/* FIXME: this should not be this component but I will handle this later*/}
              <ChainSelect label='Token to withdraw' name='ETH' ticker='ETH' />
              <Flex direction='column' gap='spacing1'>
                <ExternalBridgeCard bridge='across-protocol' />
                <ExternalBridgeCard bridge='t-btc' />
                <ExternalBridgeCard bridge='synapse-protocol' />
                <ExternalBridgeCard bridge='super-bridge' />
              </Flex>
            </>
          )}
        </Flex>
      </form>
    </Flex>
  );
};

export { WithdrawForm };
