// Local helpers.
import _ from './generator.js'

// Base fragments.
export const ITSELF = null
export const TOP_RIGHT_BOTTOM_LEFT = _([ 'top', 'right', 'bottom', 'left' ])

// Complex fragments.
export const RANGE_BOUNDABLE = _([ 'min', ITSELF, 'max' ])
export const AXIAL = _([ 'block', 'inline', 'x', 'y' ])
export const LOGICAL = _([ 'block', 'inline' ], [ ITSELF, 'start', 'end' ])
export const DIRECTIONAL = _([ LOGICAL, TOP_RIGHT_BOTTOM_LEFT ])

export const DIAGONAL = _([
	_('top', [ 'left', 'right' ]),
	_('bottom', [ 'right', 'left' ]),
	_([ 'start', 'end' ], [ 'start', 'end' ]),
])
