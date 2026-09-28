import { formatINR, formatINRFallback, groupIndian, inrFormatterSource } from '../format';

describe('formatINR', () => {
  it.each([
    [0, '₹0'],
    [7, '₹7'],
    [149, '₹149'],
    [999, '₹999'],
    [1000, '₹1,000'],
    [99999, '₹99,999'],
    [100000, '₹1,00,000'],
    [1234567, '₹12,34,567'],
    [10000000, '₹1,00,00,000'],
    [99.5, '₹100'],
    [99.4, '₹99'],
    [-1500, '-₹1,500'],
  ])('formats %p as %p', (amount, expected) => {
    expect(formatINR(amount)).toBe(expected);
    expect(formatINRFallback(amount)).toBe(expected);
  });

  it('uses Intl on Node (full ICU)', () => {
    expect(inrFormatterSource).toBe('intl');
  });

  it('fallback matches Intl across a range of amounts', () => {
    const intl = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    });
    for (let n = -2_000_000; n <= 20_000_000; n += 7_919.37) {
      expect(formatINRFallback(n)).toBe(intl.format(n));
    }
  });

  it('never shows a minus sign on amounts that round to zero', () => {
    expect(formatINR(-0.4)).toBe('₹0');
    expect(formatINRFallback(-0.4)).toBe('₹0');
  });
});

describe('groupIndian', () => {
  it.each([
    [0, '0'],
    [12, '12'],
    [123, '123'],
    [1234, '1,234'],
    [12345, '12,345'],
    [123456, '1,23,456'],
    [1234567, '12,34,567'],
    [123456789, '12,34,56,789'],
  ])('groups %p as %p', (n, expected) => {
    expect(groupIndian(n)).toBe(expected);
  });
});
