export const LOCALES = ['en-IN', 'hi-IN'] as const;
export type AppLocale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: AppLocale = 'en-IN';

/**
 * Picks the app locale from the device's preferred languages, in order.
 * Hindi anywhere before English wins; anything else falls back to English (India).
 */
export function pickLocale(preferred: readonly { languageCode: string | null }[]): AppLocale {
  for (const { languageCode } of preferred) {
    if (languageCode === 'hi') return 'hi-IN';
    if (languageCode === 'en') return 'en-IN';
  }
  return DEFAULT_LOCALE;
}
