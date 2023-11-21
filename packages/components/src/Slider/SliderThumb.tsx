import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { AriaSliderThumbProps, useSliderThumb } from '@react-aria/slider';
import { mergeProps } from '@react-aria/utils';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { SliderState } from '@react-stately/slider';
import { InputHTMLAttributes, RefObject } from 'react';
import { useDOMRef } from '@interlay/hooks';

import { StyledInput, StyledSliderThumb } from './Slider.style';

type Props = {
  trackRef: RefObject<HTMLElement>;
  state: SliderState;
};

type NativeAttrs = Omit<InputHTMLAttributes<unknown>, keyof Props>;

type InheritAttrs = Omit<AriaSliderThumbProps, keyof Props>;

type SliderThumbProps = Props & NativeAttrs & InheritAttrs;

const SliderThumb = ({ state, trackRef, name, ...props }: SliderThumbProps): JSX.Element => {
  const inputRef = useDOMRef<HTMLInputElement>(null);

  const { thumbProps, inputProps, isDragging, isFocused } = useSliderThumb(
    {
      ...props,
      inputRef,
      trackRef
    },
    state
  );

  const { hoverProps, isHovered } = useHover({});

  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <StyledSliderThumb
      {...mergeProps(thumbProps, hoverProps)}
      $isDisabled={state.isDisabled}
      $isDragged={isDragging}
      $isFocusVisible={isFocusVisible}
      $isFocused={isFocused}
      $isHovered={isHovered}
      role='presentation'
    >
      <VisuallyHidden>
        <StyledInput
          ref={inputRef}
          name={name}
          style={{ left: thumbProps.style?.left }}
          {...mergeProps(inputProps, focusProps)}
        />
      </VisuallyHidden>
    </StyledSliderThumb>
  );
};

export { SliderThumb };
export type { SliderThumbProps };
