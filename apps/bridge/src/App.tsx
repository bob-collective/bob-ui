import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Bridge } from './pages/Bridge';
import { Header } from '@gobob/ui';
import { CHAINS, getConfig, useSignMessage } from '@gobob/wagmi';
import { createWeb3Modal, useWeb3Modal } from '@web3modal/wagmi/react';
import { CTA } from '@interlay/ui';

createWeb3Modal({ wagmiConfig: getConfig(), projectId: '12856c58adb5d9ec849c38a42d3e152b', chains: CHAINS });

function App() {
  const { signMessage } = useSignMessage();
  const { open } = useWeb3Modal();
  return (
    <>
      <Header />
      <CTA onPress={() => open()}>Connect Wallet</CTA>

      <CTA onPress={() => signMessage({ message: 'Something' })}>Transaction</CTA>
      <BrowserRouter>
        <Routes>
          <Route element={<Bridge />} path='/' />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
