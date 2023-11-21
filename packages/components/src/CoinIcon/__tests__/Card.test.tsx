import { render } from '@testing-library/react';
import { createRef } from 'react';
import { testA11y } from '@interlay/test-utils';

import { CoinIcon } from '..';

describe('CoinIcon', () => {
  it('should render correctly', () => {
    const wrapper = render(<CoinIcon ticker='BTC' />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = createRef<SVGSVGElement>();

    render(
      <CoinIcon ref={ref} ticker='BTC'>
        content
      </CoinIcon>
    );

    expect(ref.current).not.toBeNull();
  });

  it('should pass a11y', async () => {
    await testA11y(<CoinIcon ticker='BTC' />);
  });
});
