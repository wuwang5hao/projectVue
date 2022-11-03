// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: ['vue'],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
        '': 'never'
      }
    ],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for vuex state
          'acc', // for reduce accumulators
          'e' // for e.returnvalue
        ]
      }
    ],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js']
      }
    ],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': [0, 'error', 'windows'],
    semi: 0,
    'comma-dangle': 0,
    quotes: 0,
    'vue/no-parsing-error': [
      2,
      {
        'x-invalid-end-tag': false
      }
    ],
    'handle-callback-err': 0,
    'space-before-function-paren': 0,
    'space-infix-ops': 0,
    camelcase: 0,
    'no-multi-spaces': 0,
    'standard/array-bracket-even-spacing': 0,
    'block-spacing': 0,
    'keyword-spacing': 0,
    'one-var': 0,
    'brace-style': 0,
    'no-mixed-operators': 0,
    'no-unused-vars': 0,
    'no-multiple-empty-lines ': 0,
    'spaced-comment': 0,
    'vue/valid-v-model': 0,
    'vue/valid-v-for': 0,
    'object-property-newline': 0,
    'no-console': 0,
    'import/prefer-default-export': 0,
    'no-restricted-syntax': 0,
    'object-curly-spacing': 0,
    'object-shorthand': 0,
    'prefer-const': 0,
    'no-param-reassign': 0,
    'no-else-return': 0,
    'arrow-body-style': 0,
    'object-curly-newline': 0,
    // 'max-len': ["warn", { "code": 120 }],
    'max-len': 0,
    'quote-props': 0,
    'vue/no-unused-components': 0,
    'no-underscore-dangle': 0,
    'prefer-destructuring': 0,
    'class-methods-use-this': 0,
    'max-classes-per-file': 0,
    'lines-between-class-members': 0,
    'no-continue': 0,
    'dot-notation': 0,
    'operator-linebreak': 0,
    'no-multi-assign': 0,
    'no-plusplus': 0,
    'no-unused-expressions': 0,
    'no-lonely-if': 0,
    'arrow-parens': 0
  }
};
