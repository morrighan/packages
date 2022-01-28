// Third-party modules.
const { rules: TSESLintRules } = require('@typescript-eslint/eslint-plugin');

// Local helpers.
const { mapOptionsOfBaseRules } = require('./base-rule-options-getter');

// Configuration fragments.
const rulesForJavaScript = require('../rules/javascript');

// Constants.
const optionsMap = new Map(mapOptionsOfBaseRules(true));

/**
 * @param {[string, import('eslint').Linter.RuleEntry]} param0
 * @returns {[string, import('eslint').Linter.RuleEntry][]}
 */
function mapOverridenRule([ ruleName, ruleEntry ]) {
    return [
        [ `@typescript-eslint/${ruleName}`, ruleEntry ],
        [ ruleName, 'off' ]
    ];
}

/**
 * @returns {Generator<[string, import('eslint').Linter.RuleEntry], void, unknown>}
 */
function* getEntriesOfExtendibleRules() {
    for (const ruleName of optionsMap.keys()) {
        if (ruleName in TSESLintRules) {
            yield* mapOverridenRule([ ruleName, optionsMap.get(ruleName) ]);
        }
    }

    for (const localRule of Object.entries(rulesForJavaScript)) {
        const [ ruleName ] = localRule;

        if (ruleName in TSESLintRules) {
            yield* mapOverridenRule(localRule);
        }
    }
}

/**
 * Create rules within `@typescript-eslint` plugin that has the same functionality in core rules of ESLint, but also supports TypeScript.
 *
 * @param {import('eslint').Linter.RulesRecord} [coreRules]
 * @returns {import('eslint').Linter.RulesRecord}
 */
function mapExtensionRules(coreRules = {}) {
    return Object.assign(
        Object.fromEntries(getEntriesOfExtendibleRules()),
        Object.fromEntries(Object.entries(coreRules).flatMap(mapOverridenRule))
    );
}

// Exporting.
module.exports = mapExtensionRules;
