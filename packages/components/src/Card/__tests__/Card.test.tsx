import { render } from '@testing-library/react';
import { testA11y } from '@interlay/test-utils';
import { createRef } from 'react';

import { Card } from '..';

describe('Card', () => {
  it('should render correctly', () => {
    const wrapper = render(<Card>content</Card>);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = createRef<HTMLDivElement>();

    render(<Card ref={ref}>content</Card>);

    expect(ref.current).not.toBeNull();
  });

  it('should pass a11y', async () => {
    await testA11y(<Card>content</Card>);
  });
});
