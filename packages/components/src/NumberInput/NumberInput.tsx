import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import { mergeProps } from '@react-aria/utils';
import { ChangeEventHandler, forwardRef, useEffect, useState } from 'react';
import { useDOMRef } from '@interlay/hooks';

import { BaseInput, BaseInputProps } from '../Input';

const escapeRegExp = (string: string): string => {
  // $& means the whole matched string
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const inputModeRegex = {
  numeric: /^[0-9\b]+$/,
  // match escaped "." characters via in a non-capturing group
  decimal: RegExp(`^\\d*(?:\\\\[.])?\\d*$`)
} as const;

type Props = {
  value?: string | number;
  defaultValue?: string | number;
  onValueChange?: (value: string | number) => void;
  inputMode?: 'numeric' | 'decimal';
};

type InheritAttrs = Omit<BaseInputProps, keyof Props | 'errorMessageProps' | 'descriptionProps' | 'inputProps'>;

type AriaAttrs = Omit<AriaTextFieldOptions<'input'>, keyof (Props & InheritAttrs)>;

type NumberInputProps = Props & InheritAttrs & AriaAttrs;

// FIXME: some event are running duplicate
const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { onChange, onValueChange, isInvalid, value: valueProp, defaultValue = '', inputMode = 'numeric', ...props },
    ref
  ): JSX.Element => {
    const [value, setValue] = useState<string | undefined>(defaultValue?.toString());
    const inputRef = useDOMRef(ref);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const value = e.target.value;

      const isValid = value === '' || inputModeRegex[inputMode].test(escapeRegExp(value));

      if (isValid) {
        onChange?.(e);
        onValueChange?.(value);
        setValue(value);
      }
    };

    const { inputProps, descriptionProps, errorMessageProps, labelProps } = useTextField(
      {
        ...props,
        inputMode,
        isInvalid: isInvalid || !!props.errorMessage,
        value: value,
        autoComplete: 'off'
      },
      inputRef
    );

    useEffect(() => {
      if (valueProp === undefined) return;

      setValue(valueProp.toString());
    }, [valueProp]);

    return (
      <BaseInput
        ref={inputRef}
        autoCorrect='off'
        descriptionProps={descriptionProps}
        errorMessageProps={errorMessageProps}
        inputProps={mergeProps(inputProps, { onChange: handleChange })}
        labelProps={labelProps}
        spellCheck='false'
        {...props}
      />
    );
  }
);

NumberInput.displayName = 'NumberInput';

export { NumberInput };
export type { NumberInputProps };
