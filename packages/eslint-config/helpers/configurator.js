// ESLint-relevant modules.
import TSESLint from 'typescript-eslint'

// Local helpers.
import { mapStylisticRules } from './stylistic-rules-mapper.js'

// Type definitions.
/** @typedef {import('eslint').Linter.Config} ESLintConfig */
/** @typedef {import('eslint').Linter.Plugin} ESLintPlugin */

/**
 * @template T
 * @param {T} object
 * @param {(value: T[keyof T], key: string, object: T) => string} [iteratee]
 * @returns {Record<string, T[keyof T]>}
 */
function mapKeys(object, iteratee) {
	return Object.entries(object)
		.reduce((mapped, [ key, value ]) => (
			Object.assign(mapped, iteratee ? { [iteratee(value, key, object)]: value } : {})
		), {})
}

/**
 * @param {ESLintConfig[]} configurations
 * @returns {ESLintConfig[]}
 */
export function configurate(...configurations) {
	return TSESLint.config(...configurations).map(mapStylisticRules)
}

/**
 * @param {ESLintConfig} configuration
 * @param {{ originalName: string; aliasedName: string; }} arg1
 * @param {ESLintPlugin} [plugin]
 * @returns {ESLintConfig}
 */
export function getConfigWithAliasedPluginName(configuration, { originalName, aliasedName }, plugin) {
	const rules = mapKeys(
		configuration.rules ?? {},
		(ruleEntry, ruleName) => (
			ruleName.replace(new RegExp(`^${originalName}/`), `${aliasedName}/`)
		),
	)

	const plugins = { [aliasedName]: configuration.plugins[originalName] ?? plugin }

	return { ...configuration, rules, plugins }
}

export default configurate
