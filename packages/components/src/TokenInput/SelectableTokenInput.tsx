import { chain, useId } from '@react-aria/utils';
import { Key, ReactNode, forwardRef, useEffect, useState } from 'react';

import { HelperText } from '../HelperText';

import { BaseTokenInput, BaseTokenInputProps } from './BaseTokenInput';
import { TokenSelect, TokenSelectProps } from './TokenSelect';
import { TokenInputBalance } from './TokenInputBalance';

type Props = {
  balance?: string | number;
  humanBalance?: string | number;
  balanceLabel?: ReactNode;
  onClickBalance?: (balance: string | number) => void;
  selectProps: Omit<TokenSelectProps, 'label' | 'helperTextId'>;
};

type InheritAttrs = Omit<BaseTokenInputProps, keyof Props>;

type SelectableTokenInputProps = Props & InheritAttrs;

const SelectableTokenInput = forwardRef<HTMLInputElement, SelectableTokenInputProps>(
  (
    {
      selectProps,
      errorMessage,
      description,
      label,
      balance: balanceProp,
      id,
      isDisabled,
      balanceLabel,
      humanBalance,
      onClickBalance,
      ...props
    },
    ref
  ): JSX.Element => {
    const selectHelperTextId = useId();

    const [ticker, setTicker] = useState<string | undefined>(selectProps?.defaultValue?.toString());

    useEffect(() => {
      const value = selectProps?.value;

      if (value === undefined) return;

      setTicker(value.toString());
    }, [selectProps?.value]);

    const handleTokenChange = (ticker: Key) => setTicker(ticker as string);

    // Prioritise Number Input description and error message
    const hasNumberFieldMessages = !!(errorMessage || description);
    const shouldDisplayHelperText =
      !hasNumberFieldMessages && !!(selectProps?.errorMessage || selectProps?.description);

    const isInvalid = !hasNumberFieldMessages && !!selectProps?.errorMessage;

    const { onSelectionChange, ...restSelectProps } = selectProps;

    const endAdornment = (
      <TokenSelect
        {...restSelectProps}
        aria-describedby={shouldDisplayHelperText ? selectHelperTextId : undefined}
        description={undefined}
        errorMessage={undefined}
        isInvalid={isInvalid}
        value={ticker}
        onSelectionChange={chain(onSelectionChange, handleTokenChange)}
      />
    );

    const balance = balanceProp !== undefined && (
      <TokenInputBalance
        balance={ticker ? humanBalance || balanceProp : 0}
        balanceHuman={humanBalance}
        inputId={id}
        isDisabled={isDisabled || !ticker}
        label={balanceLabel}
        onClickBalance={onClickBalance}
      />
    );

    return (
      <BaseTokenInput
        ref={ref}
        balance={balance}
        description={description}
        endAdornment={endAdornment}
        errorMessage={errorMessage}
        id={id}
        isDisabled={isDisabled}
        label={label}
        {...props}
      >
        {shouldDisplayHelperText && (
          <HelperText
            description={selectProps?.description}
            errorMessage={selectProps?.errorMessage}
            id={selectHelperTextId}
          />
        )}
      </BaseTokenInput>
    );
  }
);

SelectableTokenInput.displayName = 'SelectableTokenInput';

export { SelectableTokenInput };
export type { SelectableTokenInputProps };
