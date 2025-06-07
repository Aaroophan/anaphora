import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/anaphora/',
  optimizeDeps: {
    include: ['lucide-react'],
  },
  server: {
    allowedHosts: true,
  },
});
