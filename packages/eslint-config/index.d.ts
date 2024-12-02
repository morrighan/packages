import * as ESLint from 'eslint';

function defineConfig(...extraConfigs: ESLint.Linter.Config[]): ESLint.Linter.Config[];

export default defineConfig;
