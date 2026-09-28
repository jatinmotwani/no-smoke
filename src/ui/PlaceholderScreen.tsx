import { Link, type Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  title: string;
  links?: { href: Href; label: string }[];
};

/** Temporary screen body used until each screen is built. Removed by the end of P5. */
export function PlaceholderScreen({ title, links = [] }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      <View style={styles.links}>
        {links.map((link) => (
          <Link key={link.label} href={link.href} style={styles.link} accessibilityRole="link">
            {link.label}
          </Link>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 16 },
  title: { fontSize: 28, fontWeight: '600' },
  links: { gap: 8 },
  link: { fontSize: 18, minHeight: 48, paddingVertical: 12, textDecorationLine: 'underline' },
});
