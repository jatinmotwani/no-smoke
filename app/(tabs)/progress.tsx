import { useTranslation } from 'react-i18next';

import { PlaceholderScreen } from '@/ui/PlaceholderScreen';

export default function ProgressScreen() {
  const { t } = useTranslation();
  return <PlaceholderScreen title={t('screens.progress')} />;
}
