export default await Promise.all([
	'composes',
	'all',
	import('./01-interaction.js'),
	import('./02-positioning.js'),
	import('./03-layout.js'),
	import('./04-box-model.js'),
	import('./05-typography.js'),
	import('./06-appearance.js'),
	import('./07-svg-relevant.js'),
	import('./08-transition.js'),
].map(fragments => (
	typeof fragments === 'string'
		? Promise.resolve(fragments)
		: fragments.then(({ default: properties }) => properties)
))).then(properties => (
	properties.flat()
))
