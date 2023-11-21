import { useLabel } from '@react-aria/label';
import { mergeProps } from '@react-aria/utils';
import { forwardRef, ReactNode } from 'react';
import { useCurrencyFormatter } from '@interlay/hooks';

import { Flex } from '../Flex';
import { NumberInput, NumberInputProps } from '../NumberInput';

import { TokenInputLabel } from './TokenInputLabel';
import { StyledUSDAdornment } from './TokenInput.style';

type Props = {
  valueUSD?: number;
  balance?: ReactNode;
};

type InheritAttrs = Omit<NumberInputProps, keyof Props>;

type BaseTokenInputProps = Props & InheritAttrs;

const BaseTokenInput = forwardRef<HTMLInputElement, BaseTokenInputProps>(
  (
    {
      label,
      style,
      hidden,
      className,
      placeholder = '0',
      errorMessage,
      description,
      balance,
      children,
      valueUSD,
      isDisabled,
      ...props
    },
    ref
  ): JSX.Element => {
    const format = useCurrencyFormatter();
    const { labelProps, fieldProps } = useLabel({ label, ...props });

    const hasLabel = !!label || !!balance;

    const bottomAdornment = valueUSD !== undefined && (
      <StyledUSDAdornment $isDisabled={isDisabled}>{format(valueUSD)}</StyledUSDAdornment>
    );

    return (
      <Flex className={className} direction='column' gap='spacing0' hidden={hidden} style={style}>
        {hasLabel && (
          <TokenInputLabel {...labelProps} balance={balance}>
            {label}
          </TokenInputLabel>
        )}
        <NumberInput
          ref={ref}
          bottomAdornment={bottomAdornment}
          description={description}
          errorMessage={errorMessage}
          inputMode='decimal'
          isDisabled={isDisabled}
          maxLength={79}
          minLength={1}
          pattern='^[0-9]*[.,]?[0-9]*$'
          placeholder={placeholder}
          size='large'
          {...mergeProps(props, fieldProps)}
        />
        {children}
      </Flex>
    );
  }
);

BaseTokenInput.displayName = 'BaseTokenInput';

export { BaseTokenInput };
export type { BaseTokenInputProps };
