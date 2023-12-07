import { render } from '@testing-library/react';

import { ConnectWallet } from '..';

describe('ConnectWallet', () => {
  it('should render correctly', () => {
    const wrapper = render(<ConnectWallet />);

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
