import { fireEvent, renderRouter, screen } from 'expo-router/testing-library';

import { APP_NAME } from '@/config';

describe('app', () => {
  it('opens on Home and reaches SOS in one tap', () => {
    const router = renderRouter('./app');
    expect(router.getPathname()).toBe('/');
    expect(screen.getByRole('header', { name: APP_NAME })).toBeTruthy();

    fireEvent.press(screen.getByText('Craving? Get through it'));
    expect(router.getPathname()).toBe('/sos');
  });
});
