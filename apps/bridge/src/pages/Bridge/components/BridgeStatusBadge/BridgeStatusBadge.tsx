import { Flex, FlexProps, Span, TextLink } from '@interlay/ui';

import { Deposit } from '../../hooks/useGetDeposits';

import { StyledLoadingSpinner, StyledPill, StyledSpan } from './BridgeStatusBadge.style';

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

type Props = { status: 'ongoing' | 'completed'; deposit?: Deposit };

type InheritAttrs = Omit<FlexProps, keyof Props | 'children'>;

type BridgeStatusBadgeProps = Props & InheritAttrs;

const BridgeStatusBadge = ({
  deposit,
  status = 'completed',
  justifyContent = 'space-between',
  alignItems = 'center',
  gap = 'spacing2',
  ...props
}: BridgeStatusBadgeProps): JSX.Element | null => {
  const viewLink = (
    <TextLink external icon href={`https://sepolia.etherscan.io/tx/${deposit?.transactionHash}`} size='xs'>
      View
    </TextLink>
  );

  if (status === 'ongoing') {
    return (
      <Flex alignItems={alignItems} gap={gap} justifyContent={justifyContent} {...props}>
        <StyledPill $variant='green' alignItems='center' gap='spacing2'>
          <StyledLoadingSpinner color='secondary' size='xs' thickness={3} />
          <StyledSpan size='xs' weight='medium'>
            Est » {deposit?.waitTime || 0} seconds
          </StyledSpan>
        </StyledPill>
        {viewLink}
      </Flex>
    );
  }

  return (
    <Flex alignItems={alignItems} gap={gap} justifyContent={justifyContent} {...props}>
      <StyledPill $variant='normal' alignItems='center' gap='spacing2'>
        <CompleteSVG />
        <Span size='xs' weight='medium'>
          Bridge complete
        </Span>
      </StyledPill>
      {viewLink}
    </Flex>
  );
};

export { BridgeStatusBadge };
export type { BridgeStatusBadgeProps };
