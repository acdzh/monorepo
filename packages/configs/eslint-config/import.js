module.exports = {
  extends: ['plugin:import/recommended', 'plugin:import/typescript'],
  rules: {
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true, // use 'import/order' instead
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
    'import/newline-after-import': 'error',
    'import/no-extraneous-dependencies': 'error',
  },
};
