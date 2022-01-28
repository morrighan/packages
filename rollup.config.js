// Rollup plugins.
const { default: resolve } = require('@rollup/plugin-node-resolve');
const { default: babel } = require('@rollup/plugin-babel');

// Shared constants.
const extensions = [ '.ts', '.mjs', '.js', '.json', '.node' ];

/**
 *
 * @param {string} packageName
 * @param {import('rollup').OutputOptions} [extraOutputOptions]
 * @returns {import('rollup').RollupOptions[]}
 */
function configurateRollup(packageName, extraOutputOptions = {}) {
    /**
     * @param {import('rollup').ModuleFormat} format
     * @returns {import('rollup').RollupOptions}
     */
    function configurateRollupByFormat(format) {
        const inputPath = `./packages/${packageName}/sources/index.ts`;
        const outputPath = `./packages/${packageName}/releases/${format}.js`;

        return {
            input: inputPath,
            output: { file: outputPath, format, ...extraOutputOptions },

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

    return [ configurateRollupByFormat('cjs'), configurateRollupByFormat('esm') ];
}

/** @type {import('rollup').RollupOptions[]} */
module.exports = [
    ...configurateRollup('alias-mapper', { exports: 'named' }),
    ...configurateRollup('logger', { exports: 'auto' })
];
