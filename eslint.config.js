import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import mochaPlugin from 'eslint-plugin-mocha';


export default [
  {
    files: ['src/**/*.ts', 'test/**/*.test.ts'],
    ignores: ['dist/*'],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      quotes: ['error', 'single'],
      indent: ['error', 2]
    }
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  mochaPlugin.configs.flat.recommended
];