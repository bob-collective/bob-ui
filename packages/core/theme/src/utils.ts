import base from './base';
import { Colors, FontSize } from './types';

const resolveColor = (color: Colors | undefined): string => {
  switch (color) {
    case 'primary':
      return base.colors.textPrimary;
    case 'secondary':
      return base.colors.textSecondary;
    case 'tertiary':
      return base.colors.textTertiary;
    case 'success':
      return base.colors.success;
    case 'warning':
      return base.colors.warning;
    case 'error':
      return base.colors.error;
    default:
      return base.colors.textPrimary;
  }
};

const resolveHeight = (size: FontSize | undefined): string | undefined => {
  switch (size) {
    case 's':
      return base.lineHeight.s;
    case 'base':
    case 'lg':
    case 'xl':
    default:
      return base.lineHeight.base;
    case 'xs':
    case 'xl2':
    case 'xl3':
    case 'xl4':
    case 'xl5':
    case 'xl6':
      return undefined;
  }
};

export { resolveColor, resolveHeight };
