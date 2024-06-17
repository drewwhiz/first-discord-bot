import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import mochaPlugin from 'eslint-plugin-mocha';


export default [
  {
    files: ['src/**/*.ts', 'test/**/*.test.ts'],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      quotes: ['error', 'single'],
      indent: ['error', 2],
      semi: ['error', 'always'],
      "no-console": ['error'],
      "@typescript-eslint/explicit-member-accessibility": ['error']
    }
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  mochaPlugin.configs.flat.recommended
];