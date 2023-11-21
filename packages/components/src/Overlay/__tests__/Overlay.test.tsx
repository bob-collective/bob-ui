import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import { testA11y } from '@interlay/test-utils';

import { Overlay } from '..';

describe('Overlay', () => {
  it('should render correctly', () => {
    const ref = createRef<HTMLDivElement>();

    const wrapper = render(
      <Overlay nodeRef={ref}>
        <div />
      </Overlay>
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should pass a11y', async () => {
    const ref = createRef<HTMLDivElement>();

    await testA11y(
      <Overlay nodeRef={ref}>
        <div />
      </Overlay>
    );
  });
});
