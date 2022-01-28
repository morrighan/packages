/** @type {import('eslint').Linter.Config} */
const baseConfig = require('eslint-config-airbnb-base');

// Constants.
const optionsMap = new Map(mapOptionsOfBaseRules()); // eslint-disable-line no-use-before-define

/**
 * @returns {Generator<[string, import('eslint').Linter.RuleEntry], void, unknown>}
 */
function* getEntriesOfBaseRules() {
    const { extends: rulePaths } = baseConfig;

    for (const rulePath of rulePaths) {
        const partialRules = require(rulePath).rules; // eslint-disable-line global-require

        yield* Object.entries(partialRules);
    }
}

/**
 * @param {boolean} [useFullOptions]
 * @returns {Generator<[string, any], void, unknown>}
 */
function* mapOptionsOfBaseRules(useFullOptions = false) {
    for (const [ ruleName, ruleEntry ] of getEntriesOfBaseRules()) {
        if (!Array.isArray(ruleEntry)) {
            continue;
        }

        const [ , ...baseOptions ] = ruleEntry;

        if (useFullOptions) {
            yield [ ruleName, ruleEntry ];

            continue;
        }

        const ruleOptions = [ ...baseOptions ];

        while (ruleOptions.length > 0 && typeof ruleOptions[0] !== 'object') {
            ruleOptions.shift();
        }

        yield [ ruleName, ruleOptions.length === 1 ? ruleOptions[0] : ruleOptions ];
    }
}

/**
 *
 * @param {string} ruleName
 * @returns {Record<string, any> | Record<string, any>[]}
 */
function getOptionsOfBaseRule(ruleName) {
    return optionsMap.get(ruleName);
}

// Exporting.
module.exports = { mapOptionsOfBaseRules, getOptionsOfBaseRule };
