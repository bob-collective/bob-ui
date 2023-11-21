import { Overflow } from '../../../core/theme/src';
import { DialogBodyProps } from '../Dialog';

import { StyledDialogBody } from './Modal.style';
import { useModalContext } from './ModalContext';

type Props = {
  overflow?: Overflow;
  noPadding?: boolean;
};

type InheritAttrs = Omit<DialogBodyProps, keyof Props>;

type ModalBodyProps = Props & InheritAttrs;

const ModalBody = ({ overflow, noPadding, ...props }: ModalBodyProps): JSX.Element => {
  const { bodyProps } = useModalContext();

  return <StyledDialogBody {...props} $noPadding={noPadding} $overflow={overflow || bodyProps?.overflow} />;
};

export { ModalBody };
export type { ModalBodyProps };
