import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from 'vite-plugin-federation'

export default defineConfig({
  plugins: [
    federation({
      name: 'designSystem',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button.tsx',
      },
      shared: ['react', 'react-dom']
    }),
    react()
  ],
  server: {
    cors: true
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})