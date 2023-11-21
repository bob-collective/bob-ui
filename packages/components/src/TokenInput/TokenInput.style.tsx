import styled from 'styled-components';
import { ChevronDown } from '@interlay/icons';
import { theme } from '@interlay/theme';

import { Flex } from '../Flex';
import { List } from '../List';
import { StyledTrigger } from '../Select/Select.style';
import { Dl, Dt, Span } from '../Text';

type StyledUSDAdornmentProps = {
  $isDisabled?: boolean;
};

type StyledListItemSelectedLabelProps = {
  $isSelected: boolean;
};

const StyledTicker = styled.span`
  font-size: ${theme.text.s};
  color: ${theme.colors.textPrimary};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledUSDAdornment = styled.span<StyledUSDAdornmentProps>`
  display: block;
  font-size: ${theme.text.xs};
  line-height: ${theme.lineHeight.s};
  color: ${({ $isDisabled }) => ($isDisabled ? theme.input.disabled.color : theme.colors.textTertiary)};
  white-space: nowrap;
  align-self: flex-start;
`;

const StyledTokenAdornment = styled(Flex)`
  border: ${theme.border.default};
  background-color: ${theme.tokenInput.endAdornment.bg};
  border-radius: ${theme.rounded.md};
  font-size: ${theme.text.s};
  padding: ${theme.spacing.spacing3};
  height: 3rem;
  width: auto;
  overflow: hidden;
`;

const StyledTokenSelect = styled(StyledTrigger)`
  background-color: ${theme.tokenInput.endAdornment.bg};
  opacity: ${({ $isDisabled }) => $isDisabled && 0.5};
  border-radius: ${theme.rounded.md};
  font-size: ${theme.text.s};
  padding: ${theme.spacing.spacing3};
  height: 3rem;
  max-height: 3rem;
  width: auto;
  overflow: hidden;
`;

const StyledChevronDown = styled(ChevronDown)`
  margin-left: ${theme.spacing.spacing1};
`;

const StyledBalance = styled(Dl)`
  padding: ${theme.spacing.spacing1} 0;
`;

const StyledBalanceLabel = styled(Dt)`
  &:after {
    content: ':';
  }
`;

const StyledListItemLabel = styled(Span)<StyledListItemSelectedLabelProps>`
  color: ${({ $isSelected }) =>
    $isSelected ? theme.tokenInput.list.item.selected.text : theme.tokenInput.list.item.default.text};
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledList = styled(List)`
  overflow: auto;
  padding: 0 ${theme.spacing.spacing4} ${theme.spacing.spacing2} ${theme.spacing.spacing4};
`;

const StyledListHeader = styled(Flex)`
  padding: ${theme.spacing.spacing2} ${theme.spacing.spacing4};
`;

const StyledListTokenWrapper = styled(Flex)`
  overflow: hidden;
`;

export {
  StyledChevronDown,
  StyledList,
  StyledListHeader,
  StyledListItemLabel,
  StyledListTokenWrapper,
  StyledTicker,
  StyledTokenAdornment,
  StyledBalance,
  StyledBalanceLabel,
  StyledTokenSelect,
  StyledUSDAdornment
};
