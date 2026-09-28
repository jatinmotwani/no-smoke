import { getLocales } from 'expo-localization';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import enIN from '@/content/en-IN/ui.json';
import hiIN from '@/content/hi-IN/ui.json';

import { DEFAULT_LOCALE, pickLocale } from './locale';

export const resources = {
  'en-IN': { ui: enIN },
  'hi-IN': { ui: hiIN },
} as const;

export const i18n = createInstance();

// Device language decides until the user picks one in onboarding (P2).
void i18n.use(initReactI18next).init({
  resources,
  lng: pickLocale(getLocales()),
  fallbackLng: DEFAULT_LOCALE,
  ns: ['ui'],
  defaultNS: 'ui',
  initAsync: false,
  interpolation: { escapeValue: false }, // React already escapes.
  returnNull: false,
});
