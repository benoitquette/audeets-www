import '@testing-library/jest-dom/vitest';
import { beforeAll } from 'vitest';

beforeAll(() => {
  window.apiProjectsUrl = '';
  window.apiUsersUrl = '';
  window.apiReportsUrl = '';
});
