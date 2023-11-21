import { render } from '@testing-library/react';
import { testA11y } from '@interlay/test-utils';
import { createRef } from 'react';

import { Select, Item } from '..';

describe('Select', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <Select label='label'>
        <Item key='1'>item 1</Item>
      </Select>
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = createRef<HTMLInputElement>();

    render(
      <Select ref={ref} label='label'>
        <Item key='1'>item 1</Item>
      </Select>
    );

    expect(ref.current).not.toBeNull();
  });

  describe('type modal', () => {
    it('should render correctly', () => {
      const wrapper = render(
        <Select defaultOpen label='label' type='modal'>
          <Item key='1'>item 1</Item>
        </Select>
      );

      expect(() => wrapper.unmount()).not.toThrow();
    });

    it('should forwarded modal ref', () => {
      const ref = createRef<HTMLDivElement>();

      render(
        <Select defaultOpen label='label' modalProps={{ ref }} type='modal'>
          <Item key='1'>item 1</Item>
        </Select>
      );

      expect(ref.current).not.toBeNull();
    });

    it('should pass a11y', async () => {
      await testA11y(
        <Select defaultOpen label='label' type='modal'>
          <Item key='1'>item 1</Item>
        </Select>
      );
    });
  });
});
