// ESLint-relevant modules.
import TSESLint from 'typescript-eslint';

// Third-party modules.
import lodash from 'lodash';

// Local helpers.
import { mapStylisticRules } from './stylistic-rules-mapper.js';

/**
 * @param {import('eslint').Linter.Config[]} configurations
 * @returns {import('eslint').Linter.Config[]}
 */
export function configurate(...configurations) {
    return TSESLint.config(...configurations).map(mapStylisticRules);
}

/**
 * @param {import('eslint').Linter.Config} configuration
 * @param {{ originalName: string; aliasedName: string; }} arg1
 * @param {import('eslint').ESLint.Plugin} [plugin]
 * @returns {import('eslint').Linter.Config}
 */
export function getConfigWithAliasedPluginName(configuration, { originalName, aliasedName }, plugin) {
    const rules = lodash.mapKeys(
        configuration.rules,
        (ruleEntry, ruleName) => (
            ruleName.replace(new RegExp(`^${originalName}/`), `${aliasedName}/`)
        )
    );

    const plugins = { [aliasedName]: configuration.plugins[originalName] ?? plugin };

    return { ...configuration, rules, plugins };
}

export default configurate;
