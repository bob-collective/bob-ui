import { Flex, TokenInput } from '@interlay/ui';
import { useForm } from '@interlay/hooks';
import { Ethereum, MonetaryAmount } from '@interlay/monetary-js';
import { mergeProps } from '@react-aria/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthCTA } from '@gobob/ui';
import { parseEther } from 'viem';
import {
  CrossChainMessenger,
  StandardBridgeAdapter,
  ETHBridgeAdapter,
  MessageStatus,
  TokenBridgeMessage
} from '@eth-optimism/sdk';
import {
  BRIDGE_DEPOSIT_AMOUNT,
  BRIDGE_DEPOSIT_GAS_TOKEN,
  BridgeDepositFormValidationParams,
  BridgeDepositFormValues,
  bridgeDepositSchema
} from '../../../../lib/form/bridge';
import { isFormDisabled } from '../../../../lib/form/utils';
import { TransactionDetails } from '../TransactionDetails';

import { ChainSelect } from './ChainSelect';
import {
  L1_CHAIN_ID,
  L2_CHAIN_ID,
  useWalletClient,
  type WalletClient,
  type PublicClient,
  usePublicClient,
  useAccount,
  useNetwork,
  useSwitchNetwork
} from '@gobob/wagmi';
import { Web3Provider, JsonRpcSigner, FallbackProvider, JsonRpcProvider } from '@ethersproject/providers';

type DepositFormProps = { onSubmit: (values: BridgeDepositFormValues) => void };

import { type HttpTransport } from 'viem';

export function publicClientToProvider(publicClient: PublicClient) {
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address
  };
  if (transport.type === 'fallback')
    return new FallbackProvider(
      (transport.transports as ReturnType<HttpTransport>[]).map(({ value }) => new JsonRpcProvider(value?.url, network))
    );
  return new JsonRpcProvider(transport.url, network);
}

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const publicClient = usePublicClient({ chainId });
  return useMemo(() => publicClientToProvider(publicClient), [publicClient]);
}

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address
  };
  const provider = new Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  return useMemo(() => (walletClient ? walletClientToSigner(walletClient) : undefined), [walletClient]);
}

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
    const messenger = createCrossChainMessenger(l1Signer, l2Provider);
    if (messenger) {
      setDepositMessenger(messenger);
    }
  }, [l1Signer, l2Provider]);

  useEffect(() => {
    const messenger = createCrossChainMessenger(l1Provider, l2Signer);
    if (messenger) {
      setWithdrawMessenger(messenger);
    }
  }, [l1Provider, l2Signer]);

  return { deposit: depositMessenger, withdraw: withdrawMessenger };
};

const useGetDeposits = () => {
  const { deposit: messenger } = useCrossChainMessenger();
  const { address } = useAccount();

  const [deposits, setDeposits] = useState<Array<TokenBridgeMessage>>();

  const fetchDeposits = useCallback(async () => {
    if (address && messenger) {
      const m = await messenger.getDepositsByAddress(address);
      // TODO: fetch statuses for all deposits
      const s = await messenger.getMessageStatus(m[0]);

      return m;
    }
    return [];
  }, [address, messenger]);

  useEffect(() => {
    (async () => {
      const deposits = await fetchDeposits();
      setDeposits(deposits);
    })();
  }, [fetchDeposits]);

  return { data: deposits, refetch: fetchDeposits };
};

const DepositForm = ({ onSubmit }: DepositFormProps): JSX.Element => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { deposit: writeMessenger } = useCrossChainMessenger();

  // const { data: d, refetch: refetchDeposits } = useGetDeposits();
  // console.log(d);

  const switchToL1 = () => {
    if (switchNetwork)  {
      switchNetwork(L1_CHAIN_ID);
    }
  };

  const handleSubmit = async (values: BridgeDepositFormValues) => {
    if (chain && chain.id !== L1_CHAIN_ID) {
      switchToL1();
      return;
    }

    if (!writeMessenger || !values[BRIDGE_DEPOSIT_AMOUNT]) {
      return;
    }

    const amountInGwei = parseEther(values[BRIDGE_DEPOSIT_AMOUNT]);
    onSubmit(values);

    const tx = await writeMessenger.depositETH(amountInGwei.toString());
    tx.wait();

    console.log('tx', tx);
    await writeMessenger.waitForMessageStatus(tx.hash, MessageStatus.RELAYED);
    console.log('relayed');
    refetchDeposits;
  };

  const initialValues = useMemo(
    () => ({
      [BRIDGE_DEPOSIT_AMOUNT]: '',
      [BRIDGE_DEPOSIT_GAS_TOKEN]: 'ETH'
    }),
    []
  );

  // TODO: add correct params
  const params: BridgeDepositFormValidationParams = {
    [BRIDGE_DEPOSIT_AMOUNT]: {
      maxAmount: new MonetaryAmount(Ethereum, 100000),
      minAmount: new MonetaryAmount(Ethereum, 0)
    }
  };

  const form = useForm<BridgeDepositFormValues>({
    initialValues,
    validationSchema: bridgeDepositSchema(params),
    onSubmit: handleSubmit
  });

  const isSubmitDisabled = isFormDisabled(form);

  return (
    <Flex direction='column'>
      <form onSubmit={form.handleSubmit}>
        <Flex direction='column' gap='spacing6'>
          <Flex wrap gap='spacing2'>
            <ChainSelect label='From' name='Ethereum' ticker='ETH' />
            <ChainSelect label='To' name='BOB' ticker='BOB' />
          </Flex>
          <TokenInput
            balance={0}
            label='Amount'
            placeholder='0.00'
            // TODO: add balance
            ticker='ETH'
            // TODO: add valueUSD
            valueUSD={0}
            {...mergeProps(form.getFieldProps(BRIDGE_DEPOSIT_AMOUNT))}
          />
          <TransactionDetails
            selectProps={mergeProps(form.getSelectFieldProps(BRIDGE_DEPOSIT_GAS_TOKEN), {
              items: [{ balance: 0, balanceUSD: 0, value: 'ETH' }]
            })}
          />
          <AuthCTA disabled={isSubmitDisabled} size='large' type='submit'>
           {chain?.id === L1_CHAIN_ID ? "Bridge Asset" : "Switch to L1"} 
          </AuthCTA>
        </Flex>
      </form>
    </Flex>
  );
};

export { DepositForm };
