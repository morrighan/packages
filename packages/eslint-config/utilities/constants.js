import globals from 'globals'

const confusingNames = new Set([
	'event', 'name', 'status', 'length', 'origin', 'self', 'top', 'parent', 'frames', 'frameElement', 'opener',
	'location', 'history', 'screen', 'closed', 'external', 'innerWidth', 'innerHeight', 'outerWidth', 'outerHeight',
	'screenX', 'screenY', 'screenLeft', 'screenTop', 'scrollX', 'scrollY', 'pageXOffset', 'pageYOffset', 'open',
	'close', 'focus', 'blur', 'find', 'print', 'stop', 'confirm', 'scroll', 'scrollTo', 'scrollBy', 'moveTo', 'moveBy',
	'resizeTo', 'resizeBy', 'addEventListener', 'removeEventListener', 'dispatchEvent',
])

export const browserGlobals = Object.freeze(
	Object.keys(globals.browser)
		.filter(name => confusingNames.has(name) || /^on[a-z]/.test(name))
		.sort(),
)

export const extensions = Object.freeze([ '.cjs', '.mjs', '.js', '.jsx', '.mts', '.ts', '.tsx', '.json' ])

export const devDependencies = Object.freeze([
	'tests/**',
	'scripts/**',
	'test.{js,jsx,ts,tsx}',
	'test-*.{js,jsx,ts,tsx}',
	'**/*{.,_,-}test.{js,jsx,ts,tsx}',
	'**/*.config.{js,mjs,ts,mts}',
])

export const modifiableArgs = Object.freeze([
	'acc',
	'accumulator',
	'e',
	'event',
	'ctx',
	'context',
	'req',
	'request',
	'res',
	'response',
	'$scope',
	'staticContext',
	'reply',
])
