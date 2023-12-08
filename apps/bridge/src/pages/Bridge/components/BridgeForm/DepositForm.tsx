import { Flex, TokenInput } from '@interlay/ui';
import { useForm } from '@interlay/hooks';
import { Ethereum, MonetaryAmount } from '@interlay/monetary-js';
import { mergeProps } from '@react-aria/utils';
import { useEffect, useMemo, useState } from 'react';
import { AuthCTA } from '@gobob/ui';
import { parseEther } from 'viem';
import { MessageStatus } from '@eth-optimism/sdk';
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
import { L1_CHAIN_ID, useAccount, useNetwork, useSwitchNetwork, useBalance } from '@gobob/wagmi';
import { useCrossChainMessenger } from '../../hooks/useCrossChainMessenger';
import { useGetDeposits } from '../../hooks/useGetDeposits';
import { TransactionModal } from '../TransactionModal';
import { CrossChainTransferMessage } from '../../../../types/cross-chain';

const DepositForm = (): JSX.Element => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();
  const { data: ethBalance } = useBalance({ address });

  const { deposit: messenger } = useCrossChainMessenger();

  const { refetch: refetchDeposits } = useGetDeposits();

  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);

  const handleClose = () => {
    setTransactionModalOpen(false);
  };

  const switchToL1 = () => {
    if (switchNetwork) {
      switchNetwork(L1_CHAIN_ID);
    }
  };

  const handleSubmit = async (values: BridgeDepositFormValues) => {
    if (chain && chain.id !== L1_CHAIN_ID) {
      switchToL1();
      return;
    }

    if (!messenger || !values[BRIDGE_DEPOSIT_AMOUNT]) {
      return;
    }

    setTransactionModalOpen(true);

    const amountInGwei = parseEther(values[BRIDGE_DEPOSIT_AMOUNT]);
    const gasEstimate = await messenger.estimateGas.depositETH(amountInGwei.toString())

    const tx = await messenger.depositETH(amountInGwei.toString());

    refetchDeposits();

    await messenger.waitForMessageStatus(tx.hash, MessageStatus.RELAYED);
    onDepositSuccess();
    console.log('relayed');
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

    // TODO: Move to its own hook
    const [message, setMessage] = useState<CrossChainTransferMessage>()

    useEffect(() => {
      const createMessage = async () => {
        if (!messenger || !form.values[BRIDGE_DEPOSIT_AMOUNT]) {
          return;
        }
        const amountInGwei = parseEther(form.values[BRIDGE_DEPOSIT_AMOUNT]);
        const gasEstimate = await messenger.estimateGas.depositETH(amountInGwei.toString())
        // TODO: not possible to estimate without having the cross-chain message ready
        // const waitTime = await messenger.estimateMessageWaitTimeSeconds()

        const message = {
          amount: amountInGwei,
          gasEstimate: BigInt(gasEstimate.toString()),

        }

        setMessage(message as CrossChainTransferMessage)
      }
      createMessage();
    }, [form.values, messenger])

  return (
    <>
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
              humanBalance={ethBalance?.formatted}
              ticker='ETH'
              // TODO: add valueUSD
              valueUSD={0}
              {...mergeProps(form.getFieldProps(BRIDGE_DEPOSIT_AMOUNT))}
            />
            <TransactionDetails
            message={undefined}
              selectProps={mergeProps(form.getSelectFieldProps(BRIDGE_DEPOSIT_GAS_TOKEN), {
                items: [{ balance: 0, balanceUSD: 0, value: 'ETH' }]
              })}
            />
            <AuthCTA disabled={isSubmitDisabled} size='large' type='submit'>
              {chain?.id === L1_CHAIN_ID ? 'Bridge Asset' : 'Switch to L1'}
            </AuthCTA>
          </Flex>
        </form>
      </Flex>
      {/* <TransactionModal isOpen={isTransactionModalOpen} onClose={handleClose} /> */}
    </>
  );
};

export { DepositForm };
