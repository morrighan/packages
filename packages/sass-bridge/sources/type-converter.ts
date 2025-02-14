// Third-party modules.
import chroma from 'chroma-js'
import * as Immutable from 'immutable'

// Local helpers.
import {
	type SassType,
	SassBoolean,
	SassNumber,
	SassString,
	SassColor,
	SassList,
	SassMap,
	SassTRUE,
	SassFALSE,
	SassNULL,
	type JavaScriptType,
	type NumberWithUnit,
} from './types'

// Helper functions.
function isObject(value?: unknown): value is object {
	const type = typeof value

	return !!value && (type === 'object' || type === 'function')
}

function isMap(value?: unknown): value is Map<unknown, unknown> {
	return isObject(value) && Symbol.toStringTag in value && value[Symbol.toStringTag] === 'Map'
}

export function sassToJavaScriptType(sassValue: SassType): JavaScriptType {
	switch (true) {
	case sassValue instanceof SassBoolean: {
		return sassValue.value
	}

	case sassValue instanceof SassString: {
		return sassValue.text
	}

	case sassValue instanceof SassNumber: {
		const { value, numeratorUnits, denominatorUnits } = sassValue

		const unit = sassValue.hasUnits
			? numeratorUnits.join('*') + (denominatorUnits.size > 0 ? `/${denominatorUnits.join('*')}` : '')
			: ''

		return unit ? { value, unit } : value
	}

	case sassValue instanceof SassColor: {
		const { red, green, blue, alpha } = sassValue

		return chroma(red, green, blue, alpha)
	}

	case sassValue instanceof SassList: {
		const listValue = sassValue.asList
		const length = listValue.size
		const array = Array(length).fill(undefined) as SassType[]

		for (let index = 0; index < length; index += 1) {
			array[index] = listValue.get(index) as SassType
		}

		return array.map(value => sassToJavaScriptType(value))
	}

	case sassValue instanceof SassMap: {
		const mapValue = sassValue.contents

		const entries = Array.from(mapValue.entries() as IterableIterator<[SassType, SassType]>)
			.map(([ key, value ]) => [ sassToJavaScriptType(key), sassToJavaScriptType(value) ])

		return new Map(entries as [JavaScriptType, JavaScriptType][])
	}

	default: {
		return null
	}
	}
}

export function javaScriptToSassType(rawValue: JavaScriptType): SassType {
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

	case isObject(rawValue) && '_rgb' in rawValue: {
		const [ red, green, blue, alpha ] = rawValue.rgba() as number[]

		return new SassColor({ red, green, blue, alpha })
	}

	case Array.isArray(rawValue): {
		return new SassList(rawValue.map(javaScriptToSassType))
	}

	case isMap(rawValue): {
		const mapValue = rawValue as Map<JavaScriptType, JavaScriptType>

		const iterable = mapValue.entries().map(entry => (
			entry.map(javaScriptToSassType) as [ SassType, SassType ]
		))

		return new SassMap(Immutable.OrderedMap(iterable))
	}

	default: {
		return SassNULL
	}
	}
}
