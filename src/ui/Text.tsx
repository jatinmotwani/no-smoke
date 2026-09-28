import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { useColors } from './theme';
import { typeScale, type Colors, type TextVariant } from './tokens';

type Tone = 'default' | 'soft' | 'action' | 'onNeem';

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  tone?: Tone;
  /** Equal-width digits. Only for running timers; they add gaps around ₹ and "1" elsewhere. */
  tabular?: boolean;
};

const toneColor: Record<Tone, keyof Colors> = {
  default: 'neel',
  soft: 'neelSoft',
  action: 'neem',
  onNeem: 'onNeem',
};

export function Text({
  variant = 'body',
  tone = 'default',
  tabular = false,
  style,
  ...rest
}: TextProps) {
  const colors = useColors();
  const { family, fontSize, lineHeight } = typeScale[variant];
  return (
    <RNText
      style={[
        { fontFamily: family, fontSize, lineHeight, color: colors[toneColor[tone]] },
        tabular && { fontVariant: ['tabular-nums'] },
        style,
      ]}
      {...rest}
    />
  );
}
