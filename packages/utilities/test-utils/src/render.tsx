import '@testing-library/jest-dom';
import { render as rtlRender } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import * as React from 'react';
import userEvent from '@testing-library/user-event';

expect.extend(toHaveNoViolations);

export function render(
  ui: React.ReactElement
): ReturnType<typeof rtlRender> & { user: ReturnType<typeof userEvent.setup> } {
  const user = userEvent.setup();

  const result = rtlRender(ui);

  return { user, ...result };
}
