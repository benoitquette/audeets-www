import '@testing-library/jest-dom/vitest';
import { beforeAll } from 'vitest';

beforeAll(() => {
  window.apiProjectsUrl = 'fake';
  //   globalThis.apiProjectsUrl = 'fake';
  //   vi.stubGlobal('apiProjectsUrl', 'fake');
  //   global.apiProjectsUrl = 'fake';
});
