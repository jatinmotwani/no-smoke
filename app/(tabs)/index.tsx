import { useTranslation } from 'react-i18next';

import { APP_NAME } from '@/config';
import { formatINR, inrFormatterSource } from '@/i18n/format';
import { PlaceholderScreen } from '@/ui/PlaceholderScreen';

export default function HomeScreen() {
  const { t } = useTranslation();
  const moneySample = t('home.moneySample', {
    lakh: formatINR(100000),
    crore: formatINR(10000000),
  });
  return (
    <PlaceholderScreen
      title={APP_NAME}
      primary={{ href: '/sos', label: t('home.sosButton') }}
      links={[
        { href: '/slip', label: t('home.slip') },
        { href: '/checkin', label: t('home.checkin') },
        { href: '/settings', label: t('home.settings') },
        { href: '/language', label: t('home.onboarding') },
      ]}
      // Dev builds also show which formatter Hermes ended up with (SPEC §4: verify on Hermes).
      note={__DEV__ ? `${moneySample} (${inrFormatterSource})` : moneySample}
    />
  );
}
