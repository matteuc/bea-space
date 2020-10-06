module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['prettier', '@typescript-eslint/eslint-plugin', 'react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'global-require': 0,
    'react/style-prop-object': 0,
    'import/extensions': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars-experimental': 'error',
    'no-unused-vars': 'off',
    'react/no-danger': 0,
    'import/prefer-default-export': 0,
  },
}
