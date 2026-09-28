import { normalizeIndianMobile } from '../phone';

describe('normalizeIndianMobile', () => {
  it.each([
    ['9876543210', '919876543210'],
    ['98765 43210', '919876543210'],
    ['+91 98765-43210', '919876543210'],
    ['+919876543210', '919876543210'],
    ['919876543210', '919876543210'],
    ['0091 98765 43210', '919876543210'],
    ['09876543210', '919876543210'],
    ['(0) 98765.43210', '919876543210'],
    ['6000000000', '916000000000'],
  ])('normalizes %p', (input, expected) => {
    expect(normalizeIndianMobile(input)).toBe(expected);
  });

  it.each([
    [''],
    ['   '],
    ['98765'],
    ['5876543210'], // mobiles start with 6–9
    ['011-22901701'], // landline
    ['98765432101'], // 11 digits without a leading 0
    ['+1 415 555 0100'],
    ['98765abc10'],
    ['98+76543210'],
  ])('rejects %p', (input) => {
    expect(normalizeIndianMobile(input)).toBeNull();
  });
});
