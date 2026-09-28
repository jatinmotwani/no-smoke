import { useTranslation } from 'react-i18next';

import { PlaceholderScreen } from '@/ui/PlaceholderScreen';

export default function SosScreen() {
  const { t } = useTranslation();
  return (
    <PlaceholderScreen
      title={t('screens.sos')}
      links={[{ href: '/help', label: t('screens.help') }]}
    />
  );
}
