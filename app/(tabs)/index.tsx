import { APP_NAME } from '@/config';
import { PlaceholderScreen } from '@/ui/PlaceholderScreen';

export default function HomeScreen() {
  return (
    <PlaceholderScreen
      title={APP_NAME}
      links={[
        { href: '/sos', label: 'Craving? Get through it' },
        { href: '/slip', label: 'I smoked' },
        { href: '/checkin', label: 'Daily check-in' },
        { href: '/settings', label: 'Settings' },
        { href: '/language', label: 'Onboarding' },
      ]}
    />
  );
}
