import { useState } from 'react';
import { CTA, Modal, ModalBody, ModalFooter, ModalHeader, ModalProps } from '@interlay/ui';

import { ConfirmationStep } from './ConfirmationStep';
import { SubmittedStep } from './SubmittedStep';

enum Steps {
  CONFIRMATION,
  SUBMITTED
}

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

type InheritAttrs = Omit<ModalProps, keyof Props | 'children'>;

type TransactionModalProps = Props & InheritAttrs;

const TransactionModal = ({ onClose, ...props }: TransactionModalProps): JSX.Element | null => {
  // TODO: apply step progression
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [step, setStep] = useState(Steps.CONFIRMATION);

  return (
    <Modal onClose={onClose} {...props}>
      <ModalHeader align='start'>
        {step === Steps.CONFIRMATION ? 'Waiting for confirmation' : 'Transaction Submitted'}
      </ModalHeader>
      <ModalBody>
        {step === Steps.CONFIRMATION && <ConfirmationStep />}
        {step === Steps.SUBMITTED && <SubmittedStep />}
      </ModalBody>
      {step === Steps.SUBMITTED && (
        <ModalFooter>
          <CTA onPress={onClose}>Close</CTA>
        </ModalFooter>
      )}
    </Modal>
  );
};

export { TransactionModal };
export type { TransactionModalProps };
