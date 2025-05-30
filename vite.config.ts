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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    allowedHosts: ['rgjyw3-5173.csb.app'],
  },
});
