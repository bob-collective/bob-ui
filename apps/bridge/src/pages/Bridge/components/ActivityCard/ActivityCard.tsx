import { Card, FlexProps } from '@interlay/ui';
import { MessageStatus, MessageDirection } from '@eth-optimism/sdk';

import { Deposit } from '../../hooks/useGetDeposits';
import { BridgeDetails } from '../BridgeDetails';
import { BridgeStatusBadge } from '../BridgeStatusBadge';
import { Withdraw } from '../../hooks/useGetWithdraws';

type Props = { data: Deposit | Withdraw };

type InheritAttrs = Omit<FlexProps, keyof Props | 'children'>;

type ActivityCardProps = Props & InheritAttrs;

const ActivityCard = ({ data, ...props }: ActivityCardProps): JSX.Element => {
  const status =
    data.status === MessageStatus.RELAYED
      ? 'completed'
      : data.status === MessageStatus.FAILED_L1_TO_L2_MESSAGE
        ? 'failed'
        : 'ongoing';

  const txUrl =
    data.direction === MessageDirection.L1_TO_L2
      ? `https://sepolia.etherscan.io/tx/${data.transactionHash}`
      : `https://explorerl2new-puff-bob-jznbxtoq7h.t.conduit.xyz/tx/${data.transactionHash}`;

  return (
    <Card direction='column' gap='spacing4' {...props}>
      <BridgeDetails
        alignItems='center'
        amount={BigInt(data.amount.toString())}
        justifyContent='space-between'
        transferDirection={data.direction}
      />
      <BridgeStatusBadge txUrl={txUrl} status={status} waitTime={data.waitTime} />
    </Card>
  );
};

export { ActivityCard };
export type { ActivityCardProps };
