module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  plugins: ['jest'],
  rules: {
    'no-restricted-syntax': 0,
    'import/no-unresolved': 0,
    'no-underscore-dangle': 0,
  },
  env: {
    'jest/globals': true,
  },
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
      },
    },
  ],
};
