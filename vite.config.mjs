import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  },
  plugins: [react()],
  preview: {
    port: 3000,
    strictPort: true,
    host: true // needed for the Docker Container port mapping to work
  },
  server: {
    // this sets a default port to 3000
    port: 3000
  },
  esbuild: {
    loader: 'jsx'
  },
  test: {
    global: true,
    environment: 'jsdom'
  }
});
