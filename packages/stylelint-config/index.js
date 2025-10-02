// Pre-sorted CSS properties list.
import PROPERTIES_LIST from './properties/index.js'

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
