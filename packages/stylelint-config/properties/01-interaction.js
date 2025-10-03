// Local helpers.
import _ from '../helpers/generator.js'
import { ITSELF, DIRECTIONAL } from '../helpers/fragments.js'

export default _([
	_('pointer-events'),
	_('touch-action'),
	_('will-change'),
	_('cursor'),
	_('caption-side'),
	_('content'),
	_('quotes'),
	_('counter', [ 'set', 'increment', 'reset' ]),
	_('resize'),
	_('user-select'),
	_('overflow-anchor'),
	_('nav', [ 'index', 'up', 'right', 'down', 'left' ]),
	_('scroll-behavior'),
	_('scrollbar', [ 'color', 'width', 'gutter' ]),
	_('scroll', [ 'margin', 'padding' ], [ ITSELF, DIRECTIONAL ]),
	_('scroll-snap', [ 'type', 'align', 'stop' ]),
	_('content-visibility'),
	_('contain-intrinsic', [ 'size', 'width', 'height', 'inline-size', 'block-size' ]),
	_('speak', [ ITSELF, 'as' ]),
])
