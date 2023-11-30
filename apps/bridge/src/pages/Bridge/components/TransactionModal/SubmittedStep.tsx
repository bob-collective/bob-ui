import { Flex, FlexProps, P, Span } from '@interlay/ui';

import { BridgeDetails } from '../BridgeDetails';
import { BridgeStatusBadge } from '../BridgeStatusBadge';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

type InheritAttrs = Omit<FlexProps, keyof Props | 'children'>;

type SubmittedStepProps = Props & InheritAttrs;

const SubmittedStep = ({ ...props }: SubmittedStepProps): JSX.Element | null => {
  const time = '4m 4s';

  return (
    <Flex direction='column' gap='spacing8' {...props}>
      <BridgeDetails justifyContent='center' />
      <Flex direction='column' gap='spacing2'>
        <BridgeStatusBadge status='ongoing' />
        <P size='xs'>
          Your assets will be delivered shortly, with an estimated arrival time of <Span color='secondary'>{time}</Span>
          . We will provide you with updates accordingly. You can monitor the progress on your bridge page; it will be
          marked as complete once the process has concluded.
        </P>
      </Flex>
    </Flex>
  );
};

export { SubmittedStep };
export type { SubmittedStepProps };
