import { Card, FlexProps } from '@interlay/ui';

import { Deposit } from '../../hooks/useGetDeposits';
import { BridgeDetails } from '../BridgeDetails';
import { BridgeStatusBadge } from '../BridgeStatusBadge';

type Props = { status: 'ongoing' | 'completed'; deposit: Deposit };

type InheritAttrs = Omit<FlexProps, keyof Props | 'children'>;

type ActivityCardProps = Props & InheritAttrs;

const ActivityCard = ({ status = 'completed', deposit, ...props }: ActivityCardProps): JSX.Element | null => {
  return (
    <Card direction='column' gap='spacing4' {...props}>
      <BridgeDetails
        alignItems='center'
        amount={BigInt(deposit.amount.toString())}
        justifyContent='space-between'
        transferDirection={deposit.direction}
      />
      <BridgeStatusBadge deposit={deposit} status={status} />
    </Card>
  );
};

export { ActivityCard };
export type { ActivityCardProps };
