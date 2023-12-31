import { WagmiConfig } from '@gobob/wagmi';
import { QueryClient, QueryClientProvider } from '@gobob/react-query';
import { InterlayUIProvider } from '@interlay/system';
import '@interlay/theme/dist/bob.css';
import { CSSReset } from '@interlay/ui';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig>
        <InterlayUIProvider>
          <CSSReset />
          <App />
        </InterlayUIProvider>
      </WagmiConfig>
    </QueryClientProvider>
  </React.StrictMode>
);
