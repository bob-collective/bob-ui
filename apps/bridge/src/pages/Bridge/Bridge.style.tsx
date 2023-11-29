import { theme } from '@interlay/theme';
import { Card, Flex } from '@interlay/ui';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  width: 100%;
`;

const StyledFormWrapper = styled.div`
  margin-top: ${theme.spacing.spacing8};
`;

const StyledBridge = styled(Flex)`
  flex-direction: column;

  @media ${theme.breakpoints.up('md')} {
    flex-direction: row;
  }
`;

export { StyledCard, StyledFormWrapper, StyledBridge };
