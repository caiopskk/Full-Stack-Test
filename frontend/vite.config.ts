import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      port: 4000
    },
    define: {
      'process.env': {
        ...process.env,
        VITE_API_URL: env.VITE_API_URL ?? 'http://localhost:3000'
      }
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/App.test.tsx'
    }
  };
});
