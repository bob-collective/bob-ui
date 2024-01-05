import { Flex, FlexProps, Span, TextLink } from '@interlay/ui';
import { MessageStatus, MessageDirection } from '@eth-optimism/sdk';

import { StyledLoadingSpinner, StyledPill, StyledSpan } from './BridgeStatusBadge.style';
import { useCountDown } from 'ahooks';
import { addSeconds } from 'date-fns';

const ChallengeBadge = ({ waitTime }: { waitTime: number }) => {
  const [, formattedRes] = useCountDown({
    targetDate: addSeconds(new Date(), waitTime)
  });

  const { hours, minutes, seconds } = formattedRes;

  return (
    <StyledPill $variant='green' alignItems='center' gap='spacing2'>
      <StyledLoadingSpinner color='secondary' size='xs' thickness={3} />
      <StyledSpan size='xs' weight='medium'>
        Est » Challenge Period {hours}D {minutes}H {seconds}M
      </StyledSpan>
    </StyledPill>
  );
};

// FIXME: rui will fix this later
const CompleteSVG = () => (
  <svg fill='none' height='14' viewBox='0 0 14 14' width='14' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_721_4026)'>
      <path
        d='M7.00008 1.16675C3.78008 1.16675 1.16675 3.78008 1.16675 7.00008C1.16675 10.2201 3.78008 12.8334 7.00008 12.8334C10.2201 12.8334 12.8334 10.2201 12.8334 7.00008C12.8334 3.78008 10.2201 1.16675 7.00008 1.16675ZM5.83342 9.91675L2.91675 7.00008L3.73925 6.17758L5.83342 8.26592L10.2609 3.83841L11.0834 4.66675L5.83342 9.91675Z'
        fill='white'
      />
    </g>
    <defs>
      <clipPath id='clip0_721_4026'>
        <rect fill='white' height='14' width='14' />
      </clipPath>
    </defs>
  </svg>
);

type Props = { status: MessageStatus; direction: MessageDirection; waitTime: number; transactionHash: string };

type InheritAttrs = Omit<FlexProps, keyof Props | 'children'>;

type BridgeStatusBadgeProps = Props & InheritAttrs;

const BridgeStatusBadge = ({
  status: statusProp,
  direction,
  waitTime,
  transactionHash,
  justifyContent = 'space-between',
  alignItems = 'center',
  gap = 'spacing2',
  ...props
}: BridgeStatusBadgeProps): JSX.Element | null => {
  const status =
    statusProp === MessageStatus.RELAYED
      ? 'completed'
      : statusProp === MessageStatus.FAILED_L1_TO_L2_MESSAGE
        ? 'failed'
        : 'ongoing';

  const txUrl =
    direction === MessageDirection.L1_TO_L2
      ? `https://sepolia.etherscan.io/tx/${transactionHash}`
      : `https://explorerl2new-puff-bob-jznbxtoq7h.t.conduit.xyz/tx/${transactionHash}`;

  const viewLink = (
    <TextLink external icon href={txUrl} size='xs'>
      View
    </TextLink>
  );
  console.log(statusProp);

  if (statusProp === MessageStatus.IN_CHALLENGE_PERIOD) {
    return (
      <Flex alignItems={alignItems} gap={gap} justifyContent={justifyContent} {...props}>
        <ChallengeBadge waitTime={waitTime} />
        {viewLink}
      </Flex>
    );
  }

  if (status === 'ongoing') {
    const label =
      statusProp === MessageStatus.READY_TO_PROVE ? 'Waiting to be proved by L1' : `Est » ${waitTime} seconds`;

    return (
      <Flex alignItems={alignItems} gap={gap} justifyContent={justifyContent} {...props}>
        <StyledPill $variant='green' alignItems='center' gap='spacing2'>
          <StyledLoadingSpinner color='secondary' size='xs' thickness={3} />
          <StyledSpan size='xs' weight='medium'>
            {label}
          </StyledSpan>
        </StyledPill>
        {viewLink}
      </Flex>
    );
  }

  return (
    <Flex alignItems={alignItems} gap={gap} justifyContent={justifyContent} {...props}>
      <StyledPill $variant='normal' alignItems='center' gap='spacing2'>
        {<CompleteSVG />}
        <Span size='xs' weight='medium'>
          Bridge {status === 'completed' ? 'complete' : 'failed'}
        </Span>
      </StyledPill>
      {viewLink}
    </Flex>
  );
};

export { BridgeStatusBadge };
export type { BridgeStatusBadgeProps };
