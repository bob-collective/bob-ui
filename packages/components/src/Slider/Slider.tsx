import { useNumberFormatter } from '@react-aria/i18n';
import { AriaSliderProps, useSlider } from '@react-aria/slider';
import { useSliderState } from '@react-stately/slider';
import { forwardRef, InputHTMLAttributes, ReactNode, useRef } from 'react';
import { useDOMRef } from '@interlay/hooks';

import { Label } from '../Label';

import { StyledControls, StyledFilledTrack, StyledSliderWrapper, StyledTrack } from './Slider.style';
import { SliderMarks } from './SliderMarks';
import { SliderThumb } from './SliderThumb';

type Props = {
  marks?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
  onChange?: (value: number) => void;
  renderMarkText?: (text: ReactNode) => ReactNode;
};

type NativeAttrs = Omit<InputHTMLAttributes<unknown>, keyof Props>;

type InheritAttrs = Omit<AriaSliderProps, keyof Props>;

type SliderProps = Props & NativeAttrs & InheritAttrs;

const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      style,
      hidden,
      step = 1,
      minValue = 0,
      maxValue = 100,
      label,
      marks,
      onChange,
      renderMarkText,
      name,
      formatOptions,
      isDisabled,
      ...props
    },
    ref
  ): JSX.Element => {
    const domRef = useDOMRef(ref);
    const trackRef = useRef<HTMLInputElement>(null);

    const ariaProps: AriaSliderProps = {
      ...props,
      step,
      minValue,
      maxValue,
      label,
      isDisabled,
      onChange: ((value: number[]) => onChange?.(value[0])) as any
    };

    const numberFormatter = useNumberFormatter(formatOptions);
    const state = useSliderState({
      ...ariaProps,
      numberFormatter
    });

    const { groupProps, trackProps, labelProps } = useSlider(ariaProps, state, trackRef);

    return (
      <StyledSliderWrapper
        {...groupProps}
        ref={domRef}
        $isDisabled={isDisabled}
        className={className}
        direction='column'
        hidden={hidden}
        style={style}
      >
        <Label {...labelProps}>{label}</Label>
        <StyledControls ref={trackRef} $hasMarks={!!marks} {...trackProps}>
          <StyledTrack />
          <SliderThumb index={0} name={name} state={state} trackRef={trackRef} />
          <StyledFilledTrack $percentage={state.getThumbPercent(0)} />
          {marks && (
            <SliderMarks
              maxValue={maxValue}
              minValue={minValue}
              numberFormatter={numberFormatter}
              renderMarkText={renderMarkText}
              state={state}
              step={step}
            />
          )}
        </StyledControls>
      </StyledSliderWrapper>
    );
  }
);

Slider.displayName = 'Slider';

export { Slider };
export type { SliderProps };
