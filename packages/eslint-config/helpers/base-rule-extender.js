// Third-party modules.
import merge from 'deepmerge'

// Local helpers.
import { getOptionsOfBaseRule } from './base-rule-options-getter.js'

/**
 * @template T
 * @param {T[]} options
 * @returns {T[] | void}
 */
function defaultAftermath(options) {
	return options
}
/**
 * @template T
 * @param {string} ruleName
 * @param {T[]} options
 * @param {(options: T[]) => (T[] | void)} [aftermath]
 * @returns {Record<string, any> | Record<string, any>[]}
 */
export function extendsBaseRule(ruleName, options, aftermath = defaultAftermath) {
	const baseRule = getOptionsOfBaseRule(ruleName)
	const mergedRule = merge(structuredClone(baseRule), options)

	return aftermath(mergedRule) ?? mergedRule
}
export default extendsBaseRule
