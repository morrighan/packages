// Local helpers.
import _ from '../helpers/generator.js'
import { ITSELF, LOGICAL, TOP_RIGHT_BOTTOM_LEFT } from '../helpers/fragments.js'

export default _([
	_('isolation'),
	_('position'),
	_('z-index'),
	_('inset', [ ITSELF, LOGICAL ]),
	_(TOP_RIGHT_BOTTOM_LEFT),
	_('zoom'),
	_('transform', [ 'origin', 'box', 'style', ITSELF ]),
	_('translate'),
	_('rotate'),
	_('scale'),
	_('offset', [ 'path', 'distance', 'rotate' ]),
])
