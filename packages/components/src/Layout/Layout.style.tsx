import { theme } from '@interlay/theme';
import { Flex, TextLink } from '@interlay/ui';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLayout = styled(Flex)`
  min-height: 100vh;
`;

const StyledHeader = styled(Flex)`
  width: 100%;
  padding: ${theme.spacing.spacing4};
`;

const StyledLogo = styled(Link)`
  display: inline-flex;
`;

const StyledMain = styled(Flex)`
  padding: ${theme.spacing.spacing4};
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  max-width: ${theme.breakpoints.values.md}px;
`;

const StyledFooter = styled(Flex)`
  width: 100%;
  padding: ${theme.spacing.spacing4};
`;

const StyledSocials = styled(Flex)`
  border-radius: ${theme.rounded.full};
  background-color: rgba(0, 0, 0, 1);
  color: rgba(255, 255, 255, 1);
`;

const StyledSocialItem = styled(TextLink)`
  padding: ${theme.spacing.spacing3} ${theme.spacing.spacing4};
  text-decoration: none;

  &:first-of-type {
    padding-left: ${theme.spacing.spacing8};
  }

  &:last-of-type {
    padding-right: ${theme.spacing.spacing8};
  }
`;

export { StyledLogo, StyledMain, StyledSocials, StyledHeader, StyledSocialItem, StyledLayout, StyledFooter };
