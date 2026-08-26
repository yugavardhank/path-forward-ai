import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@google/generative-ai')) return 'gemini';
            if (id.includes('react-router')) return 'router';
            return 'vendor';
          }
        },
      },
    },
  },
})
