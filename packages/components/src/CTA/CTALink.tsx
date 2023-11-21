import { useFocusRing } from '@react-aria/focus';
import { AriaLinkOptions, useLink } from '@react-aria/link';
import { mergeProps } from '@react-aria/utils';
import { AnchorHTMLAttributes, forwardRef } from 'react';
import { useDOMRef } from '@interlay/hooks';

import { BaseCTA, BaseCTAProps } from './BaseCTA';
import { StyledIcon } from './CTA.style';

type Props = {
  external?: boolean;
  disabled?: boolean;
  icon?: boolean;
};

type AriaAttrs = Omit<AriaLinkOptions, keyof Props>;

type InheritAttrs = Omit<BaseCTAProps, keyof Props & AriaAttrs>;

type NativeAttrs = Omit<AnchorHTMLAttributes<unknown>, keyof Props & AriaAttrs & InheritAttrs>;

type CTALinkProps = Props & AriaAttrs & InheritAttrs & NativeAttrs;

const CTALink = forwardRef<HTMLAnchorElement, CTALinkProps>(
  ({ disabled, external, children, icon, ...props }, ref): JSX.Element => {
    const linkRef = useDOMRef(ref);

    const ariaProps = {
      ...props,
      isDisabled: disabled,
      ...(external && { target: '_blank', rel: 'noreferrer' })
    };

    const { linkProps } = useLink(ariaProps, linkRef);
    const { focusProps, isFocusVisible } = useFocusRing();

    return (
      <BaseCTA
        ref={linkRef}
        elementType='a'
        isFocusVisible={isFocusVisible}
        {...mergeProps(props, linkProps, focusProps, {
          ...(external && { target: '_blank', rel: 'noreferrer' })
        })}
      >
        {children}
        {icon && <StyledIcon color='secondary' />}
      </BaseCTA>
    );
  }
);

CTALink.displayName = 'CTALink';

export { CTALink };
export type { CTALinkProps };
