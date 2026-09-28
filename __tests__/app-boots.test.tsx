import { fireEvent, renderRouter, screen } from 'expo-router/testing-library';

import { APP_NAME } from '@/config';

describe('app', () => {
  it('opens on Home once fonts load, and reaches SOS in one tap', async () => {
    const router = renderRouter('./app');
    // The root layout holds the splash screen (renders nothing) until Mukta has loaded.
    expect(await screen.findByRole('header', { name: APP_NAME })).toBeTruthy();
    expect(router.getPathname()).toBe('/');

    fireEvent.press(screen.getByRole('button', { name: 'Craving? Get through it' }));
    expect(router.getPathname()).toBe('/sos');
  });
});
