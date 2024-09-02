// Rollup plugins.
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

// Constants.
const formats = [ 'cjs', 'esm' ];
const extensions = [ '.ts', '.mjs', '.js', '.json', '.node' ];

/**
 * @param {([ packageName: string, extraOutputOptions?: import('rollup').OutputOptions ][]} definitions
 * @returns {import('rollup').RollupOptions[]}
 */
const configurateRollup = (...definitions) => definitions.map((
    [ packageName, extraOutputOptions = { exports: 'auto' } ]
) => ({
    input: `./packages/${packageName}/sources/index.ts`,

    output: formats.map(format => ({
        file: `./packages/${packageName}/releases/${format}.js`,
        format,
        sourcemap: 'inline',

        ...extraOutputOptions
    })),

    plugins: [
        resolve({ extensions }),
        babel({ extensions, babelHelpers: 'runtime' })
    ],

    external: source => source.includes('node_modules')
}));

export default configurateRollup(
    [ 'alias-mapper', { exports: 'named' } ],
    [ 'logger' ],
    [ 'sass-bridge' ]
);
