import { theme } from '@interlay/theme';
import { Card, Flex } from '@interlay/ui';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  width: 100%;
`;

const StyledBridge = styled(Flex)`
  flex-direction: column;

  @media ${theme.breakpoints.up('md')} {
    flex-direction: row;
  }
`;

const StyledSection = styled(Flex)`
  width: 100%;

  @media ${theme.breakpoints.up('md')} {
    width: 50%;
  }
`;

export { StyledCard, StyledSection, StyledBridge };
