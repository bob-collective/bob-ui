import { CrossChainMessenger, ETHBridgeAdapter, StandardBridgeAdapter } from '@eth-optimism/sdk';
import { FallbackProvider, JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers';
import { L1_CHAIN_ID, L2_CHAIN_ID, useNetwork } from '@gobob/wagmi';
import { isL1Chain, isL2Chain } from '../utils/chain';
import { useEthersProvider } from './useEthersProvider';
import { useEthersSigner } from './useEthersSigner';

// NOTE: had to be hardcoded - conduit SDK was not working because of CORS settings
const conduitConfig = {
  l1ChainId: L1_CHAIN_ID,
  l2ChainId: L2_CHAIN_ID,
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
  const { chain } = useNetwork();

  // const [messenger, setMessenger] = useState<CrossChainMessenger | null>();

  // useEffect(() => {
  //   let createdMessenger: CrossChainMessenger | null = null;

  //   if (isL1Chain(chain)) {
  //     createdMessenger = createCrossChainMessenger(l1Signer, l2Provider);
  //   }
  //   if (isL2Chain(chain)) {
  //     createdMessenger = createCrossChainMessenger(l1Provider, l2Signer);
  //   }

  //   if (createdMessenger) {
  //     setMessenger(createdMessenger);
  //   }
  // }, [chain, l1Provider, l1Signer, l2Provider, l2Signer]);

  return {
    messenger: isL1Chain(chain)
      ? createCrossChainMessenger(l1Signer, l2Provider)
      : isL2Chain(chain)
        ? createCrossChainMessenger(l1Provider, l2Signer)
        : createCrossChainMessenger(l1Provider, l2Provider),
    readMessenger: createCrossChainMessenger(l1Provider, l2Provider)
  };
};

export { useCrossChainMessenger };
