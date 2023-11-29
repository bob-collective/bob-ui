import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@gobob/ui';
import { CHAINS, getConfig } from '@gobob/wagmi';
import { createWeb3Modal } from '@web3modal/wagmi/react';

import { Bridge } from './pages/Bridge';

createWeb3Modal({ wagmiConfig: getConfig(), projectId: '12856c58adb5d9ec849c38a42d3e152b', chains: CHAINS });

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<Bridge />} path='/' />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
