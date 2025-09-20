// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // This will force the dev server to run on http://
    // instead of https://, solving the mixed content issue.
    https: false,
  }
})