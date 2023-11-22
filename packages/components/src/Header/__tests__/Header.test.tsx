import { render } from '@testing-library/react';

import { Header } from '..';

describe('Header', () => {
  it('should render correctly', () => {
    const wrapper = render(<Header>Header</Header>);

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
