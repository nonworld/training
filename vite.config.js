import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// NON Academy — Vite + React, output to dist/ for Cloudflare Pages.
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5180 },
  build: { outDir: 'dist', sourcemap: true },
})
