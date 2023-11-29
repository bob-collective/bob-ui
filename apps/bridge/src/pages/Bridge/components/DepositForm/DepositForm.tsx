import { Card, Flex, Span, TokenInput } from '@interlay/ui';

import { TransactionDetails } from '../TransactionDetails';

import { StyledChain } from './DepositForm.style';

const ETH = () => (
  <svg
    fill='none'
    height='24'
    viewBox='0 0 24 24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <rect fill='url(#pattern0)' height='24' width='24' />
    <defs>
      <pattern height='1' id='pattern0' patternContentUnits='objectBoundingBox' width='1'>
        <use transform='scale(0.03125)' xlinkHref='#image0_773_2037' />
      </pattern>
      <image
        height='32'
        id='image0_773_2037'
        width='32'
        xlinkHref='data:image/png;base64,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'
      />
    </defs>
  </svg>
);

const BOB = () => (
  <svg fill='none' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='12' cy='12' fill='black' r='11.5' stroke='#C46F08' />
    <path d='M6.62061 3.3103H11.5861V8.27582H6.62061V3.3103Z' fill='#D9D9D9' />
    <path d='M6.62061 9.10341H11.5861V14.0689H6.62061V9.10341Z' fill='#D9D9D9' />
    <path d='M6.62061 14.8965H11.5861V19.862H6.62061V14.8965Z' fill='#D9D9D9' />
    <path d='M12.4137 9.10341H17.3792V14.0689H12.4137V9.10341Z' fill='#C46F08' />
    <path d='M12.4137 14.8965H17.3792V19.862H12.4137V14.8965Z' fill='#C46F08' />
  </svg>
);

// eslint-disable-next-line @typescript-eslint/ban-types
type DepositFormProps = {};

// eslint-disable-next-line no-empty-pattern
const DepositForm = ({}: DepositFormProps): JSX.Element => {
  return (
    <Flex direction='column'>
      <form>
        <Flex direction='column' gap='spacing6'>
          <Flex wrap gap='spacing2'>
            <Flex direction='column' flex={1} gap='spacing1'>
              <Span size='xs'>From</Span>
              <Card background='secondary' padding='spacing3' shadowed={false} variant='bordered'>
                <StyledChain alignItems='center' direction='row' gap='spacing1'>
                  <ETH />
                  <Span size='s' weight='semibold'>
                    Etheruem
                  </Span>
                </StyledChain>
              </Card>
            </Flex>
            <Flex direction='column' flex={1} gap='spacing1'>
              <Span size='xs'>To</Span>
              <Card background='secondary' padding='spacing3' shadowed={false} variant='bordered'>
                <StyledChain alignItems='center' direction='row' gap='spacing1'>
                  <BOB />
                  <Span size='s' weight='semibold'>
                    BOB
                  </Span>
                </StyledChain>
              </Card>
            </Flex>
          </Flex>
          <TokenInput label='Amount' placeholder='0.00' ticker='ETH' valueUSD={0} />
          <TransactionDetails />
        </Flex>
      </form>
    </Flex>
  );
};

export { DepositForm };
