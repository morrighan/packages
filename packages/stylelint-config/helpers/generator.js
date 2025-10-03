/**
 * @param {(string | (string | (string | null)[] | null)[])[]} fragments
 * @returns {string[]}
 */
export default function _(...fragments) {
	if (fragments.length === 1 && typeof fragments[0] === 'string') return fragments[0]

	/** @type {(string | null)[][]} */
	const initial = [ [] ]

	return fragments
		.map(fragment => (
			Array.isArray(fragment) ? fragment.flat(Number.POSITIVE_INFINITY) : [ fragment ]
		))
		.reduce((current, next) => {
			/** @type {(string | null)[][]} */
			const result = []

			for (const existing of current) {
				for (const item of next) {
					result.push([ ...existing, item ])
				}
			}

			return result
		}, initial)
		.map(combination => (
			combination.filter(part => !!part).join('-')
		))
}
