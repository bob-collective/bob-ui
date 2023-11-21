import { render } from '@testing-library/react';
import { testA11y } from '@interlay/test-utils';

import { LoadingSpinner } from '..';

describe('LoadingSpinner', () => {
  it('should render correctly', () => {
    const wrapper = render(<LoadingSpinner aria-label='loading' />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should pass a11y', async () => {
    await testA11y(<LoadingSpinner aria-label='loading' />);
  });
});
