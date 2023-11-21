import { FieldInputProps, FormikConfig, FormikErrors as FormErrors, FormikValues, useFormik } from 'formik';
import { FocusEvent, Key, useCallback } from 'react';
import { useDebounce } from 'react-use';

const shouldEmitBlur = (relatedTargetEl?: HTMLElement, targetEl?: HTMLElement) => {
  if (!relatedTargetEl || !targetEl) {
    return true;
  }

  const isModal = relatedTargetEl.getAttribute('role') === 'dialog';

  if (!isModal) {
    return true;
  }

  const modalId = relatedTargetEl.getAttribute('id');
  const buttonAriaControls = targetEl.getAttribute('aria-controls');

  if (!modalId || !buttonAriaControls || buttonAriaControls !== modalId) {
    return true;
  }

  return false;
};

const getFieldName = (nameOrOptions: any) => {
  const isOptions = nameOrOptions !== null && typeof nameOrOptions === 'object';

  return isOptions ? nameOrOptions.name : nameOrOptions;
};

type GetFieldProps = (nameOrOptions: any) => FieldInputProps<any> & {
  errorMessage?: string | string[];
};

type GetTokenFieldProps = (
  nameOrOptions: any
) => Omit<ReturnType<GetFieldProps>, 'onChange'> & { onValueChange?: (value?: string | number) => void };

type GetSelectFieldProps = (
  nameOrOptions: any
) => Omit<ReturnType<GetFieldProps>, 'onChange'> & { onSelectionChange?: (key: Key) => void };

type HideErrors = boolean | 'untouched';

type UseFormArgs<Values extends FormikValues = FormikValues> = FormikConfig<Values> & {
  hideErrors?: HideErrors | Record<keyof FormikValues, HideErrors>;
  onComplete?: (form: Values) => void;
};

const useForm = <Values extends FormikValues = FormikValues>({
  hideErrors,
  onComplete,
  ...args
}: UseFormArgs<Values>) => {
  const {
    validateForm,
    values,
    getFieldProps: getFormikFieldProps,
    setFieldTouched,
    setFieldValue,
    ...formik
  } = useFormik<Values>(args);

  // emits onComplete event based on debounced values, only if form is modified and valid
  // meaning that it will only check for completeness in 250ms interval of no changes to the values
  useDebounce(
    () => {
      if (!formik.isValid || !formik.dirty) return;

      onComplete?.(values);
    },
    250,
    // do not run debounce if onComplete is not passed
    onComplete ? [values] : []
  );

  const getFieldProps: GetFieldProps = useCallback(
    (nameOrOptions: any) => {
      const fieldProps = getFormikFieldProps(nameOrOptions);
      const fieldName = getFieldName(nameOrOptions);

      const hideErrorMessage = typeof hideErrors === 'object' ? hideErrors[fieldName] : hideErrors;
      const shouldHideUntouchedErrors = hideErrorMessage === 'untouched';

      if (!hideErrorMessage || shouldHideUntouchedErrors) {
        const isTouched = formik.touched[fieldName];

        const errorMessage = shouldHideUntouchedErrors
          ? isTouched
            ? formik.errors[fieldName]
            : undefined
          : formik.errors[fieldName];

        return {
          ...fieldProps,
          errorMessage: errorMessage as string | string[] | undefined
        };
      }

      return fieldProps;
    },
    [getFormikFieldProps, hideErrors, formik.touched, formik.errors]
  );

  const getTokenFieldProps: GetTokenFieldProps = useCallback(
    (nameOrOptions: any) => {
      const props = getFieldProps(nameOrOptions);
      const fieldName = getFieldName(nameOrOptions);

      return {
        ...props,
        onValueChange: (value) => setFieldValue(fieldName, value, true),
        onChange: undefined
      };
    },
    [getFieldProps, setFieldValue]
  );

  const getSelectFieldProps: GetSelectFieldProps = useCallback(
    (nameOrOptions: any) => {
      const { onBlur, ...props } = getFieldProps(nameOrOptions);
      const fieldName = getFieldName(nameOrOptions);

      return {
        ...props,
        onSelectionChange: (key: Key) => {
          setFieldValue(fieldName, key, true);
        },
        // enforce the omission of onBlur to avoid setting field as touched
        // when the focus was set temporarly into the related select modal
        onBlur: (e: FocusEvent<HTMLElement>) => {
          const relatedTargetEl = e.relatedTarget as HTMLElement;
          const targetEl = e.target as HTMLElement;

          const emitBlur = shouldEmitBlur(relatedTargetEl, targetEl);

          if (emitBlur) {
            onBlur(e);
          }
        },
        onChange: undefined
      };
    },
    [getFieldProps, setFieldValue]
  );

  return {
    values,
    validateForm,
    getFieldProps,
    getSelectFieldProps,
    setFieldTouched,
    setFieldValue,
    getTokenFieldProps,
    ...formik
  };
};

export { useForm };
export type { FormErrors };
