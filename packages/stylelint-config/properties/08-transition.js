// Local helpers.
import _ from '../helpers/generator.js'
import { ITSELF } from '../helpers/fragments.js'

export default _([
	_('transition', [ ITSELF, 'delay', 'timing-function', 'duration', 'property' ]),
	_('animation', [ ITSELF, 'name', 'duration', 'play-state', 'timing-function', 'fill-mode', 'delay', 'iteration-count', 'direction', 'timeline' ]),
	_('timeline-scope'),
	_('scroll-timeline', [ ITSELF, 'name', 'axis' ]),
	_('view-timeline', [ ITSELF, 'name', 'axis', 'inset' ]),
	_('view-transition-name'),
])
