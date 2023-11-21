type HasErrorProps = { errorMessage?: string | string[]; isInvalid?: boolean };

const hasErrorMessage = (errorMessage?: string | string[]): boolean =>
  typeof errorMessage === 'string' ? !!errorMessage : !!errorMessage?.filter(Boolean).length;

const hasError = ({ errorMessage, isInvalid = false }: HasErrorProps): boolean =>
  (errorMessage && hasErrorMessage(errorMessage)) || isInvalid;

export { hasError };
