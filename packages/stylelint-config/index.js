// Pre-sorted CSS properties list.
const PROPERTIES_LIST = await Promise.all([
	'composes',
	'all',
	import('#properties/01-interaction'),
	import('#properties/02-positioning'),
	import('#properties/03-layout'),
	import('#properties/04-box-model'),
	import('#properties/05-typography'),
	import('#properties/06-appearance'),
	import('#properties/07-svg-relevant'),
	import('#properties/08-transition'),
].map(fragments => (
	typeof fragments === 'string'
		? Promise.resolve(fragments)
		: fragments.then(({ default: properties }) => properties)
))).then(properties => (
	properties.flat()
))

/** @type {import('stylelint').Config} */
export default {
	extends: 'stylelint-config-sass-guidelines',
	plugins: [ 'stylelint-order', 'stylelint-scss' ],

	rules: {
		'@stylistic/indentation': 'tab',
		'max-nesting-depth': 7,
		'order/properties-order': PROPERTIES_LIST,
		'order/properties-alphabetical-order': null,
		'selector-max-compound-selectors': 4,
		'selector-max-id': 1,
		'scss/at-function-pattern': /^[-_]?\w+(?:-\w+)*$/,
	},
}
