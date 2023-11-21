import { blur, testA11y } from '@interlay/test-utils';
import { render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Key, createRef, useState } from 'react';

import { TokenInput } from '..';

describe('TokenInput', () => {
  it('should render correctly', () => {
    const wrapper = render(<TokenInput label='label' ticker='BTC' />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = createRef<HTMLInputElement>();

    render(<TokenInput ref={ref} label='label' ticker='BTC' />);
    expect(ref.current).not.toBeNull();
  });

  it('should pass a11y', async () => {
    await testA11y(<TokenInput label='label' ticker='BTC' />);
  });

  it('should render with placeholder', () => {
    render(<TokenInput label='label' ticker='BTC' />);

    expect(screen.getByPlaceholderText('0')).toBeInTheDocument();
  });

  it('should render with usd value', () => {
    render(<TokenInput label='label' ticker='BTC' valueUSD={10} />);

    expect(screen.getByText('$10.00')).toBeInTheDocument();
  });

  it('should render with default value', () => {
    render(<TokenInput defaultValue='10' label='label' ticker='BTC' />);

    expect(screen.getByRole('textbox', { name: /label/i })).toHaveValue('10');
  });

  it('should control value', async () => {
    const Component = () => {
      const [value, setValue] = useState('1');

      const handleValueChange = (value?: string | number) => setValue(value?.toString() || '');

      return <TokenInput label='label' ticker='BTC' value={value} onValueChange={handleValueChange} />;
    };

    render(<Component />);

    const input = screen.getByRole('textbox', { name: /label/i });

    expect(input).toHaveValue('1');

    userEvent.type(input, '1');

    await waitFor(() => {
      expect(input).toHaveValue('11');
    });
  });

  it('should render description', () => {
    render(<TokenInput description='Please select token' label='label' ticker='BTC' />);

    expect(screen.getByRole('textbox', { name: /label/i })).toHaveAccessibleDescription(/please select token$/i);
  });

  describe('balance', () => {
    it('should render', () => {
      render(<TokenInput balance={10} label='label' ticker='BTC' />);

      expect(screen.getByRole('definition')).toHaveTextContent('10');
    });

    it('should render human value', () => {
      render(<TokenInput balance={10} humanBalance={11} label='label' ticker='BTC' />);

      expect(screen.getByRole('definition')).toHaveTextContent('11');
    });

    it('should update input when applying max', async () => {
      const handleClickBalance = jest.fn();
      const handleValueChange = jest.fn();

      render(
        <TokenInput
          balance={10}
          humanBalance={11}
          label='label'
          ticker='BTC'
          onClickBalance={handleClickBalance}
          onValueChange={handleValueChange}
        />
      );

      userEvent.click(screen.getByRole('button', { name: /apply max balance/i }));

      await waitFor(() => {
        expect(screen.getByRole('textbox', { name: /label/i })).toHaveValue('10');
      });

      expect(handleValueChange).toHaveBeenCalledTimes(1);
      expect(handleValueChange).toHaveBeenCalledWith(10);
      expect(handleClickBalance).toHaveBeenCalledTimes(1);
      expect(handleClickBalance).toHaveBeenCalledWith(10);
    });

    it('should not emit input onBlur when focus is in max btn', async () => {
      const handleClickBalance = jest.fn();
      const handleBlur = jest.fn();

      render(
        <TokenInput balance={10} label='label' ticker='BTC' onBlur={handleBlur} onClickBalance={handleClickBalance} />
      );

      userEvent.type(screen.getByRole('textbox', { name: /label/i }), '1');

      await waitFor(() => {
        expect(screen.getByRole('textbox', { name: /label/i })).toHaveValue('1');
      });

      userEvent.click(screen.getByRole('button', { name: /apply max balance/i }));

      await waitFor(() => {
        expect(screen.getByRole('textbox', { name: /label/i })).toHaveValue('10');
      });

      expect(handleBlur).not.toHaveBeenCalled();

      blur(screen.getByRole('textbox', { name: /label/i }));

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('should have max btn disabled when balance is 0', async () => {
      const handleClickBalance = jest.fn();

      render(
        <TokenInput balance={0} humanBalance={11} label='label' ticker='BTC' onClickBalance={handleClickBalance} />
      );

      expect(screen.getByRole('button', { name: /apply max balance/i })).toBeDisabled();
    });

    it('should have max btn disabled when input is disabled', async () => {
      const handleClickBalance = jest.fn();

      render(<TokenInput isDisabled balance={10} label='label' ticker='BTC' onClickBalance={handleClickBalance} />);

      expect(screen.getByRole('button', { name: /apply max balance/i })).toBeDisabled();
    });
  });

  describe('fixed type', () => {
    it('should render with ticker adornment', () => {
      render(<TokenInput label='label' ticker='BTC' />);

      expect(screen.getAllByText(/btc/i)).toHaveLength(2);
    });

    it('should render with unknown ticker', () => {
      render(<TokenInput label='label' ticker='ABC' />);

      expect(screen.getAllByText(/abc/i)).toHaveLength(2);
    });

    it('should render with multi ticker', () => {
      render(<TokenInput label='label' ticker={{ text: 'Custom', icons: ['BTC', 'ABC'] }} />);

      expect(screen.getAllByText(/custom/i)).toHaveLength(2);
    });
  });

  describe('selectable type', () => {
    const items = [
      { balance: 1, value: 'BTC', balanceUSD: 10000 },
      { balance: 2, value: 'ETH', balanceUSD: 900 }
    ];

    it('should render correctly', async () => {
      const wrapper = render(<TokenInput label='label' selectProps={{ items }} type='selectable' />);

      expect(() => wrapper.unmount()).not.toThrow();
    });

    it('should pass a11y', async () => {
      await testA11y(<TokenInput label='label' selectProps={{ items }} type='selectable' />);
    });

    it('ref should be forwarded to the modal', async () => {
      const ref = createRef<HTMLInputElement>();

      render(<TokenInput label='label' selectProps={{ items, modalProps: { ref } }} type='selectable' />);

      userEvent.click(screen.getByRole('button', { name: /select token/i }));

      await waitFor(() => {
        expect(screen.getByRole('dialog', { name: /select token/i })).toBeInTheDocument();
      });

      expect(ref.current).not.toBeNull();
    });

    it('should render empty value', () => {
      render(<TokenInput label='label' selectProps={{ items }} type='selectable' />);

      expect(screen.getByRole('button', { name: /select token/i })).toHaveTextContent(/select token$/i);
    });

    it('should render default value', () => {
      render(<TokenInput label='label' selectProps={{ defaultValue: 'BTC', items }} type='selectable' />);

      expect(screen.getByRole('button', { name: /select token/i })).toHaveTextContent('BTC');
    });

    it('should control value', async () => {
      const Component = () => {
        const [value, setValue] = useState('BTC');

        const handleSelectionChange = (key: Key) => setValue(key.toString());

        return (
          <TokenInput
            label='label'
            selectProps={{ defaultValue: 'BTC', items, onSelectionChange: handleSelectionChange, value }}
            type='selectable'
          />
        );
      };

      render(<Component />);

      const selectBtn = screen.getByRole('button', { name: /select token/i });

      expect(selectBtn).toHaveTextContent('BTC');

      userEvent.click(selectBtn);

      await waitFor(() => {
        expect(screen.getByRole('dialog', { name: /select token/i })).toBeInTheDocument();
      });

      const dialog = within(screen.getByRole('dialog', { name: /select token/i }));

      userEvent.click(dialog.getByRole('row', { name: 'ETH' }));

      await waitForElementToBeRemoved(screen.getByRole('dialog', { name: /select token/i }));

      expect(screen.getByRole('button', { name: /select token/i })).toHaveTextContent('ETH');
    });

    it('should render description', () => {
      render(
        <TokenInput label='label' selectProps={{ items, description: 'Please select token' }} type='selectable' />
      );

      expect(screen.getByRole('button', { name: /select token/i })).toHaveAccessibleDescription(
        /please select token$/i
      );
    });

    it('should render select error message', () => {
      render(
        <TokenInput label='label' selectProps={{ items, errorMessage: 'Token field is required' }} type='selectable' />
      );

      expect(screen.getByRole('button', { name: /select token/i })).toHaveAccessibleDescription(
        /token field is required$/i
      );
    });
  });
});
