import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  // server: { https: true },
  jsxInject: `import React from 'react'`,
  plugins: [ mkcert(), react() ]
})