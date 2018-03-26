module.exports = {
  extends: [
    'google',
    'plugin:prettier/recommended',
  ],

  parser: 'babel-eslint',

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      modules: true,
      restParams: true,
      spread: true,
    },
  },

  plugins: ['babel'],

  rules: {
    'max-len': 0,
    'new-cap': ['error', {capIsNew: false}],
    'no-invalid-this': ['off'],
    'require-jsdoc': 'off',
    'valid-jsdoc': ['warn', {
      'prefer': {
        'return': 'returns',
      },
    }],
  },
};
