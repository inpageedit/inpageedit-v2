import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'es2020',
    lib: {
      entry: 'src/index.js',
      name: 'InPageEditImport',
      fileName: (format, entryName) => {
        console.info('lib build', format, entryName)
        return `InPageEdit.js`
      },
      formats: ['umd'],
    },
  },
  server: {
    host: true,
    port: 1005,
  },
  preview: {
    host: true,
    port: 1225,
  },
})
