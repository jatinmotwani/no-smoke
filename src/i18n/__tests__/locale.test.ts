import { pickLocale } from '../locale';

describe('pickLocale', () => {
  it.each([
    [[{ languageCode: 'hi' }], 'hi-IN'],
    [[{ languageCode: 'en' }], 'en-IN'],
    [[{ languageCode: 'mr' }, { languageCode: 'hi' }], 'hi-IN'],
    [[{ languageCode: 'ta' }, { languageCode: 'en' }, { languageCode: 'hi' }], 'en-IN'],
    [[{ languageCode: 'ta' }], 'en-IN'],
    [[{ languageCode: null }], 'en-IN'],
    [[], 'en-IN'],
  ] as const)('%j -> %s', (preferred, expected) => {
    expect(pickLocale(preferred)).toBe(expected);
  });
});
