import { useEffect, useState } from 'react';

import { CrossChainMessenger, StandardBridgeAdapter, ETHBridgeAdapter } from '@eth-optimism/sdk';
import { L1_CHAIN_ID, L2_CHAIN_ID } from '@gobob/wagmi';
import { JsonRpcSigner, FallbackProvider, JsonRpcProvider } from '@ethersproject/providers';
import { useEthersProvider } from './useEthersProvider';
import { useEthersSigner } from './useEthersSigner';

// NOTE: had to be hardcoded - conduit SDK was not working because of CORS settings
const conduitConfig = {
  l1ChainId: '11155111',
  l2ChainId: '111',
  l1Addresses: {
    AddressManager: '0x92B5c849AE767d2D64E9460dD15cC7d19D70084C',
    BondManager: '0x0000000000000000000000000000000000000000',
    CanonicalTransactionChain: '0x0000000000000000000000000000000000000000',
    L1CrossDomainMessenger: '0xcd5989E230D97FFE8C3C5217DEdCaC64Fa5fCeb3',
    L1StandardBridge: '0x5545B0C1C3706Ad1b428352402C3a4f0FfC84CBa',
    L2OutputOracle: '0x14D0069452b4AE2b250B395b8adAb771E4267d2f',
    OptimismPortal: '0x867B1Aa872b9C8cB5E9F7755feDC45BB24Ad0ae4',
    StateCommitmentChain: '0x0000000000000000000000000000000000000000'
  }
};

export const getCrossChainConfig = () => {
  const config = conduitConfig;

  // This config can be modified after the fact. E.g. you can add additional
  // bridge implementations.
  return {
    l1ChainId: config.l1ChainId,
    l2ChainId: config.l2ChainId,
    contracts: {
      l1: config.l1Addresses,
      l2: {}
    },
    bridges: {
      Standard: {
        Adapter: StandardBridgeAdapter,
        l1Bridge: config.l1Addresses.L1StandardBridge,
        l2Bridge: '0x4200000000000000000000000000000000000010' // Pre-deploy
      },
      ETH: {
        Adapter: ETHBridgeAdapter,
        l1Bridge: config.l1Addresses.L1StandardBridge,
        l2Bridge: '0x4200000000000000000000000000000000000010' // Pre-deploy
      }
    },
    bedrock: true
  } as const;
};

const createCrossChainMessenger = (
  l1Signer: JsonRpcSigner | FallbackProvider | JsonRpcProvider | undefined,
  l2Signer: JsonRpcSigner | FallbackProvider | JsonRpcProvider | undefined
) => {
  if (l1Signer == undefined || l2Signer == undefined) {
    return null;
  }
  const crossChainConfig = getCrossChainConfig();

  const config = {
    ...crossChainConfig,
    l1SignerOrProvider: l1Signer,
    l2SignerOrProvider: l2Signer
  };

  const messenger = new CrossChainMessenger(config);
  return messenger;
};

const useCrossChainMessenger = () => {
  const l1Provider = useEthersProvider({ chainId: L1_CHAIN_ID });
  const l2Provider = useEthersProvider({ chainId: L2_CHAIN_ID });
  const l1Signer = useEthersSigner({ chainId: L1_CHAIN_ID });
  const l2Signer = useEthersSigner({ chainId: L2_CHAIN_ID });

  const [depositMessenger, setDepositMessenger] = useState<CrossChainMessenger>();
  const [withdrawMessenger, setWithdrawMessenger] = useState<CrossChainMessenger>();

  useEffect(() => {
    // NOTE: use l1 signer and l2 provider for deposits.
    const messenger = createCrossChainMessenger(l1Signer, l2Provider);
    if (messenger) {
      setDepositMessenger(messenger);
    }
  }, [l1Signer, l2Provider]);

  useEffect(() => {
    // NOTE: use l1 provider and l2 signer for withdrawals.
    const messenger = createCrossChainMessenger(l1Provider, l2Signer);
    if (messenger) {
      setWithdrawMessenger(messenger);
    }
  }, [l1Provider, l2Signer]);

  return { deposit: depositMessenger, withdraw: withdrawMessenger };
};

export { useCrossChainMessenger };
