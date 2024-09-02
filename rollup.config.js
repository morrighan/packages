// Rollup plugins.
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

/**
 *
 * @param {string} packageName
 * @param {import('rollup').OutputOptions} [extraOutputOptions]
 * @returns {import('rollup').RollupOptions}
 */
function configurateRollup(packageName, extraOutputOptions = {}) {
    const inputPath = `./packages/${packageName}/sources/index.ts`;
    const extensions = [ '.ts', '.mjs', '.js', '.json', '.node' ];

    return {
        input: inputPath,

        output: [
            { file: `./packages/${packageName}/releases/cjs.js`, format: 'cjs', ...extraOutputOptions },
            { file: `./packages/${packageName}/releases/esm.js`, format: 'esm', ...extraOutputOptions }
        ],

        plugins: [
            resolve({ extensions }),

            babel({
                exclude: 'node_modules/**',
                extensions,
                babelHelpers: 'runtime'
            })
        ],

        external: source => source.includes('node_modules')
    };
}

export default [
    configurateRollup('alias-mapper', { exports: 'named' }),
    configurateRollup('logger', { exports: 'auto' }),
    configurateRollup('sass-bridge', { exports: 'auto' })
];
