import { Flex, FlexProps, Spinner, P } from '@interlay/ui';

import { CrossChainTransferMessage } from '../../../../types/cross-chain';
import { BridgeDetails } from '../BridgeDetails';
import { TransactionDetails } from '../TransactionDetails';

type ConfirmationStepVariant = 'confirmation' | 'processing';

type Props = { variant?: ConfirmationStepVariant; message: CrossChainTransferMessage | undefined };

type InheritAttrs = Omit<FlexProps, keyof Props | 'children'>;

type ConfirmationStepProps = Props & InheritAttrs;

const ConfirmationStep = ({ variant = 'confirmation', message, ...props }: ConfirmationStepProps): JSX.Element => {
  const description =
    variant === 'confirmation' ? 'Please Confirm transfer in wallet' : 'Your transaction is being proccessed';

  return (
    <Flex alignItems='center' direction='column' gap='spacing8' {...props}>
      <Spinner color='secondary' size='xl2' thickness={8} />
      <BridgeDetails
        alignItems='center'
        amount={message?.amount}
        direction='column'
        transferDirection={message?.direction}
      />
      <Flex alignSelf='normal' direction='column' gap='spacing4'>
        <P align='center' size='xs' weight='medium'>
          {description}
        </P>
        <TransactionDetails message={message} />
      </Flex>
    </Flex>
  );
};

export { ConfirmationStep };
export type { ConfirmationStepProps, ConfirmationStepVariant };
