import * as ESLint from 'eslint'

function defineConfig(...extraConfigs: ESLint.Linter.Config[]): ESLint.Linter.Config[]

export default defineConfig

export { plugin as TSESLintPlugin } from 'typescript-eslint'
export { default as promisePlugin } from 'eslint-plugin-promise'
export { default as nodePlugin } from 'eslint-plugin-n'
export { default as commentsPlugin } from '@eslint-community/eslint-plugin-eslint-comments'
export { default as stylisticPlugin } from '@stylistic/eslint-plugin'
