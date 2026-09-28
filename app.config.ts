import type { ExpoConfig } from 'expo/config';

// JSON, not TS: Expo's config loader can't follow relative .ts imports.
import identity from './src/app-identity.json';

const config: ExpoConfig = {
  name: identity.name,
  slug: identity.slug,
  // Changing slug, scheme or package after a store release breaks updates and deep links.
  scheme: identity.scheme,
  version: '0.1.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  platforms: ['android', 'ios'],
  android: {
    // Placeholder until the first Play upload, after which it can never change.
    package: identity.androidPackage,
    // Health data must stay on the phone; Android auto-backup would copy it to Google Drive.
    allowBackup: false,
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  ios: {
    bundleIdentifier: identity.androidPackage,
    supportsTablet: false,
  },
  plugins: [
    'expo-router',
    'expo-status-bar',
    [
      'expo-splash-screen',
      {
        // chuna (light) and night (dark) from src/ui/tokens.ts; a test keeps them in sync.
        backgroundColor: '#F3F6F4',
        dark: { backgroundColor: '#111827' },
        image: './assets/splash-icon.png',
        imageWidth: 120,
      },
    ],
    // Lets Android 13+ offer the app's languages in system settings (per-app language).
    [
      'expo-localization',
      { supportedLocales: { android: ['en-IN', 'hi-IN'], ios: ['en-IN', 'hi-IN'] } },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
