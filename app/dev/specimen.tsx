import { Redirect } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { formatINR } from '@/i18n/format';
import { Button } from '@/ui/Button';
import { Screen } from '@/ui/Screen';
import { Text } from '@/ui/Text';
import { useColors, useScheme } from '@/ui/theme';
import { typeScale, type Colors } from '@/ui/tokens';

// Dev-only check screen for fonts, colours and sizes on a real device (design plan §3).
// Not user-facing, so its sample strings are not in the translation files.

const HINDI = 'तलब लगी है? इसे पार करें। साँस, धूम्रपान, स्वास्थ्य, ज़िंदगी, बीड़ी, हृदय';
const CONJUNCTS = 'क्ष त्र ज्ञ श्र द्ध द्य ह्म ह्य क्त स्त्र ट्ट ड्ड ङ्ग प्र र्क';

export default function SpecimenScreen() {
  const colors = useColors();
  const scheme = useScheme();
  if (!__DEV__) return <Redirect href="/" />;

  return (
    <Screen>
      <Text variant="heading">Scheme: {scheme}</Text>
      <View style={styles.swatches}>
        {(Object.keys(colors) as (keyof Colors)[]).map((name) => (
          <View key={name} style={styles.swatchRow}>
            <View
              style={[styles.swatch, { backgroundColor: colors[name], borderColor: colors.line }]}
            />
            <Text variant="small">
              {name} {colors[name]}
            </Text>
          </View>
        ))}
      </View>

      {(Object.keys(typeScale) as (keyof typeof typeScale)[]).map((variant) => (
        <View key={variant}>
          <Text variant="small" tone="soft">
            {variant} · {typeScale[variant].fontSize}/{typeScale[variant].lineHeight}
          </Text>
          <Text variant={variant}>Smoke-free for 12 days</Text>
          <Text variant={variant}>{HINDI}</Text>
        </View>
      ))}

      <Text variant="heading">Conjuncts</Text>
      <Text variant="title">{CONJUNCTS}</Text>

      <Text variant="heading">Numbers</Text>
      <Text variant="display">
        {formatINR(100000)} · {formatINR(1234567)}
      </Text>
      <Text variant="title">Proportional 4:11 1:11</Text>
      <Text variant="title" tabular>
        Tabular 4:11 1:11
      </Text>

      <Text variant="heading">Buttons (each at least 48dp tall)</Text>
      <Button label="Craving? Get through it" size="sos" />
      <Button label="I'm through it" variant="secondary" />
      <Button label="I smoked" variant="quiet" />
      <Button label="Disabled" disabled />
    </Screen>
  );
}

const styles = StyleSheet.create({
  swatches: { gap: 6 },
  swatchRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  swatch: { width: 40, height: 28, borderRadius: 6, borderWidth: 1 },
});
