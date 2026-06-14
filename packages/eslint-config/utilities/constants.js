export const browserGlobals = Object.freeze([
	'addEventListener', 'blur', 'close', 'closed', 'confirm', 'defaultStatus', 'defaultstatus', 'event', 'external',
	'find', 'focus', 'frameElement', 'frames', 'history', 'innerHeight', 'innerWidth', 'length', 'location',
	'locationbar', 'menubar', 'moveBy', 'moveTo', 'name', 'onblur', 'onerror', 'onfocus', 'onload', 'onresize',
	'onunload', 'open', 'opener', 'opera', 'outerHeight', 'outerWidth', 'pageXOffset', 'pageYOffset', 'parent', 'print',
	'removeEventListener', 'resizeBy', 'resizeTo', 'screen', 'screenLeft', 'screenTop', 'screenX', 'screenY', 'scroll',
	'scrollbars', 'scrollBy', 'scrollTo', 'scrollX', 'scrollY', 'self', 'status', 'statusbar', 'stop', 'toolbar', 'top',
])

export const extensions = Object.freeze([ '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json' ])

export const devDependencies = Object.freeze([
	'tests/**',
	'scripts/**',
	'test.{js,jsx,ts,tsx}',
	'test-*.{js,jsx,ts,tsx}',
	'**/*{.,_,-}test.{js,jsx,ts,tsx}',
	'**/*.config.js',
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
