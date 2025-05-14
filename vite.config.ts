import { defineConfig } from 'vite'
import { version } from './package.json'
import { resolve } from 'node:path'

const { MINIFY } = process.env
const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  build: {
    target: 'es2020',
    lib: {
      entry: 'src/index.ts',
      name: 'InPageEditPkg',
      fileName() {
        return `InPageEdit${MINIFY ? '.min' : ''}.js`
      },
      formats: ['umd'],
    },
    minify: !!MINIFY,
    emptyOutDir: isDev ? true : false,
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
  define: {
    'import.meta.env.__VERSION__': JSON.stringify(
      isDev
        ? version
        : `${version}-dev.${new Date().toISOString().split('T')[0].replaceAll('-', '')}`
    ),
  },
  optimizeDeps: {
    include: ['cordis'],
  },
  mode: process.env.NODE_ENV,
  server: {
    host: true,
    port: 1005,
  },
  preview: {
    host: true,
    port: 1225,
    cors: true,
  },
})
