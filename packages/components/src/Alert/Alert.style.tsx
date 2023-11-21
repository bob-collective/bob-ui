import { Warning } from '@interlay/icons';
import styled from 'styled-components';
import { theme } from '@interlay/theme';
import { Status } from '@interlay/theme';

import { Flex } from '../Flex';

type StyledAlertProps = {
  $status: Status;
};

const StyledAlert = styled(Flex)<StyledAlertProps>`
  padding: ${theme.spacing.spacing2};
  color: ${({ $status }) => theme.alert.status[$status]};
  border: 1px solid ${({ $status }) => theme.alert.status[$status]};
  background-color: ${({ $status }) => theme.alert.bg[$status]};
  border-radius: ${theme.rounded.md};
  font-size: ${theme.text.xs};
`;

const StyledWarningIcon = styled(Warning)`
  color: inherit;
  width: ${theme.spacing.spacing5};
  height: ${theme.spacing.spacing5};
  flex-shrink: 0;
`;

export { StyledAlert, StyledWarningIcon };
