import { CTA, Modal, ModalBody, ModalFooter, ModalHeader, ModalProps } from '@interlay/ui';

import { ConfirmationStep } from './ConfirmationStep';
import { SubmittedStep } from './SubmittedStep';
import { CrossChainTransferMessage } from '../../../../types/cross-chain';

type Props = { message: CrossChainTransferMessage };

type InheritAttrs = Omit<ModalProps, keyof Props | 'children'>;

type TransactionModalProps = Props & InheritAttrs;

const TransactionModal = ({ message, onClose, ...props }: TransactionModalProps): JSX.Element | null => {
  return (
    <Modal onClose={onClose} {...props}>
      <ModalHeader align='start'>{!message.status ? 'Waiting for confirmation' : 'Transaction Submitted'}</ModalHeader>
      <ModalBody>
        {!message.status && <ConfirmationStep message={message} />}
        {message.status && <SubmittedStep />}
      </ModalBody>
      {message.status && (
        <ModalFooter>
          <CTA onPress={onClose}>Close</CTA>
        </ModalFooter>
      )}
    </Modal>
  );
};

export { TransactionModal };
export type { TransactionModalProps };
