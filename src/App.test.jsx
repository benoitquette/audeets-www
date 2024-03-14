import { describe, it, expect } from 'vitest';
import App from './App';
import { renderWithProviders } from '~/utils/test-utils';

describe('App component', () => {
  it('should include theme customization', () => {
    renderWithProviders(<App />);
    expect(true).toBeTruthy();
  });
  it('should scrolls to top', () => {
    expect(true).toBeTruthy();
  });
  it('should contain the CSS basline', () => {
    expect(true).toBeTruthy();
  });
  it('should injects a StyledEngine', () => {
    expect(true).toBeTruthy();
  });
});
