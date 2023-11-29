import styled from 'styled-components';
import { Dl, DlGroup } from '@interlay/ui';
import { theme } from '@interlay/theme';

const StyledDl = styled(Dl)`
  border: ${theme.border.default};
  background-color: ${theme.card.bg.tertiary};
  padding: ${theme.spacing.spacing4};
  font-size: ${theme.text.xs};
  border-radius: ${theme.rounded.lg};
`;

// This custom padding helps to keep harmony between normal elements and elements with small select
const StyledDlGroup = styled(DlGroup)`
  &:first-of-type {
    padding-bottom: 0.407rem;
  }

  &:not(:first-of-type):not(:last-of-type) {
    padding: 0.407rem 0;
  }

  &:last-of-type {
    padding-top: 0.407rem;
  }
`;

export { StyledDl, StyledDlGroup };
