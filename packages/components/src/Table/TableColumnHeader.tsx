import { useTableColumnHeader } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { TableState } from '@react-stately/table';
import { GridNode } from '@react-types/grid';
import { HTMLAttributes, useRef } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import { StyledTableColumnHeader } from './Table.style';

type Props = {
  state: TableState<Record<string, any>>;
  column: GridNode<Record<string, any>>;
};

type NativeAttrs = Omit<HTMLAttributes<HTMLTableCellElement>, keyof Props>;

type TableColumnHeaderProps = Props & NativeAttrs;

const TableColumnHeader = ({ column, state, ...props }: TableColumnHeaderProps): JSX.Element => {
  const ref = useRef<HTMLTableCellElement>(null);
  const { columnHeaderProps } = useTableColumnHeader({ node: column }, state, ref);

  return (
    <StyledTableColumnHeader ref={ref} colSpan={column.colspan} {...mergeProps(props, columnHeaderProps)}>
      {column.props?.hideHeader ? <VisuallyHidden>{column.rendered}</VisuallyHidden> : column.rendered}
    </StyledTableColumnHeader>
  );
};

export { TableColumnHeader };
export type { TableColumnHeaderProps };
