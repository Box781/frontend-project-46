import js from '@eslint/js'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'

export default [
  stylistic.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      js,
      stylistic,
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
]
