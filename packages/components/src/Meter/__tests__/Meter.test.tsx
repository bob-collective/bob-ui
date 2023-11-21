import { render } from '@testing-library/react';
import { testA11y } from '@interlay/test-utils';

import { Meter } from '..';

describe('Meter', () => {
  it('should render correctly', () => {
    const wrapper = render(<Meter ranges={[0, 50, 60, 100]} />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should pass a11y', async () => {
    await testA11y(<Meter ranges={[0, 50, 60, 100]} />);
  });
});
