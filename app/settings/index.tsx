import { useTranslation } from 'react-i18next';

import { PlaceholderScreen } from '@/ui/PlaceholderScreen';

export default function SettingsScreen() {
  const { t } = useTranslation();
  return (
    <PlaceholderScreen
      title={t('screens.settings')}
      // Dev-only link to the type and colour check screen.
      links={__DEV__ ? [{ href: '/dev/specimen', label: 'Type specimen (dev)' }] : []}
    />
  );
}
