import { Flex, FlexProps, P, Span } from '@interlay/ui';

import { CrossChainTransferMessage } from '../../../../types/cross-chain';
import { BridgeDetails } from '../BridgeDetails';
import { BridgeStatusBadge } from '../BridgeStatusBadge';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { message: CrossChainTransferMessage | undefined };

type InheritAttrs = Omit<FlexProps, keyof Props | 'children'>;

type SubmittedStepProps = Props & InheritAttrs;

const SubmittedStep = ({ message, ...props }: SubmittedStepProps): JSX.Element | null => {
  return (
    <Flex direction='column' gap='spacing8' {...props}>
      <BridgeDetails justifyContent='center' message={message} />
      <Flex direction='column' gap='spacing2'>
        <BridgeStatusBadge status='ongoing' />
        <P size='xs'>
          Your assets will be delivered shortly, with an estimated arrival time of{' '}
          <Span color='secondary'>{message?.waitTime} seconds</Span>. We will provide you with updates accordingly. You
          can monitor the progress on your bridge page; it will be marked as complete once the process has concluded.
        </P>
      </Flex>
    </Flex>
  );
};

export { SubmittedStep };
export type { SubmittedStepProps };
