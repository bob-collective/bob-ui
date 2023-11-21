import type { HTMLAttributes } from 'react';
import type {
  AlignItems,
  AlignSelf,
  Direction,
  JustifyContent,
  MarginProps,
  Spacing,
  Wrap
} from '../../../core/theme/src';

import { forwardRef } from 'react';
import { useStyleProps } from '@interlay/hooks';

import { ElementTypeProp } from '../utils/types';

import { StyledFlex } from './Flex.style';

type Props = {
  gap?: Spacing;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  direction?: Direction;
  flex?: string | number;
  wrap?: Wrap | boolean;
  alignSelf?: AlignSelf;
};

type NativeAttrs = Omit<HTMLAttributes<unknown>, keyof Props>;

type FlexProps = Props & NativeAttrs & ElementTypeProp & MarginProps;

const Flex = forwardRef<HTMLElement, FlexProps>(
  (
    { children, gap, justifyContent, alignItems, direction, flex, wrap, alignSelf, elementType, ...props },
    ref
  ): JSX.Element => {
    const { styleProps, componentProps } = useStyleProps(props);

    return (
      <StyledFlex
        ref={ref}
        $alignItems={alignItems}
        $alignSelf={alignSelf}
        $direction={direction}
        $flex={flex}
        $gap={gap}
        $justifyContent={justifyContent}
        $wrap={wrap}
        as={elementType}
        {...styleProps}
        {...componentProps}
      >
        {children}
      </StyledFlex>
    );
  }
);

Flex.displayName = 'Flex';

export { Flex };
export type { FlexProps };
