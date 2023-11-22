import styled from 'styled-components';
import { theme } from '@interlay/theme';
import { Flex } from '@interlay/ui';

const StyledWrapper = styled(Flex)`
  padding: 0 ${theme.spacing.spacing4};

  @media ${theme.breakpoints.up('md')} {
    padding: 0 ${theme.spacing.spacing12};
  }
`;

export { StyledWrapper };
