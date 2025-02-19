import 'reflect-metadata'

// Third-party modules.
import { CustomFunction } from 'sass'

// Local helpers.
import type { SassType, JavaScriptType } from './types'
import { sassToJavaScriptType, javaScriptToSassType } from './type-converter'

// Type definitions.
export interface BridgedFunction {
	execute(): JavaScriptType | Promise<JavaScriptType>
}

export interface Constructor {
	new (...args: any[]): BridgedFunction
}

// Constants.
const KeyOfSignature = Symbol('@cichol/sass-bridge::KeyOfSignature')
const signatureStore = new WeakMap<Constructor, string>()

export function sassFunction(definition: string): ClassDecorator {
	return (<T extends Constructor>(target: T) => {
		Reflect.defineMetadata(KeyOfSignature, definition, target)
		signatureStore.set(target, definition)

		return target
	}) as ClassDecorator
}

export async function getFunctions(
	...moduleImports: Promise<{ default: Constructor }>[]
): Promise<Record<string, CustomFunction<'async'>>> {
	const modules = await Promise.all(
		moduleImports.map(module => (
			Promise.resolve(module)
				.then(({ default: Constructor }) => Constructor)
		)),
	)

	const entries = modules.map(module => {
		const signature = Reflect.getMetadata(KeyOfSignature, module) as string ?? signatureStore.get(module)

		async function customFunction(rawArgs: SassType[]): Promise<SassType> {
			const args = rawArgs.map(sassToJavaScriptType)
			const result = await Reflect.construct(module, args).execute()

			return javaScriptToSassType(result)
		}

		return [ signature, customFunction ] as const
	})

	return Object.fromEntries(entries)
}
