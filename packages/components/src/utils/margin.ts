import type { DefaultTheme, RuleSet } from 'styled-components';

import { css } from 'styled-components';
import { StyledMarginProps } from '@interlay/hooks';

import { Spacing, theme } from '../../../core/theme/src';

const getThemeSpacing = (spacing?: Spacing): string | undefined => spacing && theme.spacing[spacing];

const marginCSS = (props: StyledMarginProps): RuleSet<DefaultTheme> => css`
  margin: ${getThemeSpacing(props.$margin)};
  margin-top: ${getThemeSpacing(props.$marginTop || props.$marginY)};
  margin-bottom: ${getThemeSpacing(props.$marginBottom || props.$marginY)};
  margin-left: ${getThemeSpacing(props.$marginLeft || props.$marginX)};
  margin-right: ${getThemeSpacing(props.$marginRight || props.$marginX)};
`;

export { marginCSS };
