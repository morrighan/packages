// Third-party modules.
import chalk, { type ChalkInstance } from 'chalk'

// Constants.
const colorizerMap = new Map<number, ChalkInstance>()

// Helpers.
function createScheme(options: { background: ColorValue, foreground: ColorValue }): number {
    const nextIndex = colorizerMap.size
    const colorizer = chalk.bgHex(options.background).hex(options.foreground)

    colorizerMap.set(nextIndex, colorizer)

    return nextIndex
}

// Color definitions.
const ColorValue = {
    // Basic colors.
    White: '#FFFFFF',
    Gray: '#808080',
    Black: '#000000',

    // Specialized colors.
    Critical: '#D63031',
    Warning: '#FDCB6E',
    Regular: '#0984E3',
    Http: '#6AB04C',
    Query: '#399AF3',
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

export function getChalkOf(colorSet: ColorScheme): ChalkInstance {
    return colorizerMap.get(colorSet) ?? chalk
}

export default ColorScheme
