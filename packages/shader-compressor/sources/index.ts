import { minify } from 'shader-minifier-wasm'

import getOptimizerWasmExports, {
	type ShaderType as ShaderTypeEnum,
	type MainModule as WasmExports,
} from '#optimizer'

export type ShaderType = (typeof ShaderType)[keyof typeof ShaderType]

export const ShaderType = Object.freeze({
	VERTEX: 0,
	FRAGMENT: 1,
})

let ShaderTypeValue: WasmExports['ShaderType']
let Optimizer: WasmExports['Optimizer']

export default async function compress(shaderType: ShaderType, shaderSource: string): Promise<string> {
	if (!ShaderTypeValue || !Optimizer) {
		({ ShaderType: ShaderTypeValue, Optimizer } = await getOptimizerWasmExports())
	}

	const nativeType: ShaderTypeEnum = (
		shaderType === ShaderType.VERTEX ? ShaderTypeValue.VERTEX : ShaderTypeValue.FRAGMENT
	)

	using optimizer = new Optimizer(nativeType, shaderSource)
	const [ completed, shaderCode = '', errorLog = '' ] = optimizer.result ?? []

	if (!completed) throw new Error(errorLog as string)

	return minify({ shader: shaderCode as string }, { format: 'text', preserveExternals: true })
}
