import { render } from '@testing-library/react';
import { testA11y } from '@interlay/test-utils';

import { Alert } from '..';

describe('Alert', () => {
  it('should render correctly', () => {
    const wrapper = render(<Alert>Alert</Alert>);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should pass a11y', async () => {
    await testA11y(<Alert>Alert</Alert>);
  });
});
