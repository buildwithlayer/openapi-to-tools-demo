// @ts-check

import eslint from '@eslint/js';
import pluginJest from 'eslint-plugin-jest';
import reactHooks from 'eslint-plugin-react-hooks';
import sort from 'eslint-plugin-sort';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    sort.configs['flat/recommended'],
    reactHooks.configs['recommended-latest'],
    {
        linterOptions: {
            reportUnusedDisableDirectives: false,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['error',
                {'argsIgnorePattern': '^_'},
            ],
            'comma-dangle': ['error', 'always-multiline'],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'sort/destructuring-properties': ['error'],
            'sort/export-members': ['error'],
            'sort/exports': ['error'],
            'sort/import-members': ['error'],
            'sort/imports': ['error'],
            'sort/object-properties': ['error'],
            'sort/string-enums': ['error'],
            'sort/string-unions': ['error'],
            'sort/type-properties': ['error'],
        },
    },
    {
        files: ['tests/**/*'],
        languageOptions: {
            globals: pluginJest.environments.globals.globals,
        },
        plugins: {jest: pluginJest},
        rules: {
            'jest/no-disabled-tests': 'error',
            'jest/no-focused-tests': 'error',
            'jest/no-identical-title': 'error',
            'jest/prefer-to-have-length': 'error',
            'jest/valid-expect': 'error',
        },
    },
);