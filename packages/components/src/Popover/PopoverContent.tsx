import { forwardRef, ReactNode, useRef } from 'react';
import { useDOMRef } from '@interlay/hooks';

import { Overlay } from '../Overlay';

import { PopoverContentWrapper } from './PopoverContentWrapper';
import { usePopoverContext } from './PopoverContext';

type Props = { children?: ReactNode };

type PopoverContentProps = Props;

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>((props, ref): JSX.Element => {
  const { children, ...otherProps } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { ref: popoverRef, state, triggerRef, dialogProps, popoverProps } = usePopoverContext();
  const domRef = useDOMRef(popoverRef || ref);

  return (
    <Overlay {...otherProps} isOpen={state.isOpen} nodeRef={wrapperRef}>
      <PopoverContentWrapper
        {...props}
        ref={domRef}
        dialogProps={dialogProps}
        popoverProps={popoverProps}
        state={state}
        triggerRef={triggerRef as React.RefObject<Element>}
        wrapperRef={wrapperRef}
      >
        {children}
      </PopoverContentWrapper>
    </Overlay>
  );
});

PopoverContent.displayName = 'PopoverContent';

export { PopoverContent };
export type { PopoverContentProps };
