/**
 * @param {import('@babel/core').ConfigAPI} API
 * @returns {import('@babel/core').TransformOptions}
 */
export default function configurateBabel(API) {
    API.assertVersion('^7.14.0');
    API.cache.never();

    const corejs = { version: 3, proposals: true };

    return {
        presets: Object.entries({
            '@babel/preset-env': { bugfixes: true, useBuiltIns: 'usage', targets: { node: 'current' }, corejs, modules: false },
            '@babel/preset-typescript': {}
        }),

        plugins: Object.entries({
            '@babel/plugin-transform-runtime': { corejs, regenerator: false }
        })
    };
}
