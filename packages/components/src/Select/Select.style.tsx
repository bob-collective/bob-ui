import styled from 'styled-components';
import { ChevronDown } from '@interlay/icons';
import { theme } from '@interlay/theme';
import { Sizes } from '@interlay/theme';

import { List } from '../List';
import { Span } from '../Text';

type StyledTriggerProps = {
  $isOpen?: boolean;
  $size: Sizes;
  $isDisabled: boolean;
  $hasError: boolean;
};

type StyledTriggerValueProps = {
  $isDisabled?: boolean;
  $isSelected?: boolean;
};

const StyledTrigger = styled.button<StyledTriggerProps>`
  outline: none;
  font: inherit;
  letter-spacing: inherit;
  background: none;

  font-size: ${({ $size }) => theme.select.size[$size].text};
  line-height: ${theme.lineHeight.base};
  color: ${({ $isDisabled }) => ($isDisabled ? theme.input.disabled.color : theme.input.color)};
  background-color: ${({ $isDisabled }) => ($isDisabled ? theme.input.disabled.bg : theme.input.background)};
  overflow: hidden;

  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: left;

  padding: ${({ $size }) => theme.select.size[$size].padding};
  cursor: ${({ $isDisabled }) => !$isDisabled && 'pointer'};
  max-height: ${({ $size }) => `calc(${theme.input[$size].maxHeight} - 1px)`};

  border: ${({ $isDisabled, $hasError }) =>
    $isDisabled ? theme.input.disabled.border : $hasError ? theme.input.error.border : theme.border.default};
  border-radius: ${theme.rounded.md};
  transition:
    border-color ${theme.transition.duration.duration150}ms ease-in-out,
    box-shadow ${theme.transition.duration.duration150}ms ease-in-out;

  &:hover:not(:disabled):not(:focus) {
    border: ${({ $isDisabled, $hasError }) => !$isDisabled && !$hasError && theme.input.hover.border};
  }

  &:focus {
    border: ${({ $isDisabled }) => !$isDisabled && theme.input.focus.border};
    box-shadow: ${({ $isDisabled }) => !$isDisabled && theme.input.focus.boxShadow};
  }
`;

const StyledTriggerValue = styled(Span)<StyledTriggerValueProps>`
  flex: 1;
  display: inline-flex;
  align-items: center;
  color: ${({ $isDisabled, $isSelected }) =>
    $isDisabled ? theme.input.disabled.color : $isSelected ? theme.select.color : theme.select.placeholder};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledList = styled(List)`
  overflow: auto;
  padding: 0 ${theme.dialog.medium.body.paddingX} ${theme.dialog.medium.body.paddingX};
`;

const StyledChevronDown = styled(ChevronDown)`
  margin-left: ${theme.spacing.spacing2};
`;

export { StyledChevronDown, StyledList, StyledTrigger, StyledTriggerValue };
