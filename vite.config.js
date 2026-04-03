import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/AgCortinas2',
        changeOrigin: true,
        rewrite: (path) => path, // mantém /api/contato.php como está
      }
    }
  }
})
 