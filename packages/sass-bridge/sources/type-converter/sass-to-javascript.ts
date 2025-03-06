// Third-party modules.
import chroma from 'chroma-js'

// Local helpers.
import {
	type JavaScriptType,
	type SassType,
	SassBoolean,
	SassNumber,
	SassString,
	SassColor,
	SassList,
	SassMap,
} from '../types'

export default function sassToJavaScriptType(sassValue: SassType): JavaScriptType {
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
		const sassColor = sassValue.toSpace('rgb')
		const { alpha, space } = sassColor
		const channels = [ ...sassColor.channels ] as [ number, number, number, number ]

		if (alpha) {
			channels.push(alpha)
		}

		return chroma(...channels, space as 'rgb')
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
