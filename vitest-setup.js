import '@testing-library/jest-dom/vitest';
import { beforeAll } from 'vitest';

beforeAll(() => {
  globalThis.apiProjectsUrl = '';
  globalThis.apiUsersUrl = '';
  globalThis.apiReportsUrl = '';
});
