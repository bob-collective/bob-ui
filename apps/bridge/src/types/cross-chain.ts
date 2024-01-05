import { MessageDirection, MessageStatus } from '@eth-optimism/sdk';

type PreCrossChainTransferMessage = {
  amount: bigint; // in wei
  gasEstimate: bigint; // in wei
  direction: MessageDirection;
  waitTime: number; // in seconds
};

type CrossChainTransferMessage = PreCrossChainTransferMessage & {
  status?: MessageStatus;
  transactionHash?: string;
  // NOTE: Add gas token later if needed.
};

export type { CrossChainTransferMessage, PreCrossChainTransferMessage };
