import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use an esXXXX target string instead of Vite's default engine-name list.
  // esbuild 0.28+ mishandles destructuring lowering for engine-name targets
  // ("chrome87","edge88",...) while es2020 is the same browser-support floor.
  build: {
    target: 'es2020',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
})
