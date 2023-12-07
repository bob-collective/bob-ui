import { render } from '@testing-library/react';

import { Layout } from '..';

describe('Layout', () => {
  it('should render correctly', () => {
    const wrapper = render(<Layout>Layout</Layout>);

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
