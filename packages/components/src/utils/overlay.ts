import type { DefaultTheme, RuleSet } from 'styled-components';

import { css } from 'styled-components';

import { Placement, theme } from '../../../core/theme/src';

const getOverlayPlacementCSS = (placement: Placement): RuleSet<DefaultTheme> => {
  switch (placement) {
    case 'bottom':
      return css`
        transform: translateY(${theme.overlay.placement.transform});
      `;
    case 'right':
      return css`
        transform: translateX(${theme.overlay.placement.transform});
      `;
    case 'left':
      return css`
        transform: translateX(calc(${theme.overlay.placement.transform} * -1));
      `;
    case 'top':
    default:
      return css`
        transform: translateY(calc(${theme.overlay.placement.transform} * -1));
      `;
  }
};

const overlayCSS = (isOpen: boolean): RuleSet<DefaultTheme> => css`
  visibility: ${isOpen ? 'visible' : 'hidden'};
  opacity: ${isOpen ? 1 : 0};
  pointer-events: ${isOpen ? 'auto' : 'none'};
  transition:
    transform ${theme.transition.duration.duration100}ms ease-in-out,
    opacity ${theme.transition.duration.duration100}ms ease-in-out,
    visibility 0ms linear ${theme.transition.duration.duration100}ms;
`;

export { getOverlayPlacementCSS, overlayCSS };
