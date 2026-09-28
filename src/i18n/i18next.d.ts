import 'i18next';

import type enIN from '@/content/en-IN/ui.json';

// Typed keys: t('home.sosButton') is checked against the English file.
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ui';
    resources: { ui: typeof enIN };
    returnNull: false;
  }
}
