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
 * @param {import('eslint').Linter.Config} configuration
 * @param {{ originalName: string; aliasedName: string; }} arg1
 * @param {import('eslint').Linter.Plugin} [plugin]
 * @returns {import('eslint').Linter.Config}
 */
function getConfigWithAliasedPluginName(configuration, { originalName, aliasedName }, plugin) {
	const rules = mapKeys(
		configuration.rules ?? {},
		(ruleEntry, ruleName) => (
			ruleName.replace(new RegExp(`^${originalName}/`), `${aliasedName}/`)
		),
	)

	const plugins = { [aliasedName]: configuration.plugins[originalName] ?? plugin }

	return { ...configuration, rules, plugins }
}

export default getConfigWithAliasedPluginName
