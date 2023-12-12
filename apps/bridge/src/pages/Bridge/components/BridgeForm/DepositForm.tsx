import { Flex, TokenInput } from '@interlay/ui';
import { useForm } from '@interlay/hooks';
import { Ethereum, MonetaryAmount } from '@interlay/monetary-js';
import { mergeProps } from '@react-aria/utils';
import { useEffect, useMemo, useState } from 'react';
import { AuthCTA } from '@gobob/ui';
import { parseEther } from 'viem';
import { MessageDirection, MessageStatus } from '@eth-optimism/sdk';
import { L1_CHAIN_ID, useAccount, useNetwork, useSwitchNetwork, useBalance } from '@gobob/wagmi';

import { TransactionDetails } from '../TransactionDetails';
import { isFormDisabled } from '../../../../lib/form/utils';
import {
  BRIDGE_DEPOSIT_AMOUNT,
  BRIDGE_DEPOSIT_GAS_TOKEN,
  BridgeDepositFormValidationParams,
  BridgeDepositFormValues,
  bridgeDepositSchema
} from '../../../../lib/form/bridge';
import { useCrossChainMessenger } from '../../hooks/useCrossChainMessenger';
import { useGetDeposits } from '../../hooks/useGetDeposits';
import { TransactionModal } from '../TransactionModal';
import { CrossChainTransferMessage } from '../../../../types/cross-chain';
import { getDepositWaitTime } from '../../constants/bridge';

import { ChainSelect } from './ChainSelect';

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

    if (!messenger || !values[BRIDGE_DEPOSIT_AMOUNT] || !message) {
      return;
    }

    setTransactionModalOpen(true);

    const amountInGwei = parseEther(values[BRIDGE_DEPOSIT_AMOUNT]);
    const tx = await messenger.depositETH(amountInGwei.toString());

    refetchDeposits();

    const [waitTime, status] = await Promise.all([getDepositWaitTime(), messenger.getMessageStatus(tx)]);

    setMessage((currentMessage) => (currentMessage ? { ...currentMessage, waitTime, status } : undefined));

    await messenger.waitForMessageStatus(tx.hash, MessageStatus.RELAYED);

    setMessage((currentMessage) => (currentMessage ? { ...currentMessage, status: MessageStatus.RELAYED } : undefined));
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

  const [message, setMessage] = useState<CrossChainTransferMessage>();

  useEffect(() => {
    const createMessage = async () => {
      if (!messenger || !form.values[BRIDGE_DEPOSIT_AMOUNT]) {
        return;
      }
      const amountInGwei = parseEther(form.values[BRIDGE_DEPOSIT_AMOUNT]);
      const gasEstimate = await messenger.estimateGas.depositETH(amountInGwei.toString());

      const message = {
        amount: amountInGwei,
        gasEstimate: BigInt(gasEstimate.toString()),
        direction: MessageDirection.L1_TO_L2,
        waitTime: getDepositWaitTime()
      };

      setMessage(message);
    };

    createMessage();
  }, [form.values, messenger]);

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
              balance={ethBalance?.formatted}
              humanBalance={ethBalance?.formatted}
              label='Amount'
              placeholder='0.00'
              ticker='ETH'
              // TODO: add valueUSD
              valueUSD={0}
              {...mergeProps(form.getFieldProps(BRIDGE_DEPOSIT_AMOUNT))}
            />
            <TransactionDetails
              message={message}
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
      <TransactionModal isOpen={isTransactionModalOpen} message={message} onClose={handleClose} />
    </>
  );
};

export { DepositForm };
