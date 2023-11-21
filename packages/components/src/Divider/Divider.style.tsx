import styled from 'styled-components';
import { StyledMarginProps } from '@interlay/hooks';

import { theme, resolveColor } from '../../../core/theme/src';
import { DividerVariants, Orientation, Sizes } from '../../../core/theme/src';
import { marginCSS } from '../utils/margin';

type StyledDividerProps = {
  $color: DividerVariants;
  $orientation: Orientation;
  $size: Sizes;
} & StyledMarginProps;

const StyledDivider = styled.hr<StyledDividerProps>`
  background-color: ${({ $color }) => ($color === 'default' ? 'var(--colors-border)' : resolveColor($color))};
  height: ${({ $orientation, $size }) => ($orientation === 'horizontal' ? theme.divider.size[$size] : 'auto')};
  width: ${({ $orientation, $size }) => ($orientation === 'horizontal' ? '' : theme.divider.size[$size])};
  border: 0;
  margin: 0;
  align-self: stretch;
  flex-shrink: 0;
  ${(props) => marginCSS(props)};
`;

export { StyledDivider };
