import '@testing-library/jest-dom/vitest';
import { beforeAll, vi } from 'vitest';

beforeAll(() => {
  window.apiProjectsUrl = 'fake';
  //   globalThis.apiProjectsUrl = 'fake';
  //   vi.stubGlobal('apiProjectsUrl', 'fake');
  //   global.apiProjectsUrl = 'fake';
});
