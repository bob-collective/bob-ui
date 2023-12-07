import { theme } from '@interlay/theme';
import { Span } from '@interlay/ui';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: ${theme.spacing.spacing2} ${theme.spacing.spacing3};
  border-radius: ${theme.rounded.full};
  background-color: rgba(0, 0, 0, 1);
  border: none;
  color: rgba(255, 255, 255, 1);
`;

const StyledConnectWallet = styled(Span)`
  line-height: ${theme.spacing.spacing5};
`;

export { StyledButton, StyledConnectWallet };
