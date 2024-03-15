import '@testing-library/jest-dom/vitest';
import { beforeAll } from 'vitest';

beforeAll(() => {
  global.apiProjectsUrl = null;
  global.apiUserssUrl = null;
});
