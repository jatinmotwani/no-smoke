import { useTranslation } from 'react-i18next';

import { PlaceholderScreen } from '@/ui/PlaceholderScreen';

export default function LanguageStep() {
  const { t } = useTranslation();
  return (
    <PlaceholderScreen
      title={t('screens.language')}
      links={[{ href: '/', label: t('screens.goHome') }]}
    />
  );
}
