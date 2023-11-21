import styled from 'styled-components';
import { LabelPosition, theme } from '@interlay/theme';

type StyledLabelProps = {
  $position: LabelPosition;
};

const StyledLabel = styled.label<StyledLabelProps>`
  font-weight: ${theme.fontWeight.medium};
  line-height: ${theme.lineHeight.lg};
  font-size: ${theme.text.xs};
  color: ${theme.label.text};
  padding: ${({ $position }) =>
    $position === 'top'
      ? `${theme.spacing.spacing1} 0`
      : `${theme.spacing.spacing2} ${theme.spacing.spacing1} 0.438rem 0`};
  align-self: flex-start;
`;

export { StyledLabel };
