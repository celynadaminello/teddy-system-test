import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({ 
      name: 'designSystem',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button.tsx',
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})