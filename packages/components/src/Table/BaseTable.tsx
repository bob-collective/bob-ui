import { AriaTableProps, useTable } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { TableStateProps, useTableState } from '@react-stately/table';
import { forwardRef, HTMLAttributes } from 'react';
import { useDOMRef } from '@interlay/hooks';

import { StyledTable } from './Table.style';
import { TableCell } from './TableCell';
import { TableColumnHeader } from './TableColumnHeader';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';
import { TableRowGroup } from './TableRowGroup';

type InheritAttrs = TableStateProps<Record<string, any>> & AriaTableProps<Record<string, any>>;

type NativeAttrs = Omit<HTMLAttributes<HTMLTableElement>, keyof InheritAttrs>;

type BaseTableProps = InheritAttrs & NativeAttrs;

const BaseTable = forwardRef<HTMLTableElement, BaseTableProps>(
  ({ onRowAction, onCellAction, onSelectionChange, onSortChange, ...props }, ref): JSX.Element => {
    const tableRef = useDOMRef(ref);

    const statelyProps = { onSelectionChange, onSortChange, ...props };
    const state = useTableState(statelyProps);

    const ariaProps = { onRowAction, onCellAction, ...props };
    const { gridProps } = useTable(ariaProps, state, tableRef);

    const { collection } = state;

    return (
      <StyledTable ref={tableRef} {...mergeProps(props, gridProps)}>
        <TableRowGroup elementType='thead'>
          {collection.headerRows.map((headerRow) => (
            <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
              {[...(collection.getChildren?.(headerRow.key) || [])].map((column) => (
                <TableColumnHeader key={column.key} column={column} state={state} />
              ))}
            </TableHeaderRow>
          ))}
        </TableRowGroup>
        <TableRowGroup elementType='tbody'>
          {[...collection].map((row) => (
            <TableRow key={row.key} item={row} state={state}>
              {[...(collection.getChildren?.(row.key) || [])].map((cell) => (
                <TableCell key={cell.key} cell={cell} state={state} />
              ))}
            </TableRow>
          ))}
        </TableRowGroup>
      </StyledTable>
    );
  }
);

BaseTable.displayName = 'BaseTable';

export { BaseTable };
export type { BaseTableProps };
