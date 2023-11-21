import styled, { css } from 'styled-components';
import { theme } from '@interlay/theme';
import { ListVariants } from '@interlay/theme';

import { Flex } from '../Flex';

type StyledListProps = {
  $variant: ListVariants;
};

const StyledList = styled(Flex)<StyledListProps>`
  background-color: ${({ $variant }) => theme.list?.[$variant]?.bg};
  border-radius: ${({ $variant }) => theme.list[$variant].rounded};
  border: ${({ $variant }) => theme.list[$variant].border};
  overflow: hidden;
`;

type StyledListItemProps = {
  $variant: ListVariants;
  $isDisabled: boolean;
  $isHovered: boolean;
  $isInteractable: boolean;
  $isFocusVisible: boolean;
};

const StyledListItem = styled.div<StyledListItemProps>`
  flex: 1;
  align-self: stretch;
  padding: ${theme.spacing.spacing3};
  border-radius: ${({ $variant }) => theme.list.item[$variant].rounded};
  background-color: ${({ $variant, $isHovered, $isFocusVisible }) =>
    $isHovered || $isFocusVisible ? theme.list.item[$variant].hover.bg : theme.list.item[$variant].bg};
  border: ${({ $variant }) => $variant !== 'card' && theme.list.item[$variant].border};
  color: ${theme.colors.textPrimary};
  cursor: ${({ $isInteractable }) => $isInteractable && 'pointer'};
  outline: ${({ $isFocusVisible }) => !$isFocusVisible && 'none'};
  opacity: ${({ $isDisabled }) => $isDisabled && 0.5};
  white-space: nowrap;

  ${({ $variant }) => {
    if ($variant === 'card') {
      return css`
        &:not(:first-of-type) {
          border-top: ${theme.list.item.card.border};
        }
      `;
    }

    return css`
      &[aria-selected='true'] {
        background-color: ${theme.list.item[$variant].selected.bg};
        color: ${theme.list.text};
        border-color: ${theme.list.item[$variant].selected.bg};
      }
    `;
  }}
`;

export { StyledList, StyledListItem };
