import { theme } from '@interlay/theme';
import { Flex, Spinner, Span } from '@interlay/ui';
import styled from 'styled-components';

type StyledPillProps = {
  $variant: 'normal' | 'green';
};

const StyledPill = styled(Flex)<StyledPillProps>`
  padding: ${theme.spacing.spacing1} ${theme.spacing.spacing4};
  border-radius: ${theme.rounded.full};
  background-color: ${({ $variant }) => ($variant === 'green' ? '#6effa3' : '#1E2536')};
`;

const StyledSpan = styled(Span)`
  color: #101729;
`;

// FIXME: there is a weird conflit when a second spinner is rendered
// I suggest that temporarly we bring here a spinner instead of using the lib on
const StyledLoadingSpinner = styled(Spinner)`
  border-top-color: #101729;
  border-right-color: #101729;
  border-bottom-color: #101729;
`;

export { StyledPill, StyledSpan, StyledLoadingSpinner };
