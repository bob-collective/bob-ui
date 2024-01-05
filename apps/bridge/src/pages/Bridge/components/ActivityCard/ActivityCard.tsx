import { Card, FlexProps } from '@interlay/ui';

import { BridgeDetails } from '../BridgeDetails';
import { BridgeStatusBadge } from '../BridgeStatusBadge';
import { Transaction } from '../../hooks/useGetTransactions';

type Props = { data: Transaction };

type InheritAttrs = Omit<FlexProps, keyof Props | 'children'>;

type ActivityCardProps = Props & InheritAttrs;

const ActivityCard = ({ data, ...props }: ActivityCardProps): JSX.Element => {
  return (
    <Card direction='column' gap='spacing4' {...props}>
      <BridgeDetails
        alignItems='center'
        amount={BigInt(data.amount.toString())}
        justifyContent='space-between'
        transferDirection={data.direction}
      />
      <BridgeStatusBadge
        direction={data.direction}
        status={data.status}
        transactionHash={data.transactionHash}
        waitTime={data.waitTime}
      />
    </Card>
  );
};

export { ActivityCard };
export type { ActivityCardProps };
