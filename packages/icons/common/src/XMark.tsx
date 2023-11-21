import { forwardRef } from 'react';

import { Icon, IconProps } from './core';

const XMark = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon
    {...props}
    ref={ref}
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M6 18L18 6M6 6l12 12' strokeLinecap='round' strokeLinejoin='round' />
  </Icon>
));

XMark.displayName = 'XMark';

export { XMark };
