import { forwardRef } from 'react';

import { Icon, IconProps } from './core';

const ChevronDown = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon
    {...props}
    ref={ref}
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M19.5 8.25l-7.5 7.5-7.5-7.5' strokeLinecap='round' strokeLinejoin='round' />
  </Icon>
));

ChevronDown.displayName = 'ChevronDown';

export { ChevronDown };
