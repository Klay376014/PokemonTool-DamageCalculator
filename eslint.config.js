import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'eqeqeq': [2, 'allow-null'],
    'array-bracket-spacing': [2, 'never'],
    'comma-spacing': [2, { before: false, after: true }],
    'vue/multi-word-component-names': 'off',
    'eol-last': 2,
    'comma-dangle': [2, 'never'],
    'func-style': [{ allowArrowFunctions: true }]
  }

})
