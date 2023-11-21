import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { IconProps } from '@interlay/icons';

export type CoinComponent = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
