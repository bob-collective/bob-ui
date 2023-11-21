type BreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type ResponsiveProp<T extends number | string> = T | Partial<{ [K in BreakPoints]: T }>;

const values: Record<BreakPoints, number> = {
  xs: 0, // phone
  sm: 600, // tablet
  md: 900, // small laptop
  lg: 1200, // desktop
  xl: 1536 // large screen
};

const breakpoints = {
  values,
  up: (key: BreakPoints): string => `(min-width:${values[key]}px)`,
  down: (key: BreakPoints): string => `(max-width:${values[key]}px)`
};

export { breakpoints };
export type { BreakPoints, ResponsiveProp };
