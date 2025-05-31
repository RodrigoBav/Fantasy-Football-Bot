// eslint.config.js
module.exports = [
    {
      files: ["**/*.{js,ts}"],
      ignores: ["node_modules/", "build/", "mock-responses/"],
      languageOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        parser: require('@typescript-eslint/parser'),
        globals: {
          node: true,
          es6: true,
          browser: true,
        },
      },
      plugins: {
        'unused-imports': require('eslint-plugin-unused-imports'),
        '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      },
      rules: {
        'unused-imports/no-unused-imports': 'error',
        'no-unused-vars': 'off', // Disable the base no-unused-vars rule (it can report incorrect errors for TypeScript)
        '@typescript-eslint/no-unused-vars': [
          'off',
          {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: false,
          },
        ],
      },
    },
  ];