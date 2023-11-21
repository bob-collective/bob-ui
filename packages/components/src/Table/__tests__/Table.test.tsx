import { testA11y } from '@interlay/test-utils';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createRef } from 'react';

import { Table } from '..';

describe('Table', () => {
  const columns = [
    { name: 'First Name', id: 'firstName' },
    { name: 'Last Name', id: 'lastName' },
    { name: 'Action', id: 'action', hideHeader: true }
  ];

  const rows = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      action: <input aria-label='action' type='checkbox' />
    },
    { id: 2, firstName: 'Bob', lastName: 'Junior', action: <input aria-label='action' type='checkbox' /> }
  ];

  it('should render correctly', () => {
    const wrapper = render(<Table aria-label='table' columns={columns} rows={rows} />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = createRef<HTMLTableElement>();

    render(<Table ref={ref} aria-label='table' columns={columns} rows={rows} />);

    expect(ref.current).not.toBeNull();
  });

  it('should pass a11y', async () => {
    await testA11y(<Table aria-label='table' columns={columns} rows={rows} />);
  });

  it('should render header correctly', async () => {
    render(<Table aria-label='table' columns={columns} rows={rows} />);

    const table = within(screen.getByRole('grid'));

    const header = within(table.getAllByRole('rowgroup')[0]);

    const headerRow = within(header.getByRole('row'));

    const columnHeader = headerRow.getAllByRole('columnheader');

    expect(columnHeader).toHaveLength(3);
    const [firstNameCell, lastNameCell, actionCell] = columnHeader;

    expect(firstNameCell).toHaveTextContent(/first name/i);
    expect(lastNameCell).toHaveTextContent(/last name/i);
    expect(actionCell).toHaveTextContent(/action/i);
  });

  it('should render body correctly', async () => {
    render(<Table aria-label='table' columns={columns} rows={rows} />);

    const table = within(screen.getByRole('grid'));

    const body = within(table.getAllByRole('rowgroup')[1]);

    const bodyRows = body.getAllByRole('row');

    expect(bodyRows).toHaveLength(2);

    const bodyRow = within(bodyRows[0]);

    expect(bodyRow.getByRole('rowheader')).toHaveTextContent(/john/i);

    const gridCells = bodyRow.getAllByRole('gridcell');

    expect(gridCells).toHaveLength(2);

    const [lastNameCell, actionCell] = gridCells;

    expect(lastNameCell).toHaveTextContent(/doe/i);

    expect(within(actionCell).getByRole('checkbox')).toBeInTheDocument();
  });

  it('should emit event when row is clicked', async () => {
    const handleRowAction = jest.fn();

    render(<Table aria-label='table' columns={columns} rows={rows} onRowAction={handleRowAction} />);

    const table = within(screen.getByRole('grid'));

    const body = within(table.getAllByRole('rowgroup')[1]);

    const bodyRows = body.getAllByRole('row');

    userEvent.click(bodyRows[0]);

    await waitFor(() => {
      expect(handleRowAction).toHaveBeenCalledTimes(1);
      expect(handleRowAction).toHaveBeenCalledWith(1);
    });
  });

  it('should not emit event when row input is pressed ', async () => {
    const handleRowAction = jest.fn();

    render(<Table aria-label='table' columns={columns} rows={rows} onRowAction={handleRowAction} />);

    const table = within(screen.getByRole('grid'));

    const body = within(table.getAllByRole('rowgroup')[1]);

    const bodyRows = body.getAllByRole('row');

    // needs to be fireEvent
    fireEvent.click(within(bodyRows[0]).getByRole('checkbox'));

    await waitFor(() => {
      expect(handleRowAction).not.toHaveBeenCalled();
    });
  });
});
