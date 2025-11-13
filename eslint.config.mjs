import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  pluginJs.configs.recommended,
  {
    files: ['src/**/*.js', 'src/**/*.mjs'],
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      semi: 'error',
      'no-unused-vars': ['error', { args: 'none', varsIgnorePattern: '^_' }],
      'no-undef': 'error',
    },
  },
];
