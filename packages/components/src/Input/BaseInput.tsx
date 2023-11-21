import { Sizes } from '@interlay/theme';
import { FocusEvent, forwardRef, InputHTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';

import { Field, FieldProps, useFieldProps } from '../Field';
import { HelperTextProps } from '../HelperText';
import { LabelProps } from '../Label';
import { hasError } from '../utils/input';

import { Adornment, StyledBaseInput } from './Input.style';

type Props = {
  label?: ReactNode;
  labelProps?: LabelProps;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  bottomAdornment?: ReactNode;
  value?: string | ReadonlyArray<string> | number;
  defaultValue?: string | ReadonlyArray<string> | number;
  size?: Sizes;
  isInvalid?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<Element>) => void;
  onBlur?: (e: FocusEvent<Element>) => void;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
};

type InheritAttrs = Omit<
  HelperTextProps &
    Pick<FieldProps, 'label' | 'labelPosition' | 'labelProps' | 'maxWidth' | 'justifyContent' | 'alignItems'>,
  keyof Props
>;
type BaseInputProps = Props & InheritAttrs;

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    { startAdornment, endAdornment, bottomAdornment, size = 'medium', isInvalid, inputProps, ...props },
    ref
  ): JSX.Element => {
    const endAdornmentRef = useRef<HTMLDivElement>(null);
    const [endAdornmentWidth, setEndAdornmentWidth] = useState(0);

    // FIXME: move this into Field
    const { fieldProps } = useFieldProps(props);

    useEffect(() => {
      if (!endAdornmentRef.current || !endAdornment) return;

      setEndAdornmentWidth(endAdornmentRef.current.getBoundingClientRect().width);
    }, [endAdornment]);

    const error = hasError({ isInvalid, errorMessage: props.errorMessage });

    return (
      <Field {...fieldProps}>
        {startAdornment && <Adornment $position='left'>{startAdornment}</Adornment>}
        <StyledBaseInput
          ref={ref}
          $adornments={{ bottom: !!bottomAdornment, left: !!startAdornment, right: !!endAdornment }}
          $endAdornmentWidth={endAdornmentWidth}
          $hasError={error}
          $isDisabled={!!inputProps.disabled}
          $size={size}
          {...inputProps}
        />
        {bottomAdornment && <Adornment $position='bottom'>{bottomAdornment}</Adornment>}
        {endAdornment && (
          <Adornment ref={endAdornmentRef} $position='right'>
            {endAdornment}
          </Adornment>
        )}
      </Field>
    );
  }
);

BaseInput.displayName = 'BaseInput';

export { BaseInput };
export type { BaseInputProps };
