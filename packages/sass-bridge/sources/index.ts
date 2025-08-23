// Third-party modules.
import type { CustomFunction } from 'sass'

// Local helpers.
import type { SassType, JavaScriptType } from './types'
import { sassToJavaScriptType, javaScriptToSassType } from './type-converter'

// Type definitions.
interface Constructor {
	new (...args: any[]): object
}

interface BridgedFunction {
	(rawArgs: SassType[]): Promise<SassType>
}

type BridgedFunctionMap = Map<string, BridgedFunction>

export function sassFunction(signature: string) {
	return function decorate<This, Args extends any[], Return extends JavaScriptType>(
		target: (this: This, ...args: Args) => Return | Promise<Return>,
		context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return | Promise<Return>>,
	): void {
		if (context.private) {
			throw new TypeError('Not supported on private methods.')
		}

		context.metadata.functionMap ??= new Map<string, BridgedFunction>()

		const { functionMap } = context.metadata as { functionMap: BridgedFunctionMap }

		context.addInitializer(function initialize(this: This) {
			const bridgedFunction: BridgedFunction = async (rawArgs: SassType[]): Promise<SassType> => {
				const args = rawArgs.map(sassToJavaScriptType)
				const result = await Promise.resolve(Reflect.apply(target, this, args)) as JavaScriptType

				return javaScriptToSassType(result)
			}

			functionMap.set(signature, bridgedFunction)
		})
	}
}

export async function getFunctions(
	...moduleImports: Promise<{ default: Constructor }>[]
): Promise<Record<string, CustomFunction<'async'>>> {
	const modules = await Promise.all(
		moduleImports.map(module => (
			module.then(({ default: Module }) => new Module())
		)),
	)

	const entries = modules
		.map(module => (
			Reflect.getPrototypeOf(module)?.constructor?.[Symbol.metadata]?.functionMap as BridgedFunctionMap
		))
		.filter(functionMap => !!functionMap)
		.flatMap(functionMap => Array.from(functionMap.entries()))

	return Object.fromEntries(entries)
}
