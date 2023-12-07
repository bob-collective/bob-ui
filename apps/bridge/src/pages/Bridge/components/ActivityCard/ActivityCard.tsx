import { Card, FlexProps } from '@interlay/ui';

import { BridgeDetails } from '../BridgeDetails';
import { BridgeStatusBadge } from '../BridgeStatusBadge';

type Props = { status: 'ongoing' | 'completed' };

type InheritAttrs = Omit<FlexProps, keyof Props | 'children'>;

type ActivityCardProps = Props & InheritAttrs;

const ActivityCard = ({ status = 'completed', ...props }: ActivityCardProps): JSX.Element | null => {
  return (
    <Card direction='column' gap='spacing4' {...props}>
      <BridgeDetails alignItems='center' justifyContent='space-between' />
      <BridgeStatusBadge status={status} />
    </Card>
  );
};

export { ActivityCard };
export type { ActivityCardProps };
