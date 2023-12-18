import { theme } from '@interlay/theme';
import { Card } from '@interlay/ui';
import styled from 'styled-components';

const StyledChain = styled(Card)`
  padding: ${theme.spacing.spacing2} ${theme.spacing.spacing3};
  white-space: nowrap;
`;

const StyledCard = styled(Card)`
  width: 100%;
`;

const StyledFormWrapper = styled.div`
  /* margin-top: ${theme.spacing.spacing6}; */
`;

// FIXME: should be able to apply gap on RadioGroup
// FIXME: radio is not accepting className
const StyledRadioCard = styled(Card)`
  margin-right: ${theme.spacing.spacing2};
`;

const StyledAnchor = styled.a`
  flex: 1;
  text-decoration: none;
`;

export { StyledChain, StyledAnchor, StyledRadioCard, StyledCard, StyledFormWrapper };
