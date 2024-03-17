import '@testing-library/jest-dom/vitest';
import { beforeAll, vi } from 'vitest';
import config from '~/config';

beforeAll(() => {
  window.apiProjectsUrl = 'fake';
  globalThis.apiProjectsUrl = 'fake';
  vi.stubGlobal('apiProjectsUrl', 'fake');
  global.apiProjectsUrl = 'fake';
  console.log('apiProjectsUrl: ' + apiProjectsUrl);
  console.log('urlApiProjects: ' + config.urlApiProjects);
});
