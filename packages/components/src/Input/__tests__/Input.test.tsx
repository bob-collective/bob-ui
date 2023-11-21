import { blur, focus, testA11y } from '@interlay/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createRef, useState } from 'react';

import { Input } from '..';

describe('Input', () => {
  it('should render correctly', () => {
    const wrapper = render(<Input label='Name' />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = createRef<HTMLInputElement>();

    render(<Input ref={ref} label='label' />);

    expect(ref.current).not.toBeNull();
  });

  it('should pass a11y', async () => {
    await testA11y(<Input label='label' />);
  });

  it('should render default value', () => {
    render(<Input defaultValue='John Doe' label='Name' />);

    expect(screen.getByRole('textbox', { name: /Name/i })).toHaveValue('John Doe');
  });

  it('should control value', async () => {
    const Component = () => {
      const [value, setValue] = useState('John');

      const handleValueChange = (value?: string | number) => setValue(value?.toString() || '');

      return <Input label='Name' value={value} onValueChange={handleValueChange} />;
    };

    render(<Component />);

    const input = screen.getByRole('textbox', { name: /Name/i });

    expect(input).toHaveValue('John');

    userEvent.type(input, 'y');

    await waitFor(() => {
      expect(input).toHaveValue('Johny');
    });
  });

  it('should be disabled', () => {
    render(<Input isDisabled label='Name' />);

    expect(screen.getByRole('textbox', { name: /Name/i })).toBeDisabled();
  });

  it('should render description', () => {
    render(<Input description='Please enter name' label='Name' />);

    expect(screen.getByRole('textbox', { name: /Name/i })).toHaveAccessibleDescription(/please enter name$/i);
  });

  it('should render error message', () => {
    render(<Input errorMessage='Please enter name' label='Name' />);

    expect(screen.getByRole('textbox', { name: /Name/i })).toBeInvalid();
    expect(screen.getByRole('textbox', { name: /Name/i })).toHaveAccessibleDescription(/please enter name$/i);
  });

  it('should be read only', () => {
    render(<Input isReadOnly label='Name' />);

    expect(screen.getByRole('textbox', { name: /Name/i })).toHaveAttribute('readonly');
  });

  it('should be read only', () => {
    render(<Input isRequired label='Name' />);

    expect(screen.getByRole('textbox', { name: /Name/i })).toHaveAttribute('aria-required', 'true');
  });

  it('should emit onChange', async () => {
    const handleChange = jest.fn();

    render(<Input label='Name' onChange={handleChange} />);

    userEvent.type(screen.getByRole('textbox', { name: /Name/i }), 'j');

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  it('should emit onValueChange', async () => {
    const handleValueChange = jest.fn();

    render(<Input label='Name' onValueChange={handleValueChange} />);

    userEvent.type(screen.getByRole('textbox', { name: /Name/i }), 'j');

    await waitFor(() => {
      expect(handleValueChange).toHaveBeenCalledTimes(1);
      expect(handleValueChange).toHaveBeenCalledWith('j');
    });
  });

  it('should emit onBlur', async () => {
    const handleBlur = jest.fn();

    render(<Input label='Name' onBlur={handleBlur} />);

    focus(screen.getByRole('textbox', { name: /Name/i }));
    blur(screen.getByRole('textbox', { name: /Name/i }));

    await waitFor(() => {
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });
});
