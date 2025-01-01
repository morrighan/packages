import {} from 'util'
// Third-party modules.
import merge from 'deepmerge'

// Local helpers.
import { getOptionsOfBaseRule } from './base-rule-options-getter.js'

/**
 * @param {string} ruleName
 * @param {any[]} options
 * @param {(options: any[]) => (any[] | void)} [aftermath]
 * @returns {Record<string, any> | Record<string, any>[]}
 */
export function extendsBaseRule(ruleName, options, aftermath = options => options) {
	const baseRule = getOptionsOfBaseRule(ruleName)
	const mergedRule = merge(structuredClone(baseRule), options)

	return aftermath(mergedRule) ?? mergedRule
}
export default extendsBaseRule
