import { render } from '@testing-library/react';
import { testA11y } from '@interlay/test-utils';

import { Stack } from '..';

describe('Stack', () => {
  it('should render correctly', () => {
    const wrapper = render(<Stack />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should pass a11y', async () => {
    await testA11y(<Stack />);
  });
});
