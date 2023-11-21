import { render } from '@testing-library/react';
import { createRef } from 'react';
import { testA11y } from '@interlay/test-utils';

import { Field } from '..';

describe('Field', () => {
  it('should render correctly', () => {
    const wrapper = render(<Field description='Field description' label='Field' />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = createRef<HTMLDivElement>();

    render(<Field ref={ref} description='Field description' label='Field' />);

    expect(ref.current).not.toBeNull();
  });

  it('should pass a11y', async () => {
    await testA11y(<Field description='Field description' label='Field' />);
  });
});
