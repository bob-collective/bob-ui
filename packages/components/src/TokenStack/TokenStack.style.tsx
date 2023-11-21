import styled from 'styled-components';
import { IconSize } from '@interlay/theme';
import { theme } from '@interlay/theme';

import { Flex } from '../Flex';

const getOffset = (offset: TokenOffset) => {
  switch (offset) {
    case 'lg':
      return '-0.5';
    default:
    case 'md':
      return '-0.33';
    case 's':
      return '-0.25';
  }
};

type TokenOffset = 'none' | 's' | 'md' | 'lg';

type StyledWrapperProps = {
  $size: IconSize;
  $offset: TokenOffset;
};

const StyledWrapper = styled(Flex)<StyledWrapperProps>`
  display: flex;

  > :not(:last-child) {
    // Coin one covers 30% of coin two
    margin-right: ${({ $size, $offset }) =>
      $offset !== 'none' && `calc(${theme.icon.sizes[$size]} * ${getOffset($offset)})`};
  }
`;

export { StyledWrapper };
export type { StyledWrapperProps, TokenOffset };
