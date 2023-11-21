import { useSeparator } from '@react-aria/separator';
import { mergeProps } from '@react-aria/utils';
import { forwardRef, HTMLAttributes } from 'react';
import { useStyleProps } from '@interlay/hooks';

import { DividerVariants, MarginProps, Orientation, Sizes } from '../../../core/theme/src';
import { ElementTypeProp } from '../utils/types';

import { StyledDivider } from './Divider.style';

type Props = {
  orientation?: Orientation;
  color?: DividerVariants;
  size?: Sizes;
};

type NativeAttrs = Omit<HTMLAttributes<unknown>, keyof Props>;

type DividerProps = Props & NativeAttrs & ElementTypeProp & MarginProps;

const Divider = forwardRef<HTMLHRElement, DividerProps>(
  (
    { elementType: elementTypeProp, orientation = 'horizontal', color = 'primary', size = 'small', ...props },
    ref
  ): JSX.Element => {
    const elementType = elementTypeProp || orientation === 'vertical' ? 'div' : 'hr';

    const { separatorProps } = useSeparator({
      ...props,
      elementType
    });
    const { styleProps, componentProps } = useStyleProps(props);

    return (
      <StyledDivider
        ref={ref}
        $color={color}
        $orientation={orientation}
        $size={size}
        as={elementType}
        {...mergeProps(separatorProps, styleProps, componentProps)}
      />
    );
  }
);

Divider.displayName = 'Divider';

export { Divider };
export type { DividerProps };
