/**
 * Normalizes an Indian mobile number typed by the user to `91XXXXXXXXXX`, the form stored for
 * the buddy (SPEC §6) and used in `https://wa.me/<number>` links. Returns null if the input is
 * not a valid Indian mobile number.
 *
 * Accepts spaces, dashes, dots and brackets, and a leading +91, 91, 0091 or 0.
 * Indian mobile numbers have 10 digits and start with 6, 7, 8 or 9.
 */
export function normalizeIndianMobile(input: string): string | null {
  const compact = input.replace(/[\s\-.()]/g, '');
  if (!/^\+?\d+$/.test(compact)) return null;

  const digits = compact.replace(/^\+/, '');
  let national = digits;
  if (digits.length === 14 && digits.startsWith('0091')) national = digits.slice(4);
  else if (digits.length === 12 && digits.startsWith('91')) national = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith('0')) national = digits.slice(1);

  return /^[6-9]\d{9}$/.test(national) ? `91${national}` : null;
}
