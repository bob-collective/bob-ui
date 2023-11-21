import { forwardRef } from 'react';

import { Icon, IconProps } from './core';

const ArrowsUpDown = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon
    ref={ref}
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Icon>
));

ArrowsUpDown.displayName = 'ArrowsUpDown';

export { ArrowsUpDown };
