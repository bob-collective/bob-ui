import { render } from '@testing-library/react';
import { createRef } from 'react';
import { testA11y } from '@interlay/test-utils';

import { Flex } from '..';

describe('Flex', () => {
  it('should render correctly', () => {
    const wrapper = render(<Flex />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = createRef<HTMLDivElement>();

    render(<Flex ref={ref} />);

    expect(ref.current).not.toBeNull();
  });

  it('should pass a11y', async () => {
    await testA11y(<Flex />);
  });
});
