module.exports = {
    root: true,
    env: { browser: true, node: true },
    extends: [
        'eslint:recommended',
        'prettier',
    ],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
    },
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    overrides: [
        {
            files: ['*.js'],
        },
    ],
}

