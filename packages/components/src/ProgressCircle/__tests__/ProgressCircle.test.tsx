import { render } from '@testing-library/react';
import { testA11y } from '@interlay/test-utils';

import { ProgressCircle } from '..';

describe('ProgressCircle', () => {
  it('should render correctly', () => {
    const wrapper = render(<ProgressCircle aria-label='progress' />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should pass a11y', async () => {
    await testA11y(<ProgressCircle aria-label='progress' />);
  });
});
