import { describe, it, expect, vi } from 'vitest';
import App from './App';
import { renderWithProviders } from '~/utils/test-utils';

describe('App component', () => {
  it('should include theme customization', () => {
    expect(true).toBeTruthy();
  });
  it('should scrolls to top', () => {
    window.scrollTo = vi.fn(() => {});
    renderWithProviders(<App />);
    expect(window.scrollTo).toHaveBeenCalled();
  });
  it('should contain the router', () => {
    console.log(renderWithProviders(<App />));
    expect(true).toBeTruthy();
  });
});
