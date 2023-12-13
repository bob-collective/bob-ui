import { CrossChainMessenger, MessageStatus, TokenBridgeMessage } from '@eth-optimism/sdk';
import { useAccount } from '@gobob/wagmi';
import { useQuery } from '@gobob/react-query';

import { HexString } from '../../../types/common';
import { getDepositWaitTime } from '../constants/bridge';

import { useCrossChainMessenger } from './useCrossChainMessenger';

const getDepositStatusAndWaitTime = async (
  messenger: CrossChainMessenger,
  message: TokenBridgeMessage
): Promise<{ status: MessageStatus; waitTime: number }> => {
  const [status, waitTime] = await Promise.all([messenger.getMessageStatus(message), getDepositWaitTime()]);

  return { status, waitTime };
};

interface Deposit extends TokenBridgeMessage {
  status: MessageStatus;
  waitTime: number;
}

const getDeposits = async (
  address: HexString | undefined,
  messenger: CrossChainMessenger | undefined
): Promise<Array<Deposit>> => {
  if (address && messenger) {
    const depositMessages = await messenger.getDepositsByAddress(address);
    const extraData = await Promise.all(
      depositMessages.map((message) => getDepositStatusAndWaitTime(messenger, message))
    );

    const deposits = depositMessages.map((message, index) => ({ ...message, ...extraData[index] }));

    return deposits;
  }
  throw new Error('Address or messenger client is undefined.');
};

const useGetDeposits = () => {
  const { deposit: messenger } = useCrossChainMessenger();
  const { address } = useAccount();

  const { data: deposits, refetch } = useQuery({
    queryKey: ['user-deposits', address],
    queryFn: () => getDeposits(address, messenger),
    enabled: !!address && !!messenger,
    refetchInterval: 5 * 1000 // 15 seconds
  });

  return { data: deposits, refetch };
};

export { useGetDeposits };
export type { Deposit };
