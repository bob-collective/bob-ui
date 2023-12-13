import { MessageDirection, MessageStatus } from '@eth-optimism/sdk';
import { AuthCTA } from '@gobob/ui';
import { L1_CHAIN_ID, useAccount, useBalance, useNetwork, useSwitchNetwork } from '@gobob/wagmi';
import { usePrices } from '@gobob/react-query';
import { useForm } from '@interlay/hooks';
import { Ethereum, MonetaryAmount } from '@interlay/monetary-js';
import { Flex, TokenInput } from '@interlay/ui';
import { mergeProps } from '@react-aria/utils';
import { useEffect, useMemo, useState } from 'react';
import { parseEther } from 'viem';
import Big from 'big.js';
import {
  BRIDGE_DEPOSIT_AMOUNT,
  BRIDGE_DEPOSIT_GAS_TOKEN,
  BridgeDepositFormValidationParams,
  BridgeDepositFormValues,
  bridgeDepositSchema
} from '../../../../lib/form/bridge';
import { isFormDisabled } from '../../../../lib/form/utils';
import { CrossChainTransferMessage } from '../../../../types/cross-chain';
import { getDepositWaitTime } from '../../constants/bridge';
import { useCrossChainMessenger } from '../../hooks/useCrossChainMessenger';
import { useGetDeposits } from '../../hooks/useGetDeposits';
import { TransactionDetails } from '../TransactionDetails';
import { TransactionModal } from '../TransactionModal';
import { ChainSelect } from './ChainSelect';

const DepositForm = (): JSX.Element => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();
  const { data: ethBalance } = useBalance({ address });
  const { getPrice } = usePrices();

  const { deposit: messenger } = useCrossChainMessenger();

  const { refetch: refetchDeposits } = useGetDeposits();

  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);

  const shouldSwitchChain = chain && chain.id !== L1_CHAIN_ID;

  const handleClose = () => {
    setTransactionModalOpen(false);
  };

  const switchToL1 = () => {
    if (switchNetwork) {
      switchNetwork(L1_CHAIN_ID);
    }
  };

  const handleSubmit = async (values: BridgeDepositFormValues) => {
    if (shouldSwitchChain) {
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
      [BRIDGE_DEPOSIT_AMOUNT]: '0',
      [BRIDGE_DEPOSIT_GAS_TOKEN]: 'ETH'
    }),
    []
  );

  const params: BridgeDepositFormValidationParams = {
    [BRIDGE_DEPOSIT_AMOUNT]: {
      maxAmount: new MonetaryAmount(
        Ethereum,
        ethBalance
          ? Big(ethBalance.value.toString())
              .add(1)
              .div(10 ** ethBalance.decimals)
          : 0
      ),
      minAmount: new MonetaryAmount(Ethereum, Big(1).div(10 ** 18))
    }
  };

  const form = useForm<BridgeDepositFormValues>({
    initialValues,
    validationSchema: shouldSwitchChain ? undefined : bridgeDepositSchema(params),
    onSubmit: handleSubmit,
    validateOnChange: true,
    validateOnBlur: true
  });

  const isSubmitDisabled = !shouldSwitchChain && isFormDisabled(form);

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

  const etherValueUSD = getPrice('ethereum') || 0;
  const valueUSD = new Big(form.values[BRIDGE_DEPOSIT_AMOUNT] || 0).mul(etherValueUSD).toNumber();

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
              valueUSD={valueUSD}
              {...mergeProps(form.getTokenFieldProps(BRIDGE_DEPOSIT_AMOUNT))}
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
