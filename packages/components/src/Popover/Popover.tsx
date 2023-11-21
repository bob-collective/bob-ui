import { useOverlayTrigger } from '@react-aria/overlays';
import { OverlayTriggerProps, useOverlayTriggerState } from '@react-stately/overlays';
import { ReactNode, forwardRef, useRef } from 'react';
import { Placement } from '@interlay/theme';

import { PopoverContext } from './PopoverContext';

type Props = {
  children?: ReactNode;
  placement?: Placement;
  offset?: number;
  crossOffset?: number;
  /* usePopover attempts to flip popovers on the main axis */
  /* overrides usePopover flip */
  shouldFlip?: boolean;
  /* Control the minimum padding required between the popover and the surrounding container. */
  /* Affects the popover flip */
  containerPadding?: number;
};

type InheritAttrs = Omit<OverlayTriggerProps, keyof Props>;

type PopoverProps = Props & InheritAttrs;

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ children, placement, offset, crossOffset, shouldFlip, containerPadding, ...props }, ref): JSX.Element | null => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const state = useOverlayTriggerState(props);
    const { triggerProps, overlayProps } = useOverlayTrigger({ type: 'dialog' }, state, triggerRef);

    return (
      <PopoverContext.Provider
        value={{
          ref,
          state,
          triggerRef,
          triggerProps,
          dialogProps: overlayProps,
          popoverProps: { placement, offset, crossOffset, shouldFlip, containerPadding }
        }}
      >
        {children}
      </PopoverContext.Provider>
    );
  }
);

Popover.displayName = 'Popover';

export { Popover };
export type { PopoverProps };
