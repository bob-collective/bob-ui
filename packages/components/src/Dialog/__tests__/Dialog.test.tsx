import { render } from '@testing-library/react';
import { createRef } from 'react';
import { testA11y } from '@interlay/test-utils';

import { Dialog, DialogBody, DialogDivider, DialogFooter, DialogHeader } from '..';

describe('Dialog', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <Dialog>
        <DialogHeader>title</DialogHeader>
        <DialogDivider />
        <DialogBody>body</DialogBody>
        <DialogFooter>footer</DialogFooter>
      </Dialog>
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Dialog ref={ref}>
        <DialogHeader>title</DialogHeader>
        <DialogDivider />
        <DialogBody>body</DialogBody>
        <DialogFooter>footer</DialogFooter>
      </Dialog>
    );

    expect(ref.current).not.toBeNull();
  });

  it('should pass a11y', async () => {
    await testA11y(
      <Dialog>
        <DialogHeader>title</DialogHeader>
        <DialogDivider />
        <DialogBody>body</DialogBody>
        <DialogFooter>footer</DialogFooter>
      </Dialog>
    );
  });
});
