import { act, renderRouter, screen } from 'expo-router/testing-library';

import { i18n } from '@/i18n';

describe('i18n', () => {
  afterEach(async () => {
    await act(() => i18n.changeLanguage('en-IN'));
  });

  it('shows ₹ amounts with lakh and crore grouping on Home', async () => {
    renderRouter('./app');
    expect(await screen.findByText(/₹1,00,000 and ₹1,00,00,000/)).toBeTruthy();
  });

  it('switches Home to Hindi', async () => {
    renderRouter('./app');
    await screen.findByRole('button', { name: 'Craving? Get through it' });
    await act(() => i18n.changeLanguage('hi-IN'));
    expect(screen.getByRole('button', { name: 'तलब लगी है? इसे पार करें' })).toBeTruthy();
    expect(screen.getByText('मदद लें')).toBeTruthy();
  });
});
