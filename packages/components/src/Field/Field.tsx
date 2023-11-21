import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { LabelPosition, Spacing } from '@interlay/theme';

import { Flex, FlexProps } from '../Flex';
import { HelperText, HelperTextProps } from '../HelperText';
import { Label, LabelProps } from '../Label';
import { hasError } from '../utils/input';

import { StyledField } from './Field.style';

type Props = {
  label?: ReactNode;
  labelPosition?: LabelPosition;
  labelProps?: LabelProps;
  maxWidth?: Spacing;
};

type NativeAttrs = Omit<HTMLAttributes<unknown>, keyof Props>;

type InheritAttrs = Omit<HelperTextProps & FlexProps, keyof Props & NativeAttrs>;

type FieldProps = Props & NativeAttrs & InheritAttrs;

const Field = forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      label,
      labelPosition = 'top',
      labelProps,
      errorMessage,
      errorMessageProps,
      description,
      descriptionProps,
      children,
      maxWidth,
      ...props
    },
    ref
  ): JSX.Element => {
    const error = hasError({ errorMessage });
    const hasHelpText = !!description || error;

    const element = (
      <>
        <StyledField $maxWidth={maxWidth}>{children}</StyledField>
        {hasHelpText && (
          <HelperText
            description={description}
            descriptionProps={descriptionProps}
            errorMessage={errorMessage}
            errorMessageProps={errorMessageProps}
          />
        )}
      </>
    );

    return (
      <Flex ref={ref} direction={labelPosition === 'top' ? 'column' : 'row'} {...props}>
        {label && (
          <Label {...labelProps} position={labelPosition}>
            {label}
          </Label>
        )}
        {labelPosition === 'top' ? (
          element
        ) : (
          <Flex alignItems='flex-end' direction='column'>
            {element}
          </Flex>
        )}
      </Flex>
    );
  }
);

Field.displayName = 'Field';

const useFieldProps = ({
  label,
  labelPosition,
  labelProps,
  errorMessage,
  errorMessageProps,
  description,
  descriptionProps,
  className,
  hidden,
  style,
  maxWidth,
  alignItems,
  justifyContent,
  gap,
  ...props
}: FieldProps): { fieldProps: FieldProps; elementProps: any } => {
  return {
    fieldProps: {
      label,
      labelPosition,
      labelProps,
      errorMessage,
      errorMessageProps,
      description,
      descriptionProps,
      className,
      hidden,
      style,
      maxWidth,
      alignItems,
      justifyContent,
      gap
    },
    elementProps: props
  };
};

export { Field, useFieldProps };
export type { FieldProps };
