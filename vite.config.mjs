import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const { MINIFY } = process.env

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'jsx-dom',
    }),
  ],
  build: {
    target: 'es2020',
    lib: {
      entry: 'src/index.jsx',
      name: 'InPageEditPkg',
      fileName() {
        return `InPageEdit${MINIFY ? '.min' : ''}.js`
      },
      formats: ['umd'],
    },
    minify: !!MINIFY,
    emptyOutDir: false,
    sourcemap: true,
  },
  mode: process.env.NODE_ENV,
  server: {
    host: true,
    port: 1005,
  },
  preview: {
    host: true,
    port: 1225,
  },
})
