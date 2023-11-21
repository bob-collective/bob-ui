import { ReactNode, forwardRef } from 'react';

import { TokenAdornment, TokenTicker } from './TokenAdornment';
import { BaseTokenInput, BaseTokenInputProps } from './BaseTokenInput';
import { TokenInputBalance } from './TokenInputBalance';

type Props = {
  balance?: string | number;
  humanBalance?: string | number;
  balanceLabel?: ReactNode;
  onClickBalance?: (balance: string | number) => void;
  ticker: TokenTicker;
};

type InheritAttrs = Omit<BaseTokenInputProps, keyof Props>;

type FixedTokenInputProps = Props & InheritAttrs;

const FixedTokenInput = forwardRef<HTMLInputElement, FixedTokenInputProps>(
  (
    { balance: balanceProp, humanBalance, balanceLabel, onClickBalance, ticker: tickerProp, isDisabled, id, ...props },
    ref
  ): JSX.Element => {
    const balance = balanceProp !== undefined && (
      <TokenInputBalance
        balance={balanceProp}
        balanceHuman={humanBalance}
        inputId={id}
        isDisabled={isDisabled}
        label={balanceLabel}
        onClickBalance={onClickBalance}
      />
    );

    return (
      <BaseTokenInput
        ref={ref}
        balance={balance}
        endAdornment={<TokenAdornment ticker={tickerProp} />}
        id={id}
        isDisabled={isDisabled}
        {...props}
      />
    );
  }
);

FixedTokenInput.displayName = 'FixedTokenInput';

export { FixedTokenInput };
export type { FixedTokenInputProps };
