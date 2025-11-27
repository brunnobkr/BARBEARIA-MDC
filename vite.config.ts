import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/BARBEARIA-MDC/',
  server: {
    port: 3000,
    strictPort: false, // Se a porta 3000 estiver ocupada, tenta a próxima disponível
  },
  assetsInclude: ['**/*.svg'],
})

