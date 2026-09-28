import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useColors } from './theme';
import { space } from './tokens';

type Props = {
  children: ReactNode;
  /** Scrolls when content outgrows the screen, e.g. at 200% font size. Defaults to true. */
  scroll?: boolean;
};

export function Screen({ children, scroll = true }: Props) {
  const colors = useColors();
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.fill, { backgroundColor: colors.chuna }]}
    >
      {scroll ? (
        <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
      ) : (
        <View style={[styles.fill, styles.content]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: { padding: space.gutter, gap: space.lg },
});
