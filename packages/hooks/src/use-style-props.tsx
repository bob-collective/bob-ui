import { Spacing } from '../../core/theme/src';

type MarginProps = {
  margin?: Spacing;
  marginTop?: Spacing;
  marginBottom?: Spacing;
  marginLeft?: Spacing;
  marginRight?: Spacing;
  marginX?: Spacing;
  marginY?: Spacing;
};

type StyledMarginProps = {
  [K in keyof MarginProps as `$${string & K}`]: MarginProps[K];
};

type StyleProps = StyledMarginProps;

type ComponentProps<T extends Record<string, any>> = Omit<T, keyof MarginProps>;

type UseStylePropsResult<T extends Record<string, any>> = { styleProps: StyleProps; componentProps: ComponentProps<T> };

// Extracts props that are solely for styling so that they get mapped to styled props
// This approach is used for a set of styling props that could be reused across different component
const useStyleProps = <T extends Record<string, any>>(props: T): UseStylePropsResult<T> => {
  const { margin, marginTop, marginBottom, marginLeft, marginRight, marginX, marginY, ...componentProps } = props;

  return {
    styleProps: {
      $margin: margin,
      $marginTop: marginTop,
      $marginBottom: marginBottom,
      $marginLeft: marginLeft,
      $marginRight: marginRight,
      $marginX: marginX,
      $marginY: marginY
    },
    componentProps
  };
};

export type { StyleProps, UseStylePropsResult, StyledMarginProps, MarginProps };
export { useStyleProps };
