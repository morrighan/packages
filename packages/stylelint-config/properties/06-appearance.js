// Local helpers.
import _ from '../helpers/generator.js'
import { ITSELF, AXIAL } from '../helpers/fragments.js'

export default _([
	_('appearance'),
	_('visibility'),
	_('color-scheme'),
	_('forced-color-adjust'),
	_('accent-color'),
	_('perspective', [ 'origin', ITSELF ]),
	_('backface-visibility'),
	_('opacity'),
	_('object', [ 'fit', 'position' ]),
	_('image-orientation'),

	_('background', [
		ITSELF,
		_('color'),
		_('image'),
		_('repeat', [ ITSELF, AXIAL ]),
		_('attachment'),
		_('position', [ ITSELF, AXIAL ]),
		_('clip'),
		_('origin'),
		_('size'),
		_('blend-mode'),
	]),

	_('clip', [ ITSELF, 'path' ]),
	_([ ITSELF, 'backdrop' ], 'filter'),
	_([ '-webkit', ITSELF ], 'box-decoration-break'),
	_('outline', [ ITSELF, 'width', 'style', 'color', 'offset' ]),
	_('box-shadow'),
	_('mix-blend-mode'),
	_('caret-color'),
])
