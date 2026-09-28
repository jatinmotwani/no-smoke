/**
 * Design tokens from docs/design-plan.md. Plain data with no React Native imports, so the
 * contrast test runs in Node. Change a colour here and `npm test` re-checks every WCAG pair.
 */

export type ColorScheme = 'light' | 'dark';

export type Colors = {
  /** App background (lime-wash). */
  chuna: string;
  /** Text and icons (indigo ink). */
  neel: string;
  /** Actions only: SOS, primary buttons, links, focus, selected. */
  neem: string;
  /** Home hero sky only. */
  sky: string;
  /** Home hero haze layer only. */
  haze: string;
  /** Milestones only. */
  marigold: string;
  neelSoft: string;
  onNeem: string;
  neemTint: string;
  onMarigold: string;
  marigoldDeep: string;
  line: string;
  dawn: string;
  tree: string;
};

export const palette: Record<ColorScheme, Colors> = {
  light: {
    chuna: '#F3F6F4',
    neel: '#1D2536',
    neem: '#2F6B45',
    sky: '#CFE5F3',
    haze: '#D9D4DA',
    marigold: '#F0A21A',
    neelSoft: '#4B5569',
    onNeem: '#FFFFFF',
    neemTint: '#DCEADF',
    onMarigold: '#1D2536',
    marigoldDeep: '#A35F00',
    line: '#C9D1CC',
    dawn: '#FFF1CC',
    tree: '#2F6B45',
  },
  dark: {
    chuna: '#111827',
    neel: '#E9EEF0',
    neem: '#8FCB9C',
    sky: '#1C3553',
    haze: '#3A3744',
    marigold: '#F5B53D',
    neelSoft: '#AEB7C6',
    onNeem: '#0E1F14',
    neemTint: '#1E3A2B',
    onMarigold: '#1D2536',
    marigoldDeep: '#F5B53D',
    line: '#344054',
    dawn: '#E9EEF0',
    tree: '#0B1320',
  },
};

/** Registered font family names (see the root layout). Weight comes from the family, never fontWeight. */
export const fonts = {
  regular: 'Mukta-Regular',
  semibold: 'Mukta-SemiBold',
} as const;

export const typeScale = {
  display: { fontSize: 56, lineHeight: 60, family: fonts.semibold },
  title: { fontSize: 28, lineHeight: 36, family: fonts.semibold },
  heading: { fontSize: 22, lineHeight: 32, family: fonts.semibold },
  body: { fontSize: 17, lineHeight: 27, family: fonts.regular },
  label: { fontSize: 18, lineHeight: 26, family: fonts.semibold },
  small: { fontSize: 16, lineHeight: 24, family: fonts.regular },
  /** Tab bar labels only; the one style under 16sp (design plan §7, item 9). */
  tab: { fontSize: 14, lineHeight: 18, family: fonts.regular },
} as const;

export type TextVariant = keyof typeof typeScale;

/** Tab labels stop growing at this font scale so the bar stays one line at 200%. */
export const TAB_LABEL_MAX_FONT_SCALE = 1.6;

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  gutter: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

/** Radius is chosen per job (design plan §4), not one value for everything. */
export const radius = {
  tile: 8,
  answer: 12,
  sheet: 20,
  pill: 999,
} as const;

export const touch = {
  /** SPEC §9 accessibility floor. */
  min: 48,
  /** The SOS button. */
  sos: 64,
} as const;
