export type ShaderType = (typeof ShaderType)[keyof typeof ShaderType]

export const ShaderType = Object.freeze({
	VERTEX: 0,
	FRAGMENT: 1,
})

const bindings = import('#bindings').then(module => module.default())

export default async function compress(
	shaderType: ShaderType,
	shaderSource: string,
): Promise<string> {
	const { Optimizer, Minifier } = await bindings
	using disposer = new DisposableStack()

	const { result: optimizedCode } = disposer.use(
		new Optimizer(shaderType, shaderSource),
	)

	const { result: minifiedCode } = disposer.use(
		new Minifier(optimizedCode ?? ''),
	)

	return minifiedCode as string ?? ''
}
