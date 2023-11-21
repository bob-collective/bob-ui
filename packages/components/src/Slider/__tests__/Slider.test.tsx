import { render } from '@testing-library/react';
import { testA11y } from '@interlay/test-utils';
import { createRef } from 'react';

import { Slider } from '..';

describe('Slider', () => {
  it('should render correctly', () => {
    const wrapper = render(<Slider label='label' />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = createRef<HTMLInputElement>();

    render(<Slider ref={ref} label='label' />);

    expect(ref.current).not.toBeNull();
  });

  it('should pass a11y', async () => {
    await testA11y(<Slider label='label' />);
  });
});
