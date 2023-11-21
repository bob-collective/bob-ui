import { Status } from '@interlay/theme';

import { FlexProps } from '../Flex';

import { StyledAlert, StyledWarningIcon } from './Alert.style';

type Props = {
  status?: Status;
};

type InheritAttrs = Omit<FlexProps, keyof Props>;

type AlertProps = Props & InheritAttrs;

const Alert = ({ status = 'success', children, ...props }: AlertProps): JSX.Element => (
  <StyledAlert $status={status} alignItems='center' gap='spacing4' role='alert' {...props}>
    <StyledWarningIcon />
    <div>{children}</div>
  </StyledAlert>
);

export { Alert };
export type { AlertProps };
