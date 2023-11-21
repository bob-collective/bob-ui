import { AriaGridListOptions, useGridList } from '@react-aria/gridlist';
import { mergeProps } from '@react-aria/utils';
import { ListProps as StatelyListProps, useListState } from '@react-stately/list';
import { forwardRef } from 'react';
import { ListVariants } from '@interlay/theme';
import { Selection } from '@react-types/shared';
import { useDOMRef } from '@interlay/hooks';

import { FlexProps } from '../Flex';

import { StyledList } from './List.style';
import { ListItem } from './ListItem';

type Props = {
  variant?: ListVariants;
};

type InheritAttrs = Omit<
  StatelyListProps<Record<string, unknown>> & AriaGridListOptions<Record<string, unknown>>,
  keyof Props
>;

type NativeAttrs = Omit<FlexProps, keyof Props>;

type ListProps = Props & NativeAttrs & InheritAttrs;

// FIXME: use keyboardDelegate for horizontal list (see TagGroup from spectrum)
const List = forwardRef<HTMLDivElement, ListProps>(
  (
    { variant = 'primary', direction = 'column', onSelectionChange, selectionMode, selectedKeys, ...props },
    ref
  ): JSX.Element => {
    const listRef = useDOMRef<HTMLDivElement>(ref);

    const ariaProps: AriaGridListOptions<Record<string, unknown>> = {
      onSelectionChange,
      selectionMode,
      selectedKeys,
      ...props
    };
    const state = useListState(ariaProps);

    const { gridProps } = useGridList(ariaProps, state, listRef);

    return (
      <StyledList
        {...mergeProps(gridProps, props)}
        ref={listRef}
        $variant={variant}
        direction={direction}
        gap={variant === 'card' ? undefined : 'spacing2'}
      >
        {[...state.collection].map((item) => (
          <ListItem key={item.key} item={item} state={state} variant={variant} />
        ))}
      </StyledList>
    );
  }
);

List.displayName = 'List';

export { List };
export type { ListProps, Selection };
