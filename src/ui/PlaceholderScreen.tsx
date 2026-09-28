import { Link, type Href } from 'expo-router';

import { Button } from './Button';
import { Screen } from './Screen';
import { Text } from './Text';

type Props = {
  title: string;
  /** The first link can be the screen's main action; the rest are quiet links. */
  primary?: { href: Href; label: string };
  links?: { href: Href; label: string }[];
  note?: string;
};

/** Temporary screen body used until each screen is built. Removed by the end of P5. */
export function PlaceholderScreen({ title, primary, links = [], note }: Props) {
  return (
    <Screen>
      <Text variant="title" accessibilityRole="header">
        {title}
      </Text>
      {primary ? (
        <Link href={primary.href} asChild>
          <Button label={primary.label} size="sos" />
        </Link>
      ) : null}
      {links.map((link) => (
        <Link key={link.label} href={link.href} asChild>
          <Button label={link.label} variant="quiet" />
        </Link>
      ))}
      {note ? <Text tone="soft">{note}</Text> : null}
    </Screen>
  );
}
