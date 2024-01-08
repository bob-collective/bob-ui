import { WagmiConfig } from '@gobob/wagmi';
import { QueryClient, QueryClientProvider } from '@gobob/react-query';
import { InterlayUIProvider } from '@interlay/system';
import '@interlay/theme/dist/bob.css';
import { CSSReset } from '@interlay/ui';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App';
import './index.css';
import { TransactionsProvider } from './providers/TransactionsProvider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <WagmiConfig>
        <InterlayUIProvider>
          <CSSReset />
          <TransactionsProvider>
            <App />
          </TransactionsProvider>
        </InterlayUIProvider>
      </WagmiConfig>
    </QueryClientProvider>
  </React.StrictMode>
);
