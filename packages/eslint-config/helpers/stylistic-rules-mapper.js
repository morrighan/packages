// ESLint-relevant modules.
import stylisticPlugin from '@stylistic/eslint-plugin'

// Constants.
const preservingRuleNames = [
	'react/jsx-indent',
	'react/jsx-props-no-multi-spaces',
]

/**
 * @param {import('eslint').Linter.Config} config
 * @returns {import('eslint').Linter.Config}
 */
export default function mapStylisticRules(config) {
	if (!config.rules) return config

	for (const [ originalRuleName, ruleEntry ] of Object.entries(config.rules)) {
		const normalizedRuleName = originalRuleName.replace(/^@?.+?\//, '')

		if (!(normalizedRuleName in stylisticPlugin.rules)) continue
		if (preservingRuleNames.includes(originalRuleName)) continue

		Object.assign(config.rules, {
			[`@stylistic/${normalizedRuleName}`]: ruleEntry,
			[originalRuleName]: 'off',
		})
	}

	return config
}
