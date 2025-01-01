// ESLint-relevant modules.
import stylisticPlugin from '@stylistic/eslint-plugin'

/**
 * @param {import('eslint').Linter.Config} config
 * @returns {import('eslint').Linter.Config}
 */
export function mapStylisticRules(config) {
	if (!config.rules) return config

	for (const [ originalRuleName, ruleEntry ] of Object.entries(config.rules)) {
		const normalizedRuleName = originalRuleName.replace(/^@?.+?\//, '')

		if (!(normalizedRuleName in stylisticPlugin.rules)) continue

		Object.assign(config.rules, {
			[`@stylistic/${normalizedRuleName}`]: ruleEntry,
			[originalRuleName]: 'off',
		})
	}

	return config
}

export default mapStylisticRules
