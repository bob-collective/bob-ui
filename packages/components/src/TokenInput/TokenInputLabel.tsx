import { ReactNode } from 'react';

import { Flex } from '../Flex';
import { Label, LabelProps } from '../Label';

type Props = {
  balance?: ReactNode;
};

type InheritAttrs = Omit<LabelProps, keyof Props>;

type TokenInputLabelProps = Props & InheritAttrs;

const TokenInputLabel = ({ balance, children, ...props }: TokenInputLabelProps): JSX.Element => {
  const hasLabel = !!children;

  return (
    <Flex gap='spacing0' justifyContent={hasLabel ? 'space-between' : 'flex-end'}>
      {hasLabel && <Label {...props}>{children}</Label>}
      {balance}
    </Flex>
  );
};

export { TokenInputLabel };
export type { TokenInputLabelProps };
