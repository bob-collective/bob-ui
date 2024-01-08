import { MessageDirection } from '@eth-optimism/sdk';
import { AuthCTA } from '@gobob/ui';
import { useForm } from '@interlay/hooks';
import { InformationCircle } from '@interlay/icons';
import { Ethereum, MonetaryAmount } from '@interlay/monetary-js';
import { Card, Flex, P, Radio, RadioGroup, TextLink, TokenInput } from '@interlay/ui';
import { mergeProps } from '@react-aria/utils';
import { useEffect, useMemo, useState } from 'react';

import {
  BRIDGE_WITHDRAW_AMOUNT,
  BRIDGE_WITHDRAW_GAS_TOKEN,
  BridgeWithdrawFormValidationParams,
  BridgeWithdrawFormValues,
  bridgeWithdrawSchema
} from '../../../../lib/form/bridge';
import { isFormDisabled } from '../../../../lib/form/utils';
import { TransactionDetails } from '../TransactionDetails';

import { useMutation, usePrices } from '@gobob/react-query';
import { L2_CHAIN_ID, useAccount, useBalance, useNetwork, useSwitchNetwork } from '@gobob/wagmi';
import Big from 'big.js';
import { useDebounce } from 'react-use';
import { parseEther } from 'viem';
import { CrossChainTransferMessage } from '../../../../types/cross-chain';
import { getDepositWaitTime } from '../../constants/bridge';
import { useCrossChainMessenger } from '../../hooks/useCrossChainMessenger';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { isL2Chain } from '../../utils/chain';
import { TransactionModal } from '../TransactionModal';
import { TransactionModalVariant } from '../TransactionModal/TransactionModal';
import { StyledChain, StyledRadioCard } from './BridgeForm.style';
import { ChainSelect } from './ChainSelect';
import { ExternalBridgeCard } from './ExternalBridgeCard';

enum BridgeEntity {
  BOB = 'bob',
  EXTERNAL = 'external'
}

const WithdrawForm = (): JSX.Element => {
  const [entity, setEntity] = useState(BridgeEntity.BOB);
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();
  const { data: ethBalance } = useBalance({ address, chainId: L2_CHAIN_ID });
  const { getPrice } = usePrices();

  const [transactionModal, setTransactionModal] = useState<{ isOpen: boolean; variant?: TransactionModalVariant }>({
    isOpen: false,
    variant: 'confirmation'
  });

  const [message, setMessage] = useState<CrossChainTransferMessage | undefined>(undefined);

  const { messenger } = useCrossChainMessenger();

  const { refetch: refetchTransactions } = useGetTransactions();

  const [amount, setAmount] = useState('');

  const isValidChain = isL2Chain(chain);

  const mutation = useMutation({
    mutationKey: ['withdraw', address],
    mutationFn: async (amount: string) => {
      if (!messenger) {
        throw new Error('Missing messenger');
      }

      setTransactionModal({ isOpen: true });

      const amountInGwei = parseEther(amount);
      const tx = await messenger.withdrawETH(amountInGwei.toString());

      setTransactionModal((s) => ({ ...s, variant: 'processing' }));

      const [, waitTime, status] = await Promise.all([
        tx.wait(),
        messenger.estimateMessageWaitTimeSeconds(tx),
        messenger.getMessageStatus(tx)
      ]);

      setTransactionModal((s) => ({ ...s, variant: 'submitted' }));

      setMessage((currentMessage) => (currentMessage ? { ...currentMessage, waitTime, status } : undefined));
    },
    onSuccess: () => {
      refetchTransactions();
    }
  });

  useEffect(() => {
    if (!isValidChain) {
      switchNetwork?.(L2_CHAIN_ID);
    }
  }, [isValidChain, switchNetwork]);

  const handleChangeInput = async () => {
    const amount = form.values[BRIDGE_WITHDRAW_AMOUNT];

    if (!messenger || !amount) return;

    const amountInGwei = parseEther(amount);

    let gasEstimate;
    try {
      gasEstimate = await messenger.estimateGas.withdrawETH(amountInGwei.toString());
    } catch (e) {
      gasEstimate = parseEther('0');
    }
    const message = {
      amount: amountInGwei,
      gasEstimate: BigInt(gasEstimate.toString()),
      direction: MessageDirection.L2_TO_L1,
      waitTime: getDepositWaitTime()
    };

    setMessage(message);
  };

  useDebounce(handleChangeInput, 500, [amount]);

  const handleSubmit = async (values: BridgeWithdrawFormValues) => {
    const amount = values[BRIDGE_WITHDRAW_AMOUNT];

    if (!messenger || !amount || !message) {
      return;
    }

    mutation.mutate(amount);
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
      maxAmount: new MonetaryAmount(
        Ethereum,
        ethBalance ? new Big(ethBalance.value.toString()).add(1).div(10 ** ethBalance.decimals) : 0
      ),
      minAmount: new MonetaryAmount(Ethereum, Big(1).div(10 ** 18))
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

  const handleClose = () => {
    setTransactionModal({ isOpen: false });
  };

  const isSubmitDisabled = !isValidChain || isFormDisabled(form);
  const etherValueUSD = getPrice('ethereum') || 0;
  const valueUSD = new Big(form.values[BRIDGE_WITHDRAW_AMOUNT] || 0).mul(etherValueUSD).toNumber();

  return (
    <>
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
                  balance={ethBalance?.formatted}
                  humanBalance={ethBalance?.formatted}
                  label='Amount'
                  placeholder='0.00'
                  ticker='ETH'
                  valueUSD={valueUSD}
                  // FIXME: throw in token input component if wrong field getter is passed
                  {...mergeProps(form.getTokenFieldProps(BRIDGE_WITHDRAW_AMOUNT), {
                    onValueChange: (value: string) => setAmount(value)
                  })}
                />
                <TransactionDetails
                  message={message}
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
      <TransactionModal {...transactionModal} message={message} onClose={handleClose} />
    </>
  );
};

export { WithdrawForm };
