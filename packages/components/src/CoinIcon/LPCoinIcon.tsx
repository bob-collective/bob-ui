import { forwardRef, useCallback } from 'react';
import { Icon } from '@interlay/icons';

import { CoinIconProps } from './CoinIcon';
import { FallbackIcon } from './FallbackIcon';
import { CoinComponent } from './types';

type Props = {
  tickers: string[];
  data: Record<string, CoinComponent>;
};

type InheritAttrs = Omit<CoinIconProps, keyof Props>;

type LPCoinIconProps = Props & InheritAttrs;

const LPCoinIcon = forwardRef<SVGSVGElement, LPCoinIconProps>(
  ({ tickers, size = 'md', ticker, data, ...props }, ref): JSX.Element => {
    const [tickerA, tickerB, tickerC, tickerD] = tickers;

    const getIcon = useCallback(
      (ticker: string) => data[ticker] || (() => <FallbackIcon size={size} ticker={ticker} />),
      [size]
    );

    const IconA = getIcon(tickerA);
    const IconB = getIcon(tickerB);

    if (tickers.length === 2) {
      return (
        <Icon ref={ref} size={size} {...props}>
          <title>{ticker}</title>
          <IconA height='70%' size={size} width='70%' y='15%' />
          <IconB height='70%' size={size} width='70%' x='30%' y='15%' />
        </Icon>
      );
    }

    const IconC = getIcon(tickerC);

    const hasIconD = !!tickerD;

    const IconD = hasIconD && getIcon(tickerD);

    const commonSize = {
      width: '60%',
      height: '60%'
    };

    return (
      <Icon ref={ref} size={size}>
        <title>{ticker}</title>
        <IconA size={size} {...commonSize} />
        <IconB size={size} x='40%' {...commonSize} />
        <IconC size={size} x={hasIconD ? '0' : '20%'} y='40%' {...commonSize} />
        {IconD && <IconD size={size} x='40%' y='40%' {...commonSize} />}
      </Icon>
    );
  }
);

LPCoinIcon.displayName = 'LPCoinIcon';

export { LPCoinIcon };
export type { LPCoinIconProps };
