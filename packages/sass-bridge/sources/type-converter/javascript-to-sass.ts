// Node.js built-in APIs.
import util from 'util'

// Third-party modules.
import Immutable from 'immutable'

// Local helpers.
import {
	type NumberWithUnit,
	type StringWithQuotes,
	type JavaScriptType,
	type SassType,
	SassNumber,
	SassString,
	SassColor,
	SassList,
	SassMap,
	SassTRUE,
	SassFALSE,
	SassNULL,
} from '../types'

// Helper functions.
function isObject(value?: unknown): value is object {
	const type = typeof value

	return !!value && (type === 'object' || type === 'function')
}

function isMap(value?: unknown): value is Map<unknown, unknown> {
	if (value instanceof Map) return true
	if (util.types.isMap(value)) return true

	return isObject(value) && Symbol.toStringTag in value && value[Symbol.toStringTag] === 'Map'
}

export default function javaScriptToSassType(rawValue: JavaScriptType): SassType {
	switch (true) {
	case typeof rawValue === 'boolean': {
		const booleanValue = rawValue

		return booleanValue ? SassTRUE : SassFALSE
	}

	case typeof rawValue === 'number': {
		const numberValue = rawValue

		return new SassNumber(numberValue)
	}

	case isObject(rawValue) && [ 'value', 'unit' ].every(propertyKey => propertyKey in rawValue): {
		const { value, unit } = rawValue as NumberWithUnit

		return new SassNumber(value, unit)
	}

	case typeof rawValue === 'string': {
		const stringValue = rawValue

		return new SassString(stringValue)
	}

	case isObject(rawValue) && [ 'value', 'quotes' ].every(propertyKey => propertyKey in rawValue): {
		const { value: stringValue, quotes } = rawValue as StringWithQuotes

		return new SassString(stringValue, { quotes })
	}

	case isObject(rawValue) && '_rgb' in rawValue: {
		const [ red, green, blue, alpha ] = rawValue.rgba() as number[]

		return new SassColor({ red, green, blue, alpha })
	}

	case Array.isArray(rawValue): {
		return new SassList(rawValue.map(javaScriptToSassType))
	}

	case isMap(rawValue): {
		const mapValue = rawValue as Map<JavaScriptType, JavaScriptType>

		const iterable = Array.from(mapValue.entries())
			.map(entry => (
				entry.map(javaScriptToSassType) as [ SassType, SassType ]
			))

		return new SassMap(Immutable.OrderedMap(iterable))
	}

	default: {
		return SassNULL
	}
	}
}
