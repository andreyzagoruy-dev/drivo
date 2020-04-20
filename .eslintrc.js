module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-angular',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'comma-dangle': ['error', 'never'],
    'no-empty-function': ["error", { "allow": ["constructors"] }],
    'lines-between-class-members': ["error", "always", { exceptAfterSingleLine: true }]
  }
};
