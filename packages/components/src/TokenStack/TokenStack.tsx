import { IconSize } from '@interlay/theme';

import { CoinIcon } from '../CoinIcon';
import { FlexProps } from '../Flex';

import { StyledWrapper, TokenOffset } from './TokenStack.style';

type Props = {
  tickers: string[];
  size?: IconSize;
  offset?: TokenOffset;
};

type InheritAttrs = Omit<FlexProps, keyof Props>;

type TokenStackProps = Props & InheritAttrs;

const TokenStack = ({ tickers, gap, size = 'md', offset = 'md', ...props }: TokenStackProps): JSX.Element => (
  <StyledWrapper $offset={offset} $size={size} gap={gap} {...props}>
    {tickers.map((ticker, key) => (
      <CoinIcon key={`${ticker}-${key}`} size={size} ticker={ticker} />
    ))}
  </StyledWrapper>
);

export { TokenStack };
export type { TokenStackProps };
