import { MessageDirection, MessageStatus } from '@eth-optimism/sdk';

interface CrossChainTransferMessage {
  amount: bigint; // in wei
  gasEstimate: bigint; // in wei
  direction: MessageDirection;
  waitTime?: number; // in seconds
  status?: MessageStatus;
  // NOTE: Add gas token later if needed.
}

export type { CrossChainTransferMessage };
