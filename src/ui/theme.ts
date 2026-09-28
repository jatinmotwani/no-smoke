import { DarkTheme, DefaultTheme, type Theme } from 'expo-router';
import { useColorScheme } from 'react-native';

import { fonts, palette, type Colors, type ColorScheme } from './tokens';

export function useScheme(): ColorScheme {
  return useColorScheme() === 'dark' ? 'dark' : 'light';
}

export function useColors(): Colors {
  return palette[useScheme()];
}

/** Navigation chrome (stack background, tab bar, headers) in our colours and font. */
export function navigationTheme(scheme: ColorScheme): Theme {
  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const c = palette[scheme];
  const regular = { fontFamily: fonts.regular, fontWeight: 'normal' } as const;
  const semibold = { fontFamily: fonts.semibold, fontWeight: 'normal' } as const;
  return {
    ...base,
    colors: {
      primary: c.neem,
      background: c.chuna,
      card: c.chuna,
      text: c.neel,
      border: c.line,
      notification: c.marigold,
    },
    fonts: { regular, medium: semibold, bold: semibold, heavy: semibold },
  };
}
