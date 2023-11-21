import { render } from '@testing-library/react';
import { createRef } from 'react';
import { testA11y } from '@interlay/test-utils';

import { Popover, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger } from '..';

describe('Popover', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <Popover isOpen>
        <PopoverTrigger>
          <button>trigger</button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>header</PopoverHeader>
          <PopoverBody>body</PopoverBody>
          <PopoverFooter>footer</PopoverFooter>
        </PopoverContent>
      </Popover>
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Popover ref={ref} isOpen>
        <PopoverTrigger>
          <button>trigger</button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>header</PopoverHeader>
          <PopoverBody>body</PopoverBody>
          <PopoverFooter>footer</PopoverFooter>
        </PopoverContent>
      </Popover>
    );

    expect(ref.current).not.toBeNull();
  });

  it('should pass a11y', async () => {
    await testA11y(
      <Popover isOpen>
        <PopoverTrigger>
          <button>trigger</button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>header</PopoverHeader>
          <PopoverBody>body</PopoverBody>
          <PopoverFooter>footer</PopoverFooter>
        </PopoverContent>
      </Popover>
    );
  });
});
