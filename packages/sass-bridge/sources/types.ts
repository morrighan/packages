// Third-party modules.
import type { Color } from 'chroma-js'
import * as sass from 'sass'
import { Value } from 'sass'

// Type definitions.
export type Primitives = boolean | number | string | null

export type NumberWithUnit = { value: number, unit: string }

export type JavaScriptType<Base = Primitives | Color | NumberWithUnit> =
    | Base
    | JavaScriptType<Base>[]
    | Map<JavaScriptType<Base>, JavaScriptType<Base>>

type FilterSassPrefix<T extends string> = T extends `Sass${infer R}` ? R : never

type SassTypes = Exclude<`Sass${FilterSassPrefix<keyof typeof sass>}`, `Sass${'Boolean' | 'Calculation'}`>

const SassTypes = Object.fromEntries(
    Object.keys(sass)
        .filter(propertyKey => propertyKey.startsWith('Sass'))
        .map(propertyKey => sass[propertyKey as SassTypes])
        .filter(constructor => typeof constructor === 'function')
        .filter(constructor => Object.prototype.isPrototypeOf.call(Value.prototype, constructor.prototype))
        .map(constructor => [ constructor.name, constructor ] as [SassTypes, (typeof sass)[SassTypes]]),
) as { [P in SassTypes]: (typeof sass)[P] }

export const SassTRUE = sass.sassTrue
export type SassTRUE = typeof SassTRUE

export const SassFALSE = sass.sassFalse
export type SassFALSE = typeof SassFALSE

export const SassNULL = sass.sassNull
export type SassNULL = typeof SassNULL

export const { SassNumber } = SassTypes
export type SassNumber = InstanceType<typeof SassNumber>

export const { SassString } = SassTypes
export type SassString = InstanceType<typeof SassString>

export const { SassColor } = SassTypes
export type SassColor = InstanceType<typeof SassColor>

export const { SassList } = SassTypes
export type SassList = InstanceType<typeof SassList>

export const { SassMap } = SassTypes
export type SassMap = InstanceType<typeof SassMap>

export const SassBoolean = Object.getPrototypeOf(SassTRUE).constructor as typeof sass.SassBoolean
export type SassBoolean = sass.SassBoolean

export type SassType =
    | InstanceType<typeof SassTypes extends Record<any, infer R> ? R : never>
    | SassBoolean
