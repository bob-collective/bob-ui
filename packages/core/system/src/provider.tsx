import type { ModalProviderProps } from '@react-aria/overlays';

import { I18nProvider, I18nProviderProps } from '@react-aria/i18n';
import { OverlayProvider } from '@react-aria/overlays';

interface InterlayUIProviderProps extends Omit<ModalProviderProps, 'children'> {
  children: React.ReactNode;
  /**
   * The locale to apply to the children.
   * @default "en-US"
   */
  locale?: I18nProviderProps['locale'];
}

const InterlayUIProvider: React.FC<InterlayUIProviderProps> = ({ children, locale = 'en-US', ...otherProps }) => {
  return (
    <I18nProvider locale={locale}>
      <OverlayProvider {...otherProps}>{children}</OverlayProvider>
    </I18nProvider>
  );
};

export { InterlayUIProvider };
export type { InterlayUIProviderProps };
