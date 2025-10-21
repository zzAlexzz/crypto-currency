// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'react-hooks/exhaustive-deps': 'warn', // show warning if hooks dependencies are missing
    },
  },
  {
    ignores: ['dist/*'],
  },
]);
