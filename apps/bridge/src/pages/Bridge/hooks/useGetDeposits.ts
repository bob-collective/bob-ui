import { CrossChainMessenger, MessageStatus, TokenBridgeMessage } from '@eth-optimism/sdk';
import { useAccount } from '@gobob/wagmi';
import { useQuery } from '@tanstack/react-query';
import { HexString } from '../../../types/common';
import { useCrossChainMessenger } from './useCrossChainMessenger';

const getDepositStatus = (messenger: CrossChainMessenger, message: TokenBridgeMessage): Promise<MessageStatus> => {
  return messenger.getMessageStatus(message);
};

interface Deposit extends TokenBridgeMessage {
  status: MessageStatus;
}

const getDeposits = async (
  address: HexString | undefined,
  messenger: CrossChainMessenger | undefined
): Promise<Array<Deposit>> => {
  if (address && messenger) {
    const depositMessages = await messenger.getDepositsByAddress(address);
    const statuses = await Promise.all(depositMessages.map((message) => getDepositStatus(messenger, message)));

    const deposits = depositMessages.map((message, index) => ({ ...message, status: statuses[index] }));

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
    refetchInterval: 15 * 1000 // 15 seconds
  });

  return { data: deposits, refetch };
};

export { useGetDeposits };
