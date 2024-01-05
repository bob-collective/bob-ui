import { CrossChainMessenger, MessageDirection, MessageStatus, TokenBridgeMessage } from '@eth-optimism/sdk';
import { useQuery } from '@gobob/react-query';
import { L1_CHAIN_ID, L2_CHAIN_ID, useAccount } from '@gobob/wagmi';

import { HexString } from '../../../types/common';
import { getDepositWaitTime } from '../constants/bridge';

import { FallbackProvider, JsonRpcProvider } from '@ethersproject/providers';
import { useCrossChainMessenger } from './useCrossChainMessenger';
import { useEthersProvider } from './useEthersProvider';

const getTransactionDate = async (transactionHash: string, provider: FallbackProvider | JsonRpcProvider) => {
  const transactionReceipt = await provider.getTransactionReceipt(transactionHash);

  const block = await provider.getBlock(transactionReceipt.blockNumber);

  return new Date(block.timestamp * 1000);
};

const getTransactionstatusAndWaitTime = async (
  messenger: CrossChainMessenger,
  message: TokenBridgeMessage,
  provider: FallbackProvider | JsonRpcProvider
) => {
  const [status, waitTime, date] = await Promise.all([
    messenger.getMessageStatus(message),
    // TODO: implement
    getDepositWaitTime(),
    getTransactionDate(message.transactionHash, provider)
  ]);

  if (status === MessageStatus.IN_CHALLENGE_PERIOD) {
    const waitTime = await messenger.estimateMessageWaitTimeSeconds(message);

    return { status, waitTime, date };
  }

  return { status, waitTime, date };
};

interface Transaction extends TokenBridgeMessage {
  status: MessageStatus;
  waitTime: number;
  date: Date;
}

const getTransactions = async (
  address: HexString | undefined,
  messenger: CrossChainMessenger | null,
  l1Provider: FallbackProvider | JsonRpcProvider,
  l2Provider: FallbackProvider | JsonRpcProvider
): Promise<Array<Transaction>> => {
  if (address && messenger) {
    const depositMessages = await messenger.getDepositsByAddress(address).catch(() => []);
    const withdrawMessages = await messenger.getWithdrawalsByAddress(address);

    const messages = [...depositMessages, ...withdrawMessages];

    return Promise.all(
      messages.map(async (message) => ({
        ...message,
        ...(await getTransactionstatusAndWaitTime(
          messenger,
          message,
          message.direction === MessageDirection.L1_TO_L2 ? l1Provider : l2Provider
        ))
      }))
    );
  }
  throw new Error('Address or messenger client is undefined.');
};

const useGetTransactions = () => {
  const l1Provider = useEthersProvider({ chainId: L1_CHAIN_ID });
  const l2Provider = useEthersProvider({ chainId: L2_CHAIN_ID });
  const { messenger } = useCrossChainMessenger();

  const { address } = useAccount();

  return useQuery({
    queryKey: ['transactions', address],
    queryFn: () => getTransactions(address, messenger, l1Provider, l2Provider),
    enabled: !!address && !!messenger,
    refetchInterval: 5 * 1000 // 15 seconds
  });
};

export { useGetTransactions };
export type { Transaction };
