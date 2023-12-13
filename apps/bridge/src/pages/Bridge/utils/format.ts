import { formatEther } from 'viem';

const printEther = (weiAmount: bigint, roundingDecimals = 5) => {
  const decimalsOffset = 10n ** BigInt(18 - roundingDecimals);
  const roundedAmount = (weiAmount / decimalsOffset) * decimalsOffset;
  if (roundedAmount === 0n) {
    return `<0.${String().padStart(roundingDecimals - 1, '0')}1`;
  }
  return formatEther(roundedAmount);
};

export { printEther };
