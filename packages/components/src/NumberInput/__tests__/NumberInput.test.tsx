import { blur, focus, testA11y } from '@interlay/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createRef, useState } from 'react';

import { NumberInput } from '..';

describe('NumberInput', () => {
  it('should render correctly', () => {
    const wrapper = render(<NumberInput label='Amount' />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = createRef<HTMLInputElement>();

    render(<NumberInput ref={ref} label='label' />);

    expect(ref.current).not.toBeNull();
  });

  it('should pass a11y', async () => {
    await testA11y(<NumberInput label='label' />);
  });

  it('should be disabled', () => {
    render(<NumberInput isDisabled label='Amount' />);

    expect(screen.getByRole('textbox', { name: /amount/i })).toBeDisabled();
  });

  it('should render default value', () => {
    render(<NumberInput defaultValue='John Doe' label='Amount' />);

    expect(screen.getByRole('textbox', { name: /amount/i })).toHaveValue('John Doe');
  });

  it('should control value', async () => {
    const Component = () => {
      const [value, setValue] = useState('1');

      const handleValueChange = (value?: string | number) => setValue(value?.toString() || '');

      return <NumberInput label='Amount' value={value} onValueChange={handleValueChange} />;
    };

    render(<Component />);

    const input = screen.getByRole('textbox', { name: /amount/i });

    expect(input).toHaveValue('1');

    userEvent.type(input, '0');

    await waitFor(() => {
      expect(input).toHaveValue('10');
    });
  });

  it('should be disabled', () => {
    render(<NumberInput isDisabled label='Amount' />);

    expect(screen.getByRole('textbox', { name: /amount/i })).toBeDisabled();
  });

  it('should render description', () => {
    render(<NumberInput description='Please enter name' label='Amount' />);

    expect(screen.getByRole('textbox', { name: /amount/i })).toHaveAccessibleDescription(/please enter name$/i);
  });

  it('should render error message', () => {
    render(<NumberInput errorMessage='Please enter name' label='Amount' />);

    expect(screen.getByRole('textbox', { name: /amount/i })).toBeInvalid();
    expect(screen.getByRole('textbox', { name: /amount/i })).toHaveAccessibleDescription(/please enter name$/i);
  });

  it('should be read only', () => {
    render(<NumberInput isReadOnly label='Amount' />);

    expect(screen.getByRole('textbox', { name: /amount/i })).toHaveAttribute('readonly');
  });

  it('should be read only', () => {
    render(<NumberInput isRequired label='Amount' />);

    expect(screen.getByRole('textbox', { name: /amount/i })).toHaveAttribute('aria-required', 'true');
  });

  it('should emit onValueChange', async () => {
    const handleValueChange = jest.fn();

    render(<NumberInput label='Amount' onValueChange={handleValueChange} />);

    userEvent.type(screen.getByRole('textbox', { name: /amount/i }), '1');

    await waitFor(() => {
      expect(handleValueChange).toHaveBeenCalledTimes(1);
      expect(handleValueChange).toHaveBeenCalledWith('1');
    });
  });

  it('should emit onBlur', async () => {
    const handleBlur = jest.fn();

    render(<NumberInput label='Amount' onBlur={handleBlur} />);

    focus(screen.getByRole('textbox', { name: /amount/i }));
    blur(screen.getByRole('textbox', { name: /amount/i }));

    await waitFor(() => {
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('inputMode decimal', () => {
    it('should emit onChange', async () => {
      const handleChange = jest.fn();

      render(<NumberInput defaultValue='10' inputMode='decimal' label='Amount' onChange={handleChange} />);

      userEvent.type(screen.getByRole('textbox', { name: /amount/i }), '.');

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(screen.getByRole('textbox', { name: /amount/i })).toHaveValue('10.');
      });
    });

    it('should not emit onChange', async () => {
      const handleChange = jest.fn();

      render(<NumberInput defaultValue='10.2' inputMode='decimal' label='Amount' onChange={handleChange} />);

      userEvent.type(screen.getByRole('textbox', { name: /amount/i }), '.,');

      await waitFor(() => {
        expect(handleChange).not.toHaveBeenCalled();
        expect(screen.getByRole('textbox', { name: /amount/i })).toHaveValue('10.2');
      });
    });
  });

  describe('inputMode numeric', () => {
    it('should emit onChange', async () => {
      const handleChange = jest.fn();

      render(<NumberInput label='Amount' onChange={handleChange} />);

      userEvent.type(screen.getByRole('textbox', { name: /amount/i }), '2');

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledTimes(1);
      });
    });

    it('should not emit onChange', async () => {
      const handleChange = jest.fn();

      render(<NumberInput defaultValue='10' inputMode='decimal' label='Amount' onChange={handleChange} />);

      userEvent.type(screen.getByRole('textbox', { name: /amount/i }), '.,');

      await waitFor(() => {
        expect(handleChange).not.toHaveBeenCalled();
        expect(screen.getByRole('textbox', { name: /amount/i })).toHaveValue('10');
      });
    });
  });
});
