module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended'
  ],
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // It will default to "latest" and warn if missing, and to "detect" in the future
      flowVersion: '0.53' // Flow version
    },
    'import/resolver': {
      alias: {
        map: [['~', './src']],
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx', '.scss']
      }
    }
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      impliedStrict: true,
      jsx: true
    },
    ecmaVersion: 12
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/react-in-jsx-scope': 'off',
    'no-undef': 'off',
    'react/display-name': 'off',
    'react/jsx-filename-extension': 2,
    'no-param-reassign': 'off',
    'react/prop-types': 1,
    'react/require-default-props': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/forbid-prop-types': 'off',
    'import/order': 1,
    'import/no-cycle': 'off',
    'no-console': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'prefer-destructuring': 'off',
    'no-shadow': 'off',
    'import/no-named-as-default': 'off',
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*', '!@mui/material/test-utils/*']
      }
    ],
    'no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: false
      }
    ]
  }
};
