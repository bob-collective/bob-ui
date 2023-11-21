import { useLocale } from '@react-aria/i18n';
import { useMemo } from 'react';
import { NumberFormatter } from '@internationalized/number';
import Decimal from 'decimal.js-light';

// any number under this limit is considered very small decimal
const decimalLimit = 0.00000000009;

// number used to replace very small decimals with <$0.00000001
const overDecimalLimitIndicator = 0.00000001;

const standardLimitDigits = 6;

type UseCurrencyFormatterProps = {
  currency?: string;
  compact?: boolean;
};

type UseCurrencyFormatterResult = NumberFormatter['format'];

const useCurrencyFormatter = (options: UseCurrencyFormatterProps = {}): UseCurrencyFormatterResult => {
  let { locale } = useLocale();

  const { compact: compactProp = true, currency = 'USD' } = options;

  const compact = useMemo(
    () =>
      new NumberFormatter(locale, {
        style: 'currency',
        currency,
        notation: 'compact'
      }),
    [locale, options]
  );

  const decimal = useMemo(() => {
    const formatter = new NumberFormatter(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 3,
      maximumFractionDigits: 11
    });

    return formatter;
  }, [locale, options]);

  const standard = useMemo(() => {
    const formatter = new NumberFormatter(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2
    });

    return formatter;
  }, [locale, options]);

  return (value) => {
    if (!compactProp || value === 0) {
      return standard.format(value);
    }

    const isVerySmallDecimal = new Decimal(value).lte(decimalLimit);

    // checks if decimal is lower than the limit
    if (isVerySmallDecimal) {
      return `<${decimal.format(overDecimalLimitIndicator)}`;
    }

    const length = value.toFixed(0).length;

    // checks if the number is solely decimal
    const isOnlyDecimal = length === 1 && value < 1;

    if (isOnlyDecimal) {
      return decimal.format(value);
    }

    // any number above limit digits amount will be formatted with compact approach
    const shouldCompact = length > standardLimitDigits;

    return shouldCompact ? compact.format(value) : standard.format(value);
  };
};

export { useCurrencyFormatter };
export type { UseCurrencyFormatterProps };
