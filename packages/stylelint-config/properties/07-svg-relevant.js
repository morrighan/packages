// Local helpers.
import _ from '../helpers/generator.js'
import { ITSELF } from '../helpers/fragments.js'

export default _([
	_('alignment-baseline'),
	_('baseline-shift'),
	_('dominant-baseline'),
	_('text-anchor'),
	_([ 'cx', 'cy', 'd', 'r', 'rx', 'ry' ]),
	_('fill', [ ITSELF, 'opacity', 'rule' ]),
	_([ 'flood', 'stop' ], [ 'color', 'opacity' ]),
	_('stroke', [ ITSELF, 'dasharray', 'dashoffset', 'linecap', 'linejoin', 'miterlimit', 'opacity', 'width' ]),
	_('vector-effect'),
	_('color', [ _('interpolation', [ ITSELF, 'filters' ]), 'profile', 'rendering' ]),
	_('image-rendering'),
	_('lighting-color'),
	_('marker', [ 'start', 'mid', 'end' ]),
	_('mask', [ ITSELF, 'type' ]),
	_('shape-rendering'),
	_('clip-rule'),
])
