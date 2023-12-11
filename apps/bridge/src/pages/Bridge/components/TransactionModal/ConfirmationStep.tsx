import { Flex, FlexProps, LoadingSpinner, P } from '@interlay/ui';

import { CrossChainTransferMessage } from '../../../../types/cross-chain';
import { BridgeDetails } from '../BridgeDetails';
import { TransactionDetails } from '../TransactionDetails';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { message: CrossChainTransferMessage | undefined };

type InheritAttrs = Omit<FlexProps, keyof Props | 'children'>;

type ConfirmationStepProps = Props & InheritAttrs;

const ConfirmationStep = ({ message, ...props }: ConfirmationStepProps): JSX.Element | null => {
  return (
    <Flex alignItems='center' direction='column' gap='spacing8' {...props}>
      <LoadingSpinner color='secondary' diameter={100} thickness={8} variant='indeterminate' />
      <BridgeDetails alignItems='center' direction='column' message={message} />
      <Flex alignSelf='normal' direction='column' gap='spacing4'>
        <P align='center' size='xs' weight='medium'>
          Please Confirm transfer in wallet.
        </P>
        <TransactionDetails message={message} />
      </Flex>
    </Flex>
  );
};

export { ConfirmationStep };
export type { ConfirmationStepProps };
