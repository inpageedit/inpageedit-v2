import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
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
