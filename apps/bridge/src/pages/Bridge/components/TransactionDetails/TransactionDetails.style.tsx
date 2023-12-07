import styled from 'styled-components';
import { Dl, DlGroup, Dt, Select } from '@interlay/ui';
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
  line-height: 20px;
`;

const StyledDt = styled(Dt)`
  line-height: 1.875rem;
`;

const StyledSelect = styled(Select)`
  button {
    background-color: ${theme.colors.bgPrimary};
  }
`;

export { StyledDl, StyledDlGroup, StyledDt, StyledSelect };
