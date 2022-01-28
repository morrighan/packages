// Node.js built-in APIs.
const path = require('path');

/**
 * @param {Record<string, object>} object
 * @returns {[string, object][]}
 */
function entriesOf(object) {
    const entries = Object.entries(object);

    return entries.filter(([ itemName ]) => itemName.length > 0);
}

/**
 * @param {Record<string, object>} source
 * @param {Record<string, object> | boolean} [overrides]
 * @returns {import('@babel/core').PluginItem[] | typeof source}
 */
function itemsOf(source, overrides) {
    const isOverloading = typeof overrides === 'object';
    const isFilteringOnly = !isOverloading && overrides === false;
    const entries = entriesOf(isOverloading ? overrides : source);

    switch (true) {
    case isOverloading: {
        return entries.map(([ itemName, options ]) => [ itemName, { ...source[itemName], ...options } ]);
    }

    case isFilteringOnly: {
        return Object.fromEntries(entries);
    }

    default: {
        return entries;
    }
    }
}

// Configuration fragments.
const corejs = { version: 3, proposals: true };

/**
 * @param {import('@babel/core').ConfigAPI } API
 * @returns {import('@babel/core').TransformOptions}
 */
function configurateBabel(API) {
    API.assertVersion('^7.14.0');
    API.cache.never();

    const presets = {
        '@babel/preset-env': { bugfixes: true, useBuiltIns: 'usage', targets: { node: 'current' }, corejs, modules: false },
        '@babel/preset-typescript': {}
    };

    const plugins = {
        '@babel/plugin-transform-runtime': { corejs, regenerator: false }
    };

    return {
        presets: itemsOf(presets),
        plugins: itemsOf(plugins),

        overrides: [ {
            test: path.join(path.resolve(__dirname, 'packages'), '*/tests'),

            presets: itemsOf(presets, {
                '@babel/preset-env': { modules: 'auto' }
            })
        } ]
    };
}

// Exporting.
module.exports = configurateBabel;
