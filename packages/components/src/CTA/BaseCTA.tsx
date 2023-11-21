import { forwardRef, HTMLAttributes } from 'react';

import { CTASizes, CTAVariants } from '../../../core/theme/src';
import { ElementTypeProp } from '../utils/types';

import { OutlinedCTA, PrimaryCTA, SecondaryCTA, TextCTA } from './CTA.style';

const ctaElements = {
  primary: PrimaryCTA,
  secondary: SecondaryCTA,
  outlined: OutlinedCTA,
  text: TextCTA
};

type Props = {
  variant?: CTAVariants;
  fullWidth?: boolean;
  size?: CTASizes;
  disabled?: boolean;
  isFocusVisible?: boolean;
};

type NativeAttrs = Omit<HTMLAttributes<unknown>, keyof Props>;

type BaseCTAProps = Props & NativeAttrs & ElementTypeProp;

const BaseCTA = forwardRef<HTMLElement, BaseCTAProps>(
  (
    {
      variant = 'primary',
      fullWidth = false,
      size = 'medium',
      children,
      disabled,
      elementType,
      isFocusVisible,
      ...props
    },
    ref
  ): JSX.Element => {
    const StyledCTA = ctaElements[variant];

    return (
      <StyledCTA
        ref={ref}
        $fullWidth={fullWidth}
        $isFocusVisible={isFocusVisible}
        $size={size}
        as={elementType}
        disabled={disabled}
        {...props}
      >
        {children}
      </StyledCTA>
    );
  }
);

BaseCTA.displayName = 'BaseCTA';

export { BaseCTA };
export type { BaseCTAProps };
