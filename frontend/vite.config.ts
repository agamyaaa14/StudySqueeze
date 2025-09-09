import { defineConfig } from 'vite';
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/upload': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        timeout: 600000, // 10 minutes
        proxyTimeout: 600000
      }
    }
  }
});
