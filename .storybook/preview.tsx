import type { Preview } from '@storybook/react';

import React from 'react';
import { InterlayUIProvider, CSSReset } from '@interlay/ui';
import '@interlay/theme/dist/bob.css';
import './style.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  decorators: [
    (Story, { globals: { locale } }) => {
      const direction =
        // @ts-ignore
        locale && new Intl.Locale(locale)?.textInfo?.direction === 'rtl' ? 'rtl' : undefined;

      return (
        <InterlayUIProvider locale={locale}>
          <CSSReset />
          <div dir={direction} lang={locale}>
            <Story />
          </div>
        </InterlayUIProvider>
      );
    }
  ]
};

export default preview;
