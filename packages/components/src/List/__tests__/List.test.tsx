import { render } from '@testing-library/react';
import { createRef } from 'react';
import { testA11y } from '@interlay/test-utils';

import { List, ListItem } from '..';

describe('List', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <List aria-label='list'>
        <ListItem>item</ListItem>
      </List>
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <List ref={ref} aria-label='list'>
        <ListItem>item</ListItem>
      </List>
    );

    expect(ref.current).not.toBeNull();
  });

  it('should pass a11y', async () => {
    await testA11y(
      <List aria-label='list'>
        <ListItem>item</ListItem>
      </List>
    );
  });
});
