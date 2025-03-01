import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // tells vite that index.html is still in the client folder bc vite is usually next to it
  root: path.resolve(__dirname, 'client'),
});
