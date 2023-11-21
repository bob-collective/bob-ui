import type { Colors, IconSize } from '@interlay/theme';

import { theme, resolveColor } from '@interlay/theme';
import styled from 'styled-components';

type StyledIconProps = {
  $size: IconSize;
  $color?: Colors;
};

const StyledIcon = styled.svg<StyledIconProps>`
  color: ${({ $color }) => resolveColor($color)};
  width: ${({ $size }) => theme.icon.sizes[$size]};
  height: ${({ $size }) => theme.icon.sizes[$size]};
  display: inline-block;
  user-select: none;
  flex-shrink: 0;
  overflow: hidden;
`;

export { StyledIcon };
export type { StyledIconProps };
