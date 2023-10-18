import { defineConfig } from 'vite'

const { MINIFY } = process.env

export default defineConfig({
  build: {
    target: 'es2020',
    lib: {
      entry: 'src/index.js',
      name: 'InPageEditImport',
      fileName: (format, entryName) => {
        console.info('lib build', format, entryName)
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
