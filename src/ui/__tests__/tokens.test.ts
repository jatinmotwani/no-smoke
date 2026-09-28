import config from '../../../app.config';
import { contrastRatio } from '../contrast';
import { palette, typeScale, type Colors, type ColorScheme } from '../tokens';

// Every text/background pairing the design plan allows, with the WCAG AA minimum it needs.
const pairs: [fg: keyof Colors, bg: keyof Colors, min: number][] = [
  ['neel', 'chuna', 4.5],
  ['neelSoft', 'chuna', 4.5],
  ['neel', 'sky', 4.5],
  ['neel', 'haze', 4.5],
  ['neelSoft', 'sky', 4.5],
  ['neelSoft', 'haze', 4.5],
  ['onNeem', 'neem', 4.5],
  ['neem', 'chuna', 4.5],
  ['neel', 'neemTint', 4.5],
  ['onMarigold', 'marigold', 4.5],
  ['marigoldDeep', 'chuna', 3],
  ['neem', 'sky', 3],
];

describe.each(['light', 'dark'] as ColorScheme[])('%s palette', (scheme) => {
  it.each(pairs)('%s on %s meets %d:1', (fg, bg, min) => {
    expect(contrastRatio(palette[scheme][fg], palette[scheme][bg])).toBeGreaterThanOrEqual(min);
  });
});

describe('contrastRatio', () => {
  it('matches known values', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
    expect(contrastRatio('#FFFFFF', '#FFFFFF')).toBeCloseTo(1, 5);
  });

  it('rejects malformed colours', () => {
    expect(() => contrastRatio('#FFF', '#000000')).toThrow('Not a #RRGGBB colour');
  });
});

describe('type scale', () => {
  it('keeps everything except tab labels at 16sp or more (SPEC §9)', () => {
    for (const [name, style] of Object.entries(typeScale)) {
      if (name === 'tab') continue;
      expect(style.fontSize).toBeGreaterThanOrEqual(16);
    }
  });

  it('gives Devanagari matras room: body and small text use 1.5× line height or more', () => {
    expect(typeScale.body.lineHeight / typeScale.body.fontSize).toBeGreaterThanOrEqual(1.5);
    expect(typeScale.small.lineHeight / typeScale.small.fontSize).toBeGreaterThanOrEqual(1.5);
  });
});

describe('splash screen', () => {
  it('uses the chuna background in both schemes', () => {
    const splash = config.plugins?.find(
      (
        plugin,
      ): plugin is [string, { backgroundColor: string; dark: { backgroundColor: string } }] =>
        Array.isArray(plugin) && plugin[0] === 'expo-splash-screen',
    );
    expect(splash?.[1].backgroundColor).toBe(palette.light.chuna);
    expect(splash?.[1].dark.backgroundColor).toBe(palette.dark.chuna);
  });
});
