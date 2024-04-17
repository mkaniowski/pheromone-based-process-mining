module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:github/recommended',
    'plugin:sonarjs/recommended',
    'plugin:css-modules/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'eslint-config-prettier',
    'prettier/prettier',
    'plugin:prettier/recommended',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'github',
    'sonarjs',
    'css-modules',
    'simple-import-sort',
    'prettier',
  ],
  rules: {
    semi: ['warn', 'never'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'eslint-comments/no-use': [1, { allow: ['eslint-disable'] }],
    'simple-import-sort/imports': 1,
    'simple-import-sort/exports': 1,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'prefer-const': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-extra-non-null-assertion': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/ban-types': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react/display-name': 'warn',
    'no-var': 'warn',
    'comma-dangle': 0,
    'max-classes-per-file': 0,
    'space-before-function-paren': 0,
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'func-names': ['error', 'never'],
    'operator-linebreak': 0,
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'react/jsx-one-expression-per-line': 0,
    'import/extensions': 0,
    'prefer-destructuring': [
      'warn',
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'react/destructuring-assignment': [1, 'always'],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/prefer-stateless-function': 0,
    'lines-between-class-members': 0,
    'no-async-promise-executor': 0,
    'import/no-extraneous-dependencies': 0,
    'no-bitwise': 0,
    'object-property-newline': 0,
    'no-continue': 0,
    'no-restricted-syntax': 0,
    camelcase: 2,
    'no-underscore-dangle': 0,
    'no-await-in-loop': 1,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'no-unused-vars': 'off',
    'no-undef': 0,
    'no-plusplus': 0,
    'jsx-a11y/media-has-caption': 0,
    'no-constant-condition': 1,
    'no-dupe-args': 2,
    'no-dupe-else-if': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-extra-boolean-cast': 1,
    'no-sparse-arrays': 2,
    'no-template-curly-in-string': 1,
    'no-unreachable': 1,
    'no-unsafe-finally': 1,
    'no-unsafe-negation': 1,
    'use-isnan': 2,
    'no-func-assign': 2,
    'no-import-assign': 2,
    'no-invalid-regexp': 2,
    'array-callback-return': 1,
    'block-scoped-var': 2,
    'class-methods-use-this': 0,
    complexity: 0,
    'consistent-return': 1,
    'dot-notation': 1,
    'no-case-declarations': 1,
    'no-constructor-return': 2,
    'no-else-return': 1,
    'no-eq-null': 1,
    'no-fallthrough': 1,
    'no-global-assign': 2,
    'no-invalid-this': 2,
    'no-lone-blocks': 1,
    'no-loop-func': 1,
    'no-redeclare': 2,
    'no-return-await': 1,
    'no-return-assign': 2,
    'no-self-assign': [
      'warn',
      {
        props: false,
      },
    ],
    'no-self-compare': 1,
    'no-throw-literal': 1,
    'no-unmodified-loop-condition': 1,
    'no-useless-return': 1,
    'require-await': 1,
    'react/no-string-refs': 0,
    'react/no-find-dom-node': 0,
    'react/jsx-key': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'i18n-text/no-en': 1,
    'filenames/match-regex': [0, '^[a-zA-Z]+$', true],
    'github/no-then': 0,
    'sonarjs/no-small-switch': 1,
    'sonarjs/cognitive-complexity': ['error', 25],
    'eslint-comments/no-unused-disable': 1,
  },
}
