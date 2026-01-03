import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

function prefixPlugin() {
  return {
    name: 'client-prefix-plugin',
    configResolved() {
      console.log('[client] Starting Talent IQ Client...');
      console.log('[client] Vite React + RTK Query + TailwindCSS');
    },
    configureServer(server) {
      const originalPrintUrls = server.printUrls;
      server.printUrls = () => {
        console.log('[client] Local server ready!');
        originalPrintUrls();
      };
    },
  };
}

export default defineConfig({
  plugins: [react(), prefixPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
