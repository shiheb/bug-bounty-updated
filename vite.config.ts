import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: false,
    }),
  ],
  server: {
    allowedHosts: ['rj3p7h-5173.csb.app'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: [
            '@emotion/react',
            '@emotion/styled',
            'mobx',
            'mobx-react',
            'i18next',
            'react-i18next',
          ],
          material: ['@mui/material'],
        },
      },
    },
  },
});
