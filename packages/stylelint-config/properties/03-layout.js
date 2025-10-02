// Local helpers.
import _ from '../helpers/generator.js'
import { ITSELF, AXIAL } from '../helpers/fragments.js'

export default _([
	_('container', [ ITSELF, 'name', 'type' ]),
	_('size'),
	_('direction'),
	_('unicode-bidi'),
	_([ 'clear', 'float' ]),
	_('contain'),
	_('overflow', [ ITSELF, AXIAL, 'clip-margin' ]),
	_('overscroll-behavior', [ ITSELF, AXIAL ]),
	_('display'),
	_('table-layout'),
	_('border', [ 'spacing', 'collapse' ]),
	_('empty-cells'),
	_('columns'),
	_('column', [ 'count', 'width', 'fill', _('rule', [ 'width', 'style', 'color' ]), 'span' ]),
	_([ 'widows', 'orphans' ]),

	_('grid', [
		ITSELF,
		_('area'),
		_('auto', [ 'rows', 'columns', 'flow' ]),
		_('column', [ ITSELF, 'start', 'gap', 'end' ]),
		_('gap'),
		_('row', [ ITSELF, 'start', 'gap', 'end' ]),
		_('template', [ ITSELF, 'areas', 'rows', 'columns' ]),
	]),

	_('flex', [ ITSELF, 'flow', 'basis', 'direction', 'grow', 'shrink', 'wrap' ]),
	_('box-orient'),
	_('line-clamp'),
	_([ ITSELF, 'row', 'column' ], 'gap'),
	_([ 'place', 'align', 'justify' ], [ 'content', 'items', 'self' ]),
	_('order'),
	_('break', [ 'inside', 'before', 'after' ]),
	_('shape', [ 'outside', 'image-threshold', 'margin' ]),
])
