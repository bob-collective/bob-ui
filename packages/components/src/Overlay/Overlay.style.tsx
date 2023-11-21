import styled from 'styled-components';

import { theme } from '../../../core/theme/src';
import { overlayCSS } from '../utils/overlay';

type StyledUnderlayProps = {
  $isOpen: boolean;
  $isTransparent: boolean;
};

const StyledOverlayWrapper = styled.div`
  isolation: isolate;
  background: transparent;
`;

const StyledUnderlay = styled.div<StyledUnderlayProps>`
  position: fixed;
  z-index: ${theme.modal.underlay.zIndex};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background: ${({ $isTransparent }) => ($isTransparent ? 'transparent' : theme.modal.underlay.bg)};

  ${({ $isOpen }) => overlayCSS($isOpen)}
  transition: ${({ $isOpen }) =>
    $isOpen ? theme.modal.underlay.transition.entering : theme.modal.underlay.transition.exiting};
`;

export { StyledOverlayWrapper, StyledUnderlay };
