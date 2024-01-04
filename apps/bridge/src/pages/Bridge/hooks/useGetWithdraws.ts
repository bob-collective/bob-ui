import { CrossChainMessenger, MessageStatus, TokenBridgeMessage } from '@eth-optimism/sdk';
import { useAccount } from '@gobob/wagmi';
import { useQuery } from '@gobob/react-query';

import { HexString } from '../../../types/common';
import { getDepositWaitTime } from '../constants/bridge';

import { useCrossChainMessenger } from './useCrossChainMessenger';

const getWithdrawstatusAndWaitTime = async (
  messenger: CrossChainMessenger,
  message: TokenBridgeMessage
): Promise<{ status: MessageStatus; waitTime: number }> => {
  const [status, waitTime] = await Promise.all([messenger.getMessageStatus(message), getDepositWaitTime()]);

  return { status, waitTime };
};

interface Withdraw extends TokenBridgeMessage {
  status: MessageStatus;
  waitTime: number;
}

const getWithdraws = async (
  address: HexString | undefined,
  messenger: CrossChainMessenger | undefined
): Promise<Array<Withdraw>> => {
  if (address && messenger) {
    const withdrawMessages = await messenger.getWithdrawalsByAddress(address);
    const extraData = await Promise.all(
      withdrawMessages.map((message) => getWithdrawstatusAndWaitTime(messenger, message))
    );

    const withdraws = withdrawMessages.map((message, index) => ({ ...message, ...extraData[index] }));

    return withdraws;
  }
  throw new Error('Address or messenger client is undefined.');
};

const useGetWithdraws = () => {
  const { withdraw: messenger } = useCrossChainMessenger();
  const { address } = useAccount();

  return useQuery({
    queryKey: ['user-withdraws', address],
    queryFn: () => getWithdraws(address, messenger),
    enabled: !!address && !!messenger,
    refetchInterval: 5 * 1000 // 15 seconds
  });
};

export { useGetWithdraws };
export type { Withdraw };
