// Third-party modules.
import { test, expect } from 'vitest'

test('`index.js` should be parsed without an exception', async () => {
	await expect(import('..')).resolves.not.toThrow()
})
