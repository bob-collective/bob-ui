import { PositionAria, useOverlayPosition } from '@react-aria/overlays';
import { AriaTooltipProps, useTooltip, useTooltipTrigger } from '@react-aria/tooltip';
import { mergeProps } from '@react-aria/utils';
import { TooltipTriggerProps as StatelyTooltipTriggerProps, useTooltipTriggerState } from '@react-stately/tooltip';
import React, { Children, cloneElement, forwardRef, HTMLAttributes, ReactElement, ReactNode, useRef } from 'react';
import { Placement } from '@interlay/theme';
import { useDOMRef } from '@interlay/hooks';

import { Span } from '../Text';
import { Overlay } from '../Overlay';

import { StyledTooltip, StyledTooltipLabel, StyledTooltipTip } from './Tooltip.style';

// MEMO: https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/tooltip/src/TooltipTrigger.tsx#L22
const DEFAULT_OFFSET = -1;
const DEFAULT_CROSS_OFFSET = 0;
const DEFAULT_DELAY = 250;

type Props = {
  label?: ReactNode;
  placement?: Placement;
};

type AriaOverlaysAttrs = { shouldFlip?: boolean; crossOffset?: number; offset?: number; containerPadding?: number };

type AriaAttrs = AriaTooltipProps & AriaOverlaysAttrs;

type InheritAttrs = Omit<AriaAttrs & StatelyTooltipTriggerProps, keyof Props>;

type NativeAttrs = Omit<HTMLAttributes<unknown>, keyof Props & InheritAttrs>;

type TooltipProps = Props & InheritAttrs & NativeAttrs;

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>((props, ref): JSX.Element => {
  const {
    children,
    label,
    crossOffset = DEFAULT_CROSS_OFFSET,
    isDisabled,
    offset = DEFAULT_OFFSET,
    trigger: triggerAction,
    delay = DEFAULT_DELAY
  } = props;

  const state = useTooltipTriggerState({ ...props, delay });

  const tooltipTriggerRef = useRef<HTMLElement>(null);
  const overlayRef = useDOMRef<HTMLDivElement>(ref);

  const { triggerProps, tooltipProps } = useTooltipTrigger(
    {
      isDisabled,
      trigger: triggerAction
    },
    state,
    tooltipTriggerRef
  );

  const { overlayProps, arrowProps, placement } = useOverlayPosition({
    placement: props.placement || 'top',
    targetRef: tooltipTriggerRef,
    overlayRef,
    offset,
    crossOffset,
    isOpen: state.isOpen,
    shouldFlip: props.shouldFlip,
    containerPadding: props.containerPadding
  }) as PositionAria & { placement: Placement };

  const ariaProps = mergeProps(props, tooltipProps);
  const { tooltipProps: ariaTooltipProps } = useTooltip(ariaProps, state);

  // MEMO: in case there is no label, just return trigger component
  if (!label) {
    return <>{children}</>;
  }

  let trigger: ReactElement;

  const shouldWrap = typeof children === 'string';

  if (shouldWrap) {
    trigger = (
      <Span ref={tooltipTriggerRef} tabIndex={0} {...triggerProps}>
        {children}
      </Span>
    );
  } else {
    // MEMO: Ensure tooltip has only one child node
    const child = Children.only(children) as React.ReactElement & {
      ref?: React.Ref<any>;
    };

    // MEMO: Clones component to adds trigger ref and events that will trigger the tooltip
    trigger = cloneElement(child, mergeProps(child.props, triggerProps, { ref: tooltipTriggerRef }));
  }

  return (
    <>
      {trigger}
      {state.isOpen && (
        <Overlay isOpen={state.isOpen} nodeRef={overlayRef}>
          <StyledTooltip
            {...mergeProps(ariaTooltipProps, overlayProps)}
            ref={overlayRef}
            $isOpen={state.isOpen}
            $placement={placement}
            className={props.className}
          >
            <StyledTooltipLabel>{label}</StyledTooltipLabel>
            <StyledTooltipTip $placement={placement} {...arrowProps} />
          </StyledTooltip>
        </Overlay>
      )}
    </>
  );
});

Tooltip.displayName = 'Tooltip';

export { Tooltip };
export type { TooltipProps };
