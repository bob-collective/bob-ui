import '@testing-library/jest-dom';
import { RenderOptions } from '@testing-library/react';
import { axe, toHaveNoViolations, JestAxeConfigureOptions } from 'jest-axe';
import * as React from 'react';

import { render } from './render';

expect.extend(toHaveNoViolations);

export async function testA11y(
  ui: React.ReactElement | HTMLElement,
  options: RenderOptions & { axeOptions?: JestAxeConfigureOptions } = {}
) {
  const { axeOptions } = options;
  const container = React.isValidElement(ui) ? render(ui).container : ui;
  const results = await axe(container as HTMLElement, axeOptions);

  expect(results).toHaveNoViolations();
}
