// Third-party modules.
import { bgRgb24, rgb24 } from '@std/fmt/colors'

// Type definitions.
type Colorizer = (string: string) => string

// Constants.
const colorizerMap = new Map<number, Colorizer>()

// Helpers.
function createScheme(options: { background: ColorValue, foreground: ColorValue }): number {
	const nextIndex = colorizerMap.size
	const colorizer = (string: string) => bgRgb24(rgb24(string, options.foreground), options.background)

	colorizerMap.set(nextIndex, colorizer)

	return nextIndex
}

// Color definitions.
const ColorValue = {
	// Basic colors.
	White: 0xFFFFFF,
	Gray: 0x808080,
	Black: 0x000000,

	// Specialized colors.
	Critical: 0xD63031,
	Warning: 0xFDCB6E,
	Regular: 0x0984E3,
	Http: 0x6AB04C,
	Query: 0x399AF3,
} as const

type ColorValue = typeof ColorValue[keyof typeof ColorValue]

const ColorScheme = {
	Critical: createScheme({
		background: ColorValue.Critical,
		foreground: ColorValue.Black,
	}),

	Warning: createScheme({
		background: ColorValue.Warning,
		foreground: ColorValue.Black,
	}),

	Regular: createScheme({
		background: ColorValue.Regular,
		foreground: ColorValue.White,
	}),

	Http: createScheme({
		background: ColorValue.Http,
		foreground: ColorValue.Black,
	}),

	Query: createScheme({
		background: ColorValue.Query,
		foreground: ColorValue.Black,
	}),

	Loud: createScheme({
		background: ColorValue.Black,
		foreground: ColorValue.Gray,
	}),
} as const

type ColorScheme = typeof ColorScheme[keyof typeof ColorScheme]

export function getChalkOf(colorSet: ColorScheme): Colorizer {
	return colorizerMap.get(colorSet) ?? ((string: string) => string)
}

export default ColorScheme
