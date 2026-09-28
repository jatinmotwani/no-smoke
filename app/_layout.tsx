import '@/i18n';

import { useFonts } from 'expo-font';
import { Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { navigationTheme, useScheme } from '@/ui/theme';
import { fonts } from '@/ui/tokens';

// Keep the splash up until Mukta is loaded, so text never flashes in the system font.
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const scheme = useScheme();
  const [fontsLoaded, fontError] = useFonts({
    [fonts.regular]: require('../assets/fonts/Mukta-Regular.ttf'),
    [fonts.semibold]: require('../assets/fonts/Mukta-SemiBold.ttf'),
  });
  // A font that fails to load falls back to the system font rather than blocking the app.
  const ready = fontsLoaded || fontError !== null;

  useEffect(() => {
    if (ready) SplashScreen.hide();
  }, [ready]);

  if (!ready) return null;

  return (
    <ThemeProvider value={navigationTheme(scheme)}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="sos" options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
        <Stack.Screen name="slip" options={{ presentation: 'modal' }} />
        <Stack.Screen name="checkin" options={{ presentation: 'modal' }} />
        <Stack.Screen name="settings" />
        <Stack.Screen name="dev/specimen" options={{ headerShown: true, title: 'Type specimen' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
