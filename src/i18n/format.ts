/**
 * ₹ formatting with Indian digit grouping (₹1,00,000). Uses Intl as SPEC §4 asks, but checks
 * once that the engine really groups in lakhs; if Hermes or an old ICU doesn't, a hand-written
 * formatter produces the same output.
 */

const INR = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

function intlGroupsInLakhs(): boolean {
  try {
    return INR.format(1234567) === '₹12,34,567' && INR.format(-1500) === '-₹1,500';
  } catch {
    return false;
  }
}

/** Groups a non-negative integer the Indian way: last three digits, then pairs. */
export function groupIndian(n: number): string {
  const digits = String(Math.trunc(Math.abs(n)));
  if (digits.length <= 3) return digits;
  const head = digits.slice(0, -3);
  const tail = digits.slice(-3);
  return `${head.replace(/\B(?=(\d{2})+$)/g, ',')},${tail}`;
}

/** Fallback with the same rounding as Intl's default (half away from zero). */
export function formatINRFallback(amount: number): string {
  const rounded = Math.round(Math.abs(amount));
  const sign = amount < 0 && rounded !== 0 ? '-' : '';
  return `${sign}₹${groupIndian(rounded)}`;
}

const useIntl = intlGroupsInLakhs();

/** Which formatter this device uses. Shown in dev builds to verify Hermes (SPEC §4). */
export const inrFormatterSource: 'intl' | 'fallback' = useIntl ? 'intl' : 'fallback';

/** Whole rupees with lakh/crore grouping, e.g. formatINR(100000) === '₹1,00,000'. */
export function formatINR(amount: number): string {
  // Intl prints "-₹0" for small negatives; nothing that rounds to zero should carry a sign.
  const value = Math.abs(amount) < 0.5 ? 0 : amount;
  return useIntl ? INR.format(value) : formatINRFallback(value);
}
