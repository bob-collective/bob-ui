import { MessageDirection } from '@eth-optimism/sdk';
import { Flex, FlexProps, P, Span } from '@interlay/ui';

import { formatDuration } from 'date-fns';
import { CrossChainTransferMessage } from '../../../../types/cross-chain';
import { BridgeDetails } from '../BridgeDetails';
import { BridgeStatusBadge } from '../BridgeStatusBadge';

type Props = { message: Required<CrossChainTransferMessage> };

type InheritAttrs = Omit<FlexProps, keyof Props | 'children'>;

type SubmittedStepProps = Props & InheritAttrs;

const SubmittedStep = ({ message, ...props }: SubmittedStepProps): JSX.Element => (
  <Flex direction='column' gap='spacing8' {...props}>
    <BridgeDetails amount={message?.amount} justifyContent='center' transferDirection={message?.direction} />
    <Flex direction='column' gap='spacing2'>
      <BridgeStatusBadge
        direction={message.direction}
        status={message.status}
        transactionHash={message.transactionHash}
        waitTime={message.waitTime}
      />
      <P size='xs'>
        Your assets will be delivered shortly, with an estimated arrival time of{' '}
        <Span color='secondary'>
          {message.direction === MessageDirection.L1_TO_L2
            ? formatDuration({ seconds: message.waitTime }, { format: ['seconds'] })
            : '7 days'}
        </Span>
        {message.direction === MessageDirection.L2_TO_L1 ? ', due to the challenge period' : ''}. We will provide you
        with updates accordingly. You can monitor the progress on your bridge page; it will be marked as complete once
        the process has concluded.
      </P>
    </Flex>
  </Flex>
);

export { SubmittedStep };
export type { SubmittedStepProps };
