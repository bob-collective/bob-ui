import { MessageDirection, MessageStatus } from '@eth-optimism/sdk';

interface CrossChainTransferMessage {
  amount: bigint; // in wei
  waitTime: number; // in seconds
  direction: MessageDirection;
  gasEstimate: bigint; // in wei
  status: MessageStatus | null;
  // NOTE: Add gas token later if needed.
}

export type { CrossChainTransferMessage };
