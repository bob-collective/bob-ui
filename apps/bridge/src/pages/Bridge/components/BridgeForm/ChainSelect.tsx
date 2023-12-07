import { Card, Flex, Span } from '@interlay/ui';
import { Label } from '@interlay/ui';

import { ETH } from '../ETH';
import { BOB } from '../BOB';

import { StyledChain } from './BridgeForm.style';

// TODO: do this diferently when introduction Currency types
const tickers = {
  ETH: ETH,
  BOB: BOB
} as const;

type Props = { label: string; ticker: 'ETH' | 'BOB'; name: string };

type ChainSelectProps = Props;

const ChainSelect = ({ label, ticker = 'ETH', name }: ChainSelectProps): JSX.Element => {
  const Chain = tickers[ticker];

  // FIXME: Label should not be used without a connection to an element (this might change when Select is introduced)
  return (
    <Flex direction='column' flex={1}>
      <Label>{label}</Label>
      <Card background='secondary' padding='spacing3' shadowed={false} variant='bordered'>
        <StyledChain alignItems='center' direction='row' gap='spacing2'>
          <Chain />
          <Span size='s' weight='semibold'>
            {name}
          </Span>
        </StyledChain>
      </Card>
    </Flex>
  );
};

export { ChainSelect };
