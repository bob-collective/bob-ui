import { useDOMRef } from '@interlay/hooks';
import { mergeProps, useId } from '@react-aria/utils';
import { ChangeEvent, FocusEvent, forwardRef, useEffect, useState } from 'react';

import { FixedTokenInput, FixedTokenInputProps } from './FixedTokenInput';
import { SelectableTokenInput, SelectableTokenInputProps } from './SelectableTokenInput';

type Props = {
  onValueChange?: (value?: string | number) => void;
};

type FixedAttrs = Omit<FixedTokenInputProps, keyof Props>;

type SelectableAttrs = Omit<SelectableTokenInputProps, keyof Props>;

type InheritAttrs = ({ type?: 'fixed' } & FixedAttrs) | ({ type?: 'selectable' } & SelectableAttrs);

type TokenInputProps = Props & InheritAttrs;

const TokenInput = forwardRef<HTMLInputElement, TokenInputProps>(
  ({ type = 'fixed', defaultValue, value: valueProp, onValueChange, balance, onBlur, ...props }, ref): JSX.Element => {
    const inputRef = useDOMRef<HTMLInputElement>(ref);

    const [value, setValue] = useState(defaultValue);

    const inputId = useId();

    useEffect(() => {
      if (valueProp === undefined) return;

      setValue(valueProp);
    }, [valueProp]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      onValueChange?.(value);
      setValue(value);
    };

    const handleClickBalance = (balance: string | number) => {
      inputRef.current?.focus();
      setValue(balance);
      onValueChange?.(balance);
    };

    const handleBlur = (e: FocusEvent<Element>) => {
      const relatedTargetEl = e.relatedTarget as HTMLButtonElement;

      if (!relatedTargetEl || !relatedTargetEl.getAttribute) {
        return onBlur?.(e);
      }

      const isTargetingMaxBtn = relatedTargetEl.getAttribute('aria-controls') === inputId;

      if (!isTargetingMaxBtn) {
        onBlur?.(e);
      }
    };

    const numberInputProps: Partial<TokenInputProps> =
      balance !== undefined
        ? {
            id: inputId,
            balance,
            onBlur: handleBlur,
            onClickBalance: handleClickBalance
          }
        : { onBlur };

    const commonProps = {
      ...numberInputProps,
      ref: inputRef,
      value,
      onChange: handleChange
    };

    if (type === 'selectable') {
      return <SelectableTokenInput {...mergeProps(props, commonProps)} />;
    }

    return <FixedTokenInput {...mergeProps(props, commonProps)} />;
  }
);

TokenInput.displayName = 'TokenInput';

export { TokenInput };
export type { TokenInputProps };
