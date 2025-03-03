import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // options to run vite server
  server: {
    port: 5173,
    // any fetch reqs we send to /user url will go to the backend server @3000
    proxy: {
      '/user': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
