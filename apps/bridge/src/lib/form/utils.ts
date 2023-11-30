import { useForm } from '@interlay/hooks';

const isFormDisabled = (form: ReturnType<typeof useForm>): boolean => !form.isValid || !form.dirty;

export { isFormDisabled };
