import { CTA, Modal, ModalBody, ModalFooter, ModalHeader, ModalProps } from '@interlay/ui';

import { CrossChainTransferMessage } from '../../../../types/cross-chain';

import { ConfirmationStep } from './ConfirmationStep';
import { SubmittedStep } from './SubmittedStep';

type Props = { message: CrossChainTransferMessage | undefined };

type InheritAttrs = Omit<ModalProps, keyof Props | 'children'>;

type TransactionModalProps = Props & InheritAttrs;

const TransactionModal = ({ message, onClose, ...props }: TransactionModalProps): JSX.Element | null => {
  return (
    <Modal onClose={onClose} {...props}>
      <ModalHeader align='start'>{!message?.status ? 'Waiting for confirmation' : 'Transaction Submitted'}</ModalHeader>
      <ModalBody>
        {message?.status === undefined ? <ConfirmationStep message={message} /> : <SubmittedStep message={message} />}
      </ModalBody>
      {message?.status !== undefined && (
        <ModalFooter>
          <CTA onPress={onClose}>Close</CTA>
        </ModalFooter>
      )}
    </Modal>
  );
};

export { TransactionModal };
export type { TransactionModalProps };
