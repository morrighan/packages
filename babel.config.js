// Node.js built-in APIs.
import { createRequire } from 'module';

/**
 * @param {import('@babel/core').ConfigAPI} API
 * @returns {import('@babel/core').TransformOptions}
 */
export default function configurateBabel(API) {
    API.assertVersion('^7.14.0');
    API.cache.never();

    const coreJsVersion = createRequire(import.meta.url)('core-js-pure/package.json').version;

    return {
        presets: Object.entries({
            '@babel/preset-env': { bugfixes: true, targets: { node: 'current' }, modules: false },
            '@babel/preset-typescript': {}
        }),

        plugins: Object.entries({
            'babel-plugin-polyfill-corejs3': { method: 'usage-pure', version: coreJsVersion },
            '@babel/plugin-transform-runtime': { regenerator: false }
        })
    };
}
