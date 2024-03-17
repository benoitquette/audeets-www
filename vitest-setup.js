import '@testing-library/jest-dom/vitest';
import { beforeAll, vi } from 'vitest';

beforeAll(() => {
  window.apiProjectsUrl = '';
  window.apiUsersUrl = '';
  window.apiReportsUrl = '';

  globalThis.apiProjectsUrl = '';
  vi.stubGlobal('apiProjectsUrl', 100);
});
