import { fireEvent, render, screen } from '@testing-library/react-native';
import * as ReactNative from 'react-native';
import { StyleSheet } from 'react-native';

import { Button } from '../Button';
import { Text } from '../Text';
import { palette, touch, typeScale } from '../tokens';

function styleOf(element: { props: { style?: unknown } }) {
  return StyleSheet.flatten(element.props.style as ReactNative.StyleProp<ReactNative.TextStyle>);
}

describe('Button', () => {
  it('is an accessible button named by its label, at least 48dp tall', () => {
    const onPress = jest.fn();
    render(<Button label="I smoked" variant="quiet" onPress={onPress} />);
    const button = screen.getByRole('button', { name: 'I smoked' });
    expect(styleOf(button).minHeight).toBeGreaterThanOrEqual(touch.min);
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('makes the SOS size 64dp tall with a neem fill', () => {
    render(<Button label="Craving? Get through it" size="sos" />);
    const button = screen.getByRole('button');
    expect(styleOf(button)).toMatchObject({
      minHeight: touch.sos,
      backgroundColor: palette.light.neem,
    });
  });

  it('reports and honours the disabled state', () => {
    const onPress = jest.fn();
    render(<Button label="Save" disabled onPress={onPress} />);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toBeDisabled();
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });
});

describe('Text', () => {
  afterEach(() => jest.restoreAllMocks());

  it('uses the Mukta family and size for its variant', () => {
    render(<Text variant="title">Progress</Text>);
    expect(styleOf(screen.getByText('Progress'))).toMatchObject({
      fontFamily: typeScale.title.family,
      fontSize: 28,
      color: palette.light.neel,
    });
  });

  it('switches to the dark palette when the phone is in dark mode', () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark');
    render(<Text tone="soft">Saved</Text>);
    expect(styleOf(screen.getByText('Saved')).color).toBe(palette.dark.neelSoft);
  });

  it('only uses tabular digits when asked', () => {
    render(
      <>
        <Text>4:11</Text>
        <Text tabular>1:11</Text>
      </>,
    );
    expect(styleOf(screen.getByText('4:11')).fontVariant).toBeUndefined();
    expect(styleOf(screen.getByText('1:11')).fontVariant).toEqual(['tabular-nums']);
  });
});
