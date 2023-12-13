import { MessageDirection } from '@eth-optimism/sdk';
import { Flex, FlexProps, P, Span } from '@interlay/ui';
import { printEther } from '../../utils/format';

import { BOB } from '../BOB';
import { ETH } from '../ETH';

import { StyledPill } from './BridgeDetails.style';

// FIXME: move this elsewhere (rui)
const PointRight = () => (
  <svg fill='none' height='8' viewBox='0 0 16 8' width='16' xmlns='http://www.w3.org/2000/svg'>
    <path d='M12.01 3H0V5H12.01V8L16 4L12.01 0V3Z' fill='white' fillOpacity='0.4' />
  </svg>
);

type Props = { amount: bigint | undefined; transferDirection: MessageDirection | undefined };

type InheritAttrs = Omit<FlexProps, keyof Props | 'children'>;

type BridgeDetailsProps = Props & InheritAttrs;

const BridgeDetails = ({ amount, transferDirection, ...props }: BridgeDetailsProps): JSX.Element | null => {
  return (
    <Flex alignSelf='normal' gap='spacing4' {...props}>
      <Flex alignItems='center' alignSelf='normal' gap='spacing6'>
        <Flex alignItems='center' flex={1} gap='spacing2' justifyContent='flex-end'>
          {transferDirection === MessageDirection.L1_TO_L2 ? (
            <>
              <ETH />
              <Span size='xs' weight='semibold'>
                Sepolia
              </Span>
            </>
          ) : (
            <>
              <BOB />
              <Span size='xs' weight='semibold'>
                BOB
              </Span>
            </>
          )}
        </Flex>
        <PointRight />
        <Flex alignItems='center' flex={1} gap='spacing2'>
          {transferDirection === MessageDirection.L2_TO_L1 ? (
            <>
              <ETH />
              <Span size='xs' weight='semibold'>
                Sepolia
              </Span>
            </>
          ) : (
            <>
              <BOB />
              <Span size='xs' weight='semibold'>
                BOB
              </Span>
            </>
          )}
        </Flex>
      </Flex>
      <StyledPill alignItems='center' background='secondary' shadowed={false}>
        <P size='xs' weight='medium'>
          {printEther(amount || 0n)} ETH
        </P>
      </StyledPill>
    </Flex>
  );
};

export { BridgeDetails };
export type { BridgeDetailsProps };
