// Local helpers.
import _ from '../helpers/generator.js'
import { ITSELF, RANGE_BOUNDABLE, DIRECTIONAL, DIAGONAL } from '../helpers/fragments.js'

export default _([
	_('box-sizing'),
	_('aspect-ratio'),
	_(RANGE_BOUNDABLE, 'block-size'),
	_(RANGE_BOUNDABLE, 'inline-size'),
	_(RANGE_BOUNDABLE, 'width'),
	_(RANGE_BOUNDABLE, 'height'),
	_([ 'margin', 'padding' ], [ ITSELF, DIRECTIONAL ]),

	_('border', [
		_([ ITSELF, DIRECTIONAL ], [ ITSELF, 'width', 'style', 'color' ]),
		_([ ITSELF, DIAGONAL ], 'radius'),
		_('image', [ ITSELF, 'source', 'slice', 'width', 'outset', 'repeat' ]),
	]),
])
