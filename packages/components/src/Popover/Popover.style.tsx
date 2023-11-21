import styled from 'styled-components';
import { theme } from '@interlay/theme';
import { Placement } from '@interlay/theme';

import { getOverlayPlacementCSS, overlayCSS } from '../utils/overlay';

type StyledPopoverProps = {
  $placement?: Placement | 'center';
  $isOpen: boolean;
};

const StyledPopover = styled.div<StyledPopoverProps>`
  display: inline-flex;
  flex-direction: column;
  box-sizing: border-box;

  min-width: ${theme.spacing.spacing8};
  min-height: ${theme.spacing.spacing8};
  max-width: calc(100% - ${theme.spacing.spacing8});

  position: absolute;

  outline: none; /* Hide focus outline */
  box-sizing: border-box;

  ${({ $isOpen }) => overlayCSS(!!$isOpen)}
  ${({ $placement }) => $placement && getOverlayPlacementCSS($placement as any)}

  transition: transform 100ms ease-in-out, opacity 100ms ease-in-out, visibility 0s linear 100ms;
`;

export { StyledPopover };
