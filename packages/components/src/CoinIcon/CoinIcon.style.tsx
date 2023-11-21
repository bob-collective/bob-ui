import styled from 'styled-components';
import { Icon } from '@interlay/icons';
import { theme } from '@interlay/theme';

const StyledFallbackIcon = styled(Icon)`
  stroke: ${theme.icon.fallback.stroke};
  color: ${theme.icon.fallback.color};
`;

export { StyledFallbackIcon };
