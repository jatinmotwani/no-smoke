import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="sos" options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
        <Stack.Screen name="slip" options={{ presentation: 'modal' }} />
        <Stack.Screen name="checkin" options={{ presentation: 'modal' }} />
        <Stack.Screen name="settings" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
