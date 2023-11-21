import { AriaButtonProps } from '@react-aria/button';
import { AriaPopoverProps } from '@react-aria/overlays';
import { OverlayTriggerState } from '@react-stately/overlays';
import { DOMProps } from '@react-types/shared';
import React, { ForwardedRef, RefObject } from 'react';

interface PopoverConfig {
  ref?: ForwardedRef<HTMLDivElement>;
  state: OverlayTriggerState;
  triggerRef?: RefObject<Element>;
  triggerProps?: AriaButtonProps<'button'>;
  dialogProps?: DOMProps;
  popoverProps?: Partial<AriaPopoverProps>;
}

const defaultContext = { state: { isOpen: false } as OverlayTriggerState };

const PopoverContext = React.createContext<PopoverConfig>(defaultContext);

const usePopoverContext = (): PopoverConfig => React.useContext<PopoverConfig>(PopoverContext);

export { PopoverContext, usePopoverContext };
export type { PopoverConfig };
