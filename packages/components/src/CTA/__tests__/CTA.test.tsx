import { render } from '@testing-library/react';
import { createRef } from 'react';
import { testA11y } from '@interlay/test-utils';

import { CTA } from '..';

describe('CTA', () => {
  it('should render correctly', () => {
    const wrapper = render(<CTA>Button</CTA>);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = createRef<HTMLButtonElement>();

    render(<CTA ref={ref}>Button</CTA>);

    expect(ref.current).not.toBeNull();
  });

  it('should pass a11y', async () => {
    await testA11y(<CTA>Button</CTA>);
  });
});
