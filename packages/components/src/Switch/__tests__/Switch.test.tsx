import { render } from '@testing-library/react';
import { createRef } from 'react';
import { testA11y } from '@interlay/test-utils';

import { Switch } from '..';

describe('Switch', () => {
  it('should render correctly', () => {
    const wrapper = render(<Switch>switch</Switch>);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = createRef<HTMLLabelElement>();

    render(<Switch ref={ref}>switch</Switch>);

    expect(ref.current).not.toBeNull();
  });

  it('should pass a11y', async () => {
    await testA11y(<Switch>switch</Switch>);
  });
});
