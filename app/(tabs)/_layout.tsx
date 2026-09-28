import { Tabs } from 'expo-router/js-tabs';
import { useTranslation } from 'react-i18next';

import { Text } from '@/ui/Text';
import { useColors } from '@/ui/theme';
import { fonts, TAB_LABEL_MAX_FONT_SCALE } from '@/ui/tokens';

export default function TabsLayout() {
  const { t } = useTranslation();
  const colors = useColors();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.neel,
        tabBarInactiveTintColor: colors.neelSoft,
        tabBarLabel: ({ children, color, focused }) => (
          <Text
            variant="tab"
            maxFontSizeMultiplier={TAB_LABEL_MAX_FONT_SCALE}
            style={{ color, fontFamily: focused ? fonts.semibold : fonts.regular }}
          >
            {children}
          </Text>
        ),
      }}
    >
      <Tabs.Screen name="index" options={{ title: t('tabs.home') }} />
      <Tabs.Screen name="progress" options={{ title: t('tabs.progress') }} />
      <Tabs.Screen name="learn" options={{ title: t('tabs.learn') }} />
      <Tabs.Screen name="help" options={{ title: t('tabs.help') }} />
    </Tabs>
  );
}
