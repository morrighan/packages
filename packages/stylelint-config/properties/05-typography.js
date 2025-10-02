// Local helpers.
import _ from '../helpers/generator.js'
import { ITSELF } from '../helpers/fragments.js'

export default _([
	_('writing-mode'),

	_('font', [
		ITSELF,
		_('display'),
		_('style'),
		_('variant', [ ITSELF, 'ligatures', 'caps', 'alternates', 'numeric', 'east-asian', 'position' ]),
		_('weight'),
		_('size'),
		_('family'),
		_([ 'feature', 'variation' ], 'settings'),
		_('optical-sizing'),
		_('kerning'),
		_('size-adjust'),
		_('stretch'),
		_('effect'),
		_('emphasize', [ ITSELF, 'position', 'style' ]),
		_('smooth'),
	]),

	_([ ITSELF, '-webkit', '-moz-osx' ], 'font-smoothing'),
	_('ruby-position'),
	_('line-height'),
	_('hyphens'),
	_('color'),

	_('text', [
		_('align', [ ITSELF, 'last' ]),
		_('emphasis', [ ITSELF, 'color', 'style', 'position' ]),
		_('decoration', [ ITSELF, 'color', 'line', 'style', 'thickness', 'skip-ink' ]),
		_('underline', [ 'position', 'offset' ]),
		_('indent'),
		_('justify'),
		_('outline'),
		_('overflow', [ ITSELF, 'ellipsis', 'mode' ]),
		_('shadow'),
		_('transform'),
		_('wrap'),
		_('size-adjust'),
		_('combine-upright'),
		_('orientation'),
		_('rendering'),
	]),

	_('-webkit-text', [ 'fill', 'stroke' ], 'color'),
	_('letter-spacing'),
	_('word', [ 'break', 'spacing', 'wrap' ]),
	_('line-break'),
	_('overflow-wrap'),
	_('tab-size'),
	_('white-space'),
	_('vertical-align'),
	_('paint-order'),
	_('hanging-punctuation'),
	_('list-style', [ ITSELF, 'position', 'type', 'image' ]),
	_('src'),
	_('unicode-range'),
	_([ 'ascent', 'descent', 'line-gap' ], 'override'),
])
