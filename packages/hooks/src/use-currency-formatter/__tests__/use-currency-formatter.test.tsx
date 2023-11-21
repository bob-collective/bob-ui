import { renderHook } from '@testing-library/react';

import { useCurrencyFormatter } from '../use-currency-formatter';

describe('useCurrencyFormatter', () => {
  describe('simple integer', () => {
    it('should format 0 to $0.00', () => {
      const { result } = renderHook(() => useCurrencyFormatter());

      expect(result.current(0)).toBe('$0.00');
    });

    it('should format 1 to $1.00', () => {
      const { result } = renderHook(() => useCurrencyFormatter());

      expect(result.current(1)).toBe('$1.00');
    });

    it('should format 1.0001 to $1.00', () => {
      const { result } = renderHook(() => useCurrencyFormatter());

      expect(result.current(1.0001)).toBe('$1.00');
    });

    it('should format 1.0001 to $1.00', () => {
      const { result } = renderHook(() => useCurrencyFormatter());

      expect(result.current(1.0001)).toBe('$1.00');
    });
  });

  describe('decimals', () => {
    it('should format 0.1 to $0.100', () => {
      const { result } = renderHook(() => useCurrencyFormatter());

      expect(result.current(0.1)).toBe('$0.100');
    });

    it('should format 0.0001 to $0.0001', () => {
      const { result } = renderHook(() => useCurrencyFormatter());

      expect(result.current(0.0001)).toBe('$0.0001');
    });

    it('should format 0.0000000009 to $0.0000000009', () => {
      const { result } = renderHook(() => useCurrencyFormatter());

      expect(result.current(0.0000000009)).toBe('$0.0000000009');
    });

    it('should format 0.00000000009 to $0.00000000009', () => {
      const { result } = renderHook(() => useCurrencyFormatter());

      expect(result.current(0.00000000009)).toBe('<$0.00000001');
    });
  });

  describe('big integer', () => {
    it('should format 100000 to $100,000.00', () => {
      const { result } = renderHook(() => useCurrencyFormatter());

      expect(result.current(100000)).toBe('$100,000.00');
    });

    it('should format 1000000 to $1M', () => {
      const { result } = renderHook(() => useCurrencyFormatter());

      expect(result.current(1000000)).toBe('$1M');
    });
  });

  it('should not compact', () => {
    const { result } = renderHook(() => useCurrencyFormatter({ compact: false }));

    expect(result.current(0)).toBe('$0.00');
    expect(result.current(0.001)).toBe('$0.00');
    expect(result.current(1)).toBe('$1.00');
    expect(result.current(1000000)).toBe('$1,000,000.00');
  });

  it('should format EUR', () => {
    const { result } = renderHook(() => useCurrencyFormatter({ currency: 'EUR' }));

    expect(result.current(0)).toBe('€0.00');
  });
});
