/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    '@amnis/eslint-config-react',
  ],
  rules: {
    'no-use-before-define': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'no-return-await': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/extensions': [
      'error',
      'never',
      {
        js: 'ignorePackages',
        jsx: 'ignorePackages',
        ts: 'ignorePackages',
        tsx: 'ignorePackages',
        json: 'always',
      },
    ],
  },
};
