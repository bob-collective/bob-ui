import { MessageDirection, MessageStatus } from '@eth-optimism/sdk';
import { usePrices } from '@gobob/react-query';
import { AuthCTA } from '@gobob/ui';
import { L1_CHAIN_ID, useAccount, useBalance, useNetwork, useSwitchNetwork } from '@gobob/wagmi';
import { useForm } from '@interlay/hooks';
import { Ethereum, MonetaryAmount } from '@interlay/monetary-js';
import { Flex, TokenInput } from '@interlay/ui';
import { mergeProps } from '@react-aria/utils';
import Big from 'big.js';
import { useEffect, useMemo, useState } from 'react';
import { parseEther } from 'viem';

import { useDebounce } from 'react-use';
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
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { isL1Chain } from '../../utils/chain';
import { TransactionDetails } from '../TransactionDetails';
import { TransactionModal } from '../TransactionModal';
import { ChainSelect } from './ChainSelect';

const DepositForm = (): JSX.Element => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();
  const { data: ethBalance } = useBalance({ address, chainId: L1_CHAIN_ID });
  const { getPrice } = usePrices();

  const { messenger } = useCrossChainMessenger();

  const { refetch: refetchTransactions } = useGetTransactions();

  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);

  const [message, setMessage] = useState<CrossChainTransferMessage>();

  const [amount, setAmount] = useState('');

  const isValidChain = isL1Chain(chain);

  useEffect(() => {
    if (!isValidChain) {
      switchNetwork?.(L1_CHAIN_ID);
    }
  }, [switchNetwork, isValidChain]);

  const handleChangeInput = async () => {
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

  useDebounce(handleChangeInput, 500, [amount]);

  const handleClose = () => {
    setTransactionModalOpen(false);
    setMessage(undefined);
  };

  const handleSubmit = async (values: BridgeDepositFormValues) => {
    if (!messenger || !values[BRIDGE_DEPOSIT_AMOUNT] || !message) {
      return;
    }

    setTransactionModalOpen(true);

    const amountInGwei = parseEther(values[BRIDGE_DEPOSIT_AMOUNT]);
    const tx = await messenger.depositETH(amountInGwei.toString());

    // TODO: check if necessary
    //  await  tx.wait()

    refetchTransactions();

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
        ethBalance ? new Big(ethBalance.value.toString()).add(1).div(10 ** ethBalance.decimals) : 0
      ),
      minAmount: new MonetaryAmount(Ethereum, Big(1).div(10 ** 18))
    }
  };

  const form = useForm<BridgeDepositFormValues>({
    initialValues,
    validationSchema: isValidChain ? undefined : bridgeDepositSchema(params),
    onSubmit: handleSubmit,
    validateOnChange: true,
    validateOnBlur: true
  });

  const isSubmitDisabled = !isValidChain || isFormDisabled(form);

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
              {...mergeProps(form.getTokenFieldProps(BRIDGE_DEPOSIT_AMOUNT), {
                onValueChange: (value: string) => setAmount(value)
              })}
            />
            <TransactionDetails
              message={message}
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
      <TransactionModal isOpen={isTransactionModalOpen} message={message} onClose={handleClose} />
    </>
  );
};

export { DepositForm };
