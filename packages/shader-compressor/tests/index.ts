// Node.js built-in APIs.
import fs from 'fs/promises'
import path from 'path'

// Third-party modules.
import { test, expect } from 'vitest'

// Testing target.
const { ShaderType, Optimizer } = await import('#optimizer').then(module => module.default())

// Constants.
const SHADER_DIRECTORY = path.resolve(import.meta.dirname, '../artifacts/glsl-optimizer/tests')

// Local helpers.
async function loadArtifact(targetPath: string): Promise<string> {
	return fs.readFile(path.resolve(SHADER_DIRECTORY, targetPath), 'utf-8')
		.then(shaderCode => (
			shaderCode.replace(/^\/\/.*/mg, '').trimEnd()
		))
}

test('should work properly in optimization phase', async () => {
	const VERTEX_SHADER_SOURCE = await loadArtifact('vertex/MF-GodRays-inES3.txt')
	const VERTEX_SHADER_OPTIMIZED = await loadArtifact('vertex/MF-GodRays-outES3.txt')
	const FRAGMENT_SHADER_SOURCE = await loadArtifact('fragment/global-struct-constant-init-metal-inES3.txt')
	const FRAGMENT_SHADER_OPTIMIZED = await loadArtifact('fragment/global-struct-constant-init-metal-outES3.txt')

	for (const [ shaderType, shaderSource, expectedOutput ] of [
		[ ShaderType.VERTEX, VERTEX_SHADER_SOURCE, VERTEX_SHADER_OPTIMIZED ],
		[ ShaderType.FRAGMENT, FRAGMENT_SHADER_SOURCE, FRAGMENT_SHADER_OPTIMIZED ],
	] as const) {
		using optimizer = new Optimizer(shaderType, shaderSource)
		const [ isCompleted, optimizedCode = '' ] = (optimizer.result ?? []) as [ boolean, string | void, string | void ]

		expect(isCompleted).to.equal(true)
		expect(optimizedCode.trimEnd()).to.equal(expectedOutput)
	}
})
