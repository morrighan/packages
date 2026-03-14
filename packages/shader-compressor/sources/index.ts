import process from 'process'

export type ShaderType = (typeof ShaderType)[keyof typeof ShaderType]

export const ShaderType = Object.freeze({
	VERTEX: 0,
	FRAGMENT: 1,
})

const bindings = import('#bindings').then(module => module.default())
let { Validator, Optimizer, Minifier } = {} as Awaited<typeof bindings>
const isValidatorInitialized = false

function validate(disposer: DisposableStack, ...args: ConstructorParameters<typeof Validator>): void {
	if (isValidatorInitialized) {
		Validator.initialize()

		process.once('beforeExit', () => {
			Validator.finalize()
		})
	}

	const { error } = disposer.use(
		new Validator(...args),
	)

	if (error) {
		throw new Error(error as string)
	}
}

export default async function compress(shaderType: ShaderType, shaderSource: string): Promise<string> {
	({ Validator, Optimizer, Minifier } = await bindings)
	using disposer = new DisposableStack()

	validate(disposer, shaderType, shaderSource)

	const { result: optimizedCode } = disposer.use(
		new Optimizer(shaderType, shaderSource),
	)

	validate(disposer, shaderType, optimizedCode)

	const { result: minifiedCode = '' } = disposer.use(
		new Minifier(optimizedCode),
	)

	validate(disposer, shaderType, minifiedCode)

	return minifiedCode as string
}
