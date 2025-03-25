import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  globalIgnores(['**/*.dev.*', '**/dist', '**/ssi_modal', '**/*.config.*']),
  {
    extends: compat.extends('eslint:recommended'),

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        $: 'readonly',
        mw: 'readonly',
        ssi_modal: 'readonly',
        InPageEdit: 'writeable',
      },

      ecmaVersion: 12,
      sourceType: 'module',
    },

    rules: {
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
])
