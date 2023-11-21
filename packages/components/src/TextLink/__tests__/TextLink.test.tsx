import { render } from '@testing-library/react';
import { createRef } from 'react';
import { testA11y } from '@interlay/test-utils';

import { TextLink } from '..';

describe('TextLink', () => {
  it('should render correctly', () => {
    const wrapper = render(<TextLink>link</TextLink>);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = createRef<HTMLAnchorElement>();

    render(<TextLink ref={ref}>link</TextLink>);

    expect(ref.current).not.toBeNull();
  });

  it('should pass a11y', async () => {
    await testA11y(<TextLink>link</TextLink>);
  });
});
