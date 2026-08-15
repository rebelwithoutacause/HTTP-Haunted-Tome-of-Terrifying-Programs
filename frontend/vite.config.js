import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/HTTP-Haunted-Tome-of-Terrifying-Programs/',
  plugins: [react()],
  server: {
    port: 3001
  }
})
