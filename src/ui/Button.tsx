import { Pressable, StyleSheet, type PressableProps } from 'react-native';

import { Text } from './Text';
import { useColors } from './theme';
import { radius, space, touch } from './tokens';

type Variant = 'primary' | 'secondary' | 'quiet';

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  variant?: Variant;
  /** `sos` is the tall Home "Craving?" button. */
  size?: 'regular' | 'sos';
};

/**
 * One button for the whole app. Works as a `<Link asChild>` child: extra props (onPress, href
 * handling, role) are passed through to the Pressable.
 */
export function Button({
  label,
  variant = 'primary',
  size = 'regular',
  disabled,
  ...rest
}: ButtonProps) {
  const colors = useColors();
  const frame = {
    primary: { backgroundColor: colors.neem },
    secondary: { borderWidth: 2, borderColor: colors.neem },
    quiet: {},
  }[variant];
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        size === 'sos' && styles.sos,
        variant !== 'quiet' && styles.pill,
        frame,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      {...rest}
      // Always announced as a button, even inside <Link asChild>, which would pass role="link".
      role="button"
    >
      <Text
        variant="label"
        tone={variant === 'primary' ? 'onNeem' : variant === 'secondary' ? 'action' : 'soft'}
        style={[styles.label, variant === 'quiet' && styles.underline]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: touch.min,
    paddingHorizontal: space.gutter,
    paddingVertical: space.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sos: { minHeight: touch.sos },
  pill: { borderRadius: radius.pill },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.5 },
  label: { textAlign: 'center' },
  underline: { textDecorationLine: 'underline' },
});
