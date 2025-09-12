// Third-party modules.
import type { Color } from 'chroma-js'
import * as sass from 'sass'

// Type definitions.
export type Primitives = boolean | number | string | null

export type NumberWithUnit = { value: number, unit: string }

export type StringWithQuotes = { value: string, quotes: boolean }

export type JavaScriptType<Base = Primitives | Color | NumberWithUnit | StringWithQuotes> =
	| Base
	| JavaScriptType<Base>[]
	| Map<JavaScriptType<Base>, JavaScriptType<Base>>

export const SassTRUE = sass.sassTrue
export type SassTRUE = typeof SassTRUE

export const SassFALSE = sass.sassFalse
export type SassFALSE = typeof SassFALSE

export const SassNULL = sass.sassNull
export type SassNULL = typeof SassNULL

export const { SassNumber } = sass
export type SassNumber = sass.SassNumber

export const { SassString } = sass
export type SassString = sass.SassString

export const { SassColor } = sass
export type SassColor = sass.SassColor

export const { SassList } = sass
export type SassList = sass.SassList

export const { SassMap } = sass
export type SassMap = sass.SassMap

export const { SassBoolean } = sass
export type SassBoolean = sass.SassBoolean

export { Value as SassType } from 'sass'
