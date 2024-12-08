// Rollup plugins.
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

// Constants.
const formats = Object.freeze({ cjs: 'cjs', esm: 'js' });
const extensions = [ '.ts', '.mjs', '.js', '.json', '.node' ];

/**
 * @param {([ packageName: string, extraOutputOptions?: import('rollup').OutputOptions ][]} definitions
 * @returns {import('rollup').RollupOptions[]}
 */
const configurateRollup = (...definitions) => definitions.map((
    [ packageName, extraOutputOptions = { exports: 'auto' } ]
) => ({
    input: `./packages/${packageName}/sources/index.ts`,

    output: Object.entries(formats).map(([ format, extension ]) => ({
        file: `./packages/${packageName}/dists/index.${extension}`,
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
