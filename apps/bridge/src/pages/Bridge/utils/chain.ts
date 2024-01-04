import { L1_CHAIN_ID, L2_CHAIN_ID, useNetwork } from '@gobob/wagmi';

const isL1Chain = (chain: ReturnType<typeof useNetwork>['chain']) => chain?.id === L1_CHAIN_ID;

const isL2Chain = (chain: ReturnType<typeof useNetwork>['chain']) => chain?.id === L2_CHAIN_ID;

export { isL1Chain, isL2Chain };
