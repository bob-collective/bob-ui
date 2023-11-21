import { render } from '@testing-library/react';
import * as React from 'react';
import { testA11y } from '@interlay/test-utils';

import { Accordion, AccordionItem } from '..';

describe('Accordion', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <Accordion>
        <AccordionItem title='Item'>Content</AccordionItem>
      </Accordion>
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Accordion ref={ref}>
        <AccordionItem title='Item'>Content</AccordionItem>
      </Accordion>
    );
    expect(ref.current).not.toBeNull();
  });

  it('should pass a11y', async () => {
    await testA11y(
      <Accordion>
        <AccordionItem title='Item'>Content</AccordionItem>
      </Accordion>
    );
  });
});
