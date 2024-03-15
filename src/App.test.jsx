import { describe, it, expect, vi } from 'vitest';
import App from './App';
import { renderWithProviders } from '~/utils/test-utils';

describe('App component', () => {
  it('should scrolls to top', () => {
    window.scrollTo = vi.fn(() => {});
    renderWithProviders(<App />);
    expect(window.scrollTo).toHaveBeenCalled();
    window.scrollTo.mockClear();
  });
});
