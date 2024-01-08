import { CTA, Modal, ModalBody, ModalFooter, ModalHeader, ModalProps } from '@interlay/ui';

import { CrossChainTransferMessage } from '../../../../types/cross-chain';

import { ConfirmationStep, ConfirmationStepVariant } from './ConfirmationStep';
import { SubmittedStep } from './SubmittedStep';

type TransactionModalVariant = ConfirmationStepVariant | 'submitted';

type Props = { variant?: TransactionModalVariant; message: CrossChainTransferMessage | undefined };

type InheritAttrs = Omit<ModalProps, keyof Props | 'children'>;

type TransactionModalProps = Props & InheritAttrs;

const TransactionModal = ({
  variant = 'confirmation',
  message,
  onClose,
  ...props
}: TransactionModalProps): JSX.Element => {
  const title =
    variant === 'confirmation'
      ? 'Waiting for confirmation'
      : variant === 'processing'
        ? 'Processing Transaction '
        : 'Transaction Submitted';

  return (
    <Modal onClose={onClose} {...props}>
      <ModalHeader align='start'>{title}</ModalHeader>
      <ModalBody>
        {variant === 'confirmation' || variant === 'processing' ? (
          <ConfirmationStep variant={variant} message={message} />
        ) : (
          <SubmittedStep message={message as Required<CrossChainTransferMessage>} />
        )}
      </ModalBody>
      {variant === 'submitted' && (
        <ModalFooter>
          <CTA onPress={onClose}>Close</CTA>
        </ModalFooter>
      )}
    </Modal>
  );
};

export { TransactionModal };
export type { TransactionModalProps, TransactionModalVariant };
