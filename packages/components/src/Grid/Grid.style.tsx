import styled from 'styled-components';
import { theme } from '@interlay/theme';

export const GridContainer = styled.div`
  display: grid;
  gap: ${theme.spacing.spacing5};
  grid-template-columns: repeat(4, 1fr);

  @media screen and (min-width: 48em) {
    grid-template-columns: repeat(12, 1fr);
  }
`;
