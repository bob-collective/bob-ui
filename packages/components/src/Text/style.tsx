import styled, { css } from 'styled-components';

import { theme, resolveColor, resolveHeight } from '../../../core/theme/src';
import { Colors, FontSize, FontWeight, NormalAlignments } from '../../../core/theme/src';

type StyledTextProps = {
  $color?: Colors;
  $size?: FontSize;
  $align?: NormalAlignments;
  $weight?: FontWeight;
  $rows?: number;
  $noWrap?: boolean;
};

const Text = styled.p<StyledTextProps>`
  color: ${({ $color }) => resolveColor($color)};
  font-size: ${({ $size }) => $size && theme.text[$size]};
  line-height: ${({ $size }) => resolveHeight($size)};
  font-weight: ${({ $weight }) => $weight && theme.fontWeight[$weight]};
  text-align: ${({ $align }) => $align};
  white-space: ${({ $noWrap }) => $noWrap && 'nowrap'};

  ${({ $rows }) => {
    return (
      $rows &&
      css`
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-clamp: ${$rows};
        -webkit-line-clamp: ${$rows};
        -webkit-box-orient: vertical;
      `
    );
  }}
`;

export { Text };
export type { StyledTextProps };
