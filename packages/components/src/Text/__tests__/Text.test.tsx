import { render } from '@testing-library/react';
import { testA11y } from '@interlay/test-utils';
import { createRef } from 'react';

import { H1 } from '..';

describe('Text', () => {
  it('should render correctly', () => {
    const wrapper = render(<H1>heading</H1>);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = createRef<HTMLHeadingElement>();

    render(<H1 ref={ref}>heading</H1>);

    expect(ref.current).not.toBeNull();
  });

  it('should pass a11y', async () => {
    await testA11y(<H1>heading</H1>);
  });
});
