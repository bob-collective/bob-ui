import { render } from '@testing-library/react';
import { testA11y } from '@interlay/test-utils';

import { Underlay } from '..';

describe('Underlay', () => {
  it('should render correctly', () => {
    const wrapper = render(<Underlay isOpen />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should pass a11y', async () => {
    await testA11y(<Underlay isOpen />);
  });
});
