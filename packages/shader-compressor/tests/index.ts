// Node.js built-in APIs.
import fs from 'fs/promises'
import path from 'path'

// Third-party modules.
import { test, expect } from 'vitest'

// Testing target.
import compress, { ShaderType } from '@cichol/shader-compressor'

// Constants.
const SHADER_DIRECTORY = path.resolve(import.meta.dirname, 'artifacts')

// Local helpers.
async function loadArtifact(targetPath: string): Promise<string> {
	return fs.readFile(path.resolve(SHADER_DIRECTORY, targetPath), 'utf-8')
		.then(shaderCode => (
			shaderCode.replace(/^\/\/.*/mg, '').trimEnd()
		))
}

test('should be working properly', async () => {
	const [
		VERTEX_SHADER_SOURCE,
		VERTEX_SHADER_OPTIMIZED,
		FRAGMENT_SHADER_SOURCE,
		FRAGMENT_SHADER_OPTIMIZED,
	] = await Promise.all(
		[ 'vert', 'frag' ].flatMap(type => [ `in.${type}`, `out.${type}` ]).map(loadArtifact),
	)

	await expect(
		compress(ShaderType.VERTEX, VERTEX_SHADER_SOURCE),
	).resolves.to.equal(VERTEX_SHADER_OPTIMIZED)

	await expect(
		compress(ShaderType.FRAGMENT, FRAGMENT_SHADER_SOURCE),
	).resolves.to.equal(FRAGMENT_SHADER_OPTIMIZED)
})
