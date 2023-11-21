import { AriaLinkOptions, useLink } from '@react-aria/link';
import { mergeProps } from '@react-aria/utils';
import { AnchorHTMLAttributes, forwardRef } from 'react';
import { Colors, FontSize, FontWeight } from '@interlay/theme';
import { useDOMRef } from '@interlay/hooks';

import { BaseTextLink, StyledIcon } from './TextLink.style';

type Props = {
  color?: Colors;
  external?: boolean;
  underlined?: boolean;
  size?: FontSize;
  weight?: FontWeight;
  icon?: boolean;
};

type AriaAttrs = Omit<AriaLinkOptions, keyof Props>;

type NativeAttrs = Omit<AnchorHTMLAttributes<unknown>, keyof Props & AriaAttrs>;

type TextLinkProps = Props & NativeAttrs & AriaAttrs;

// TODO: merge this with CTALink
const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>(
  ({ color = 'primary', external, underlined, size, weight, icon, children, ...props }, ref): JSX.Element => {
    const linkRef = useDOMRef(ref);

    const ariaProps = {
      ...props,
      ...(external && { target: '_blank', rel: 'noreferrer' })
    };

    const { linkProps } = useLink(ariaProps, linkRef);

    return (
      <BaseTextLink
        ref={linkRef}
        $color={color}
        $size={size}
        $underlined={underlined}
        $weight={weight}
        {...mergeProps(props, linkProps, {
          ...(external && { target: '_blank', rel: 'noreferrer' })
        })}
      >
        {children}
        {icon && <StyledIcon />}
      </BaseTextLink>
    );
  }
);

TextLink.displayName = 'TextLink';

export { TextLink };
export type { TextLinkProps };
