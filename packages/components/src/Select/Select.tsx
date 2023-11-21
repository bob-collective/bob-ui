import { useSelect } from '@react-aria/select';
import { mergeProps, useId } from '@react-aria/utils';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { SelectProps as AriaSelectProps, useSelectState } from '@react-stately/select';
import { CollectionBase, Node } from '@react-types/shared';
import { ForwardedRef, forwardRef, Key, ReactNode, useRef } from 'react';
import { Sizes } from '@interlay/theme';
import { useDOMRef } from '@interlay/hooks';

import { Field, FieldProps, useFieldProps } from '../Field';
import { hasError } from '../utils/input';

import { SelectModal, SelectModalProps } from './SelectModal';
import { SelectTrigger } from './SelectTrigger';

type SelectObject = Record<any, any>;

type Props<T = SelectObject> = {
  open?: boolean;
  loading?: boolean;
  size?: Sizes;
  // MEMO: Allows a custom select trigger (TokenInput select)
  asSelectTrigger?: any;
  renderValue?: (item: Node<T>) => ReactNode;
  placeholder?: ReactNode;
};

type ListboxAttrs = { type?: 'listbox' };

type ModalAttrs = {
  type?: 'modal';
  modalProps?: { ref?: React.Ref<HTMLDivElement> } & Omit<SelectModalProps, 'state' | 'isOpen' | 'onClose' | 'id'>;
};

// type ConditionalAttrs = ListboxAttrs | ModalAttrs;

type InheritAttrs<T = SelectObject> = Omit<
  CollectionBase<T> & Omit<FieldProps, 'children'> & AriaSelectProps<T>,
  keyof Props<T> | 'isDisabled' | 'isLoading' | 'isOpen' | 'isRequired' | 'selectedKey' | 'defaultSelectedKey'
>;

type NativeAttrs<T = SelectObject> = Omit<React.InputHTMLAttributes<Element>, keyof Props<T> | 'children'>;

type CommonProps<T = SelectObject> = Props<T> & NativeAttrs<T> & InheritAttrs<T>;

type ListboxSelectProps<T = SelectObject> = CommonProps<T> & ListboxAttrs;

type ModalSelectProps<T = SelectObject> = CommonProps<T> & ModalAttrs;

type SelectProps<T = SelectObject> = ModalSelectProps<T> | ListboxSelectProps<T>;

// TODO: listbox is not implemented
const Select = <T extends SelectObject = SelectObject>(
  {
    type = 'listbox',
    value,
    defaultValue,
    name,
    disabled,
    open,
    required,
    label,
    errorMessage,
    size = 'medium',
    placeholder = 'Select an option',
    asSelectTrigger,
    isInvalid,
    onChange,
    renderValue = (item) => item.rendered,
    items,
    disabledKeys,
    children,
    ...props
  }: SelectProps<T>,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element => {
  const inputRef = useDOMRef(ref);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalId = useId();

  const ariaProps: AriaSelectProps<T> = {
    isDisabled: disabled,
    isOpen: open,
    isRequired: required,
    selectedKey: value as Key,
    defaultSelectedKey: defaultValue as Key,
    label,
    errorMessage,
    isInvalid,
    items,
    children,
    ...props
  };

  const state = useSelectState(ariaProps);

  // MEMO: `menuProps` and `triggerProps` not implemented yet
  const { labelProps, valueProps, triggerProps, descriptionProps, errorMessageProps } = useSelect(
    ariaProps,
    state,
    buttonRef
  );

  const { fieldProps, elementProps } = useFieldProps(
    mergeProps(props, {
      descriptionProps: mergeProps(descriptionProps, props.descriptionProps || {}),
      errorMessageProps: mergeProps(errorMessageProps, props.errorMessageProps || {}),
      errorMessage,
      labelProps: mergeProps(labelProps, props.labelProps || {}),
      label
    })
  );

  const error = hasError({ errorMessage, isInvalid });

  const selectTriggerProps =
    type === 'listbox'
      ? triggerProps
      : mergeProps(
          { ...props, modalProps: undefined },
          {
            onPress: () => state.setOpen(true),
            disabled,
            id: triggerProps.id,
            'aria-labelledby': triggerProps['aria-labelledby']
          }
        );

  return (
    <Field {...fieldProps}>
      <VisuallyHidden aria-hidden='true'>
        <input
          ref={inputRef}
          disabled={disabled}
          name={name}
          tabIndex={-1}
          value={onChange ? state.selectedKey.toString() || '' : undefined}
          onChange={onChange}
        />
      </VisuallyHidden>
      <SelectTrigger
        {...mergeProps(elementProps, selectTriggerProps)}
        ref={buttonRef}
        aria-controls={modalId}
        aria-expanded={state.isOpen}
        as={asSelectTrigger}
        disabled={disabled}
        hasError={error}
        name={name}
        placeholder={placeholder}
        size={size}
        valueProps={valueProps}
      >
        {state.selectedItem && renderValue(state.selectedItem)}
      </SelectTrigger>
      {type === 'modal' && (
        <SelectModal
          {...mergeProps((props as ModalAttrs).modalProps, {
            onClose: state.close
          })}
          id={modalId}
          isOpen={state.isOpen}
          listProps={mergeProps((props as ModalAttrs).modalProps?.listProps, {
            selectedKeys: state.selectedItem?.key ? [state.selectedItem?.key] : [],
            disabledKeys
          })}
          state={state}
        />
      )}
    </Field>
  );
};

const _Select = forwardRef(Select) as <T extends SelectObject = SelectObject>(
  props: SelectProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof Select>;

Select.displayName = 'Select';

export { _Select as Select };
export type { SelectProps, ListboxSelectProps, ModalSelectProps };
