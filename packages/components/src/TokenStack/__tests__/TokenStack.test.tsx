import { render } from '@testing-library/react';
import { testA11y } from '@interlay/test-utils';

import { TokenStack } from '..';

describe('TokenStack', () => {
  it('should render correctly', () => {
    const wrapper = render(<TokenStack tickers={['BTC']} />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should pass a11y', async () => {
    await testA11y(<TokenStack tickers={['BTC']} />);
  });
});
