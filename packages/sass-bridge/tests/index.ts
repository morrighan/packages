// Third-party modules.
import { test, expect } from 'vitest'
import * as sass from 'sass'

// Testing target.
import { getFunctions } from '@cichol/sass-bridge'

test('should be working properly', async () => {
	const source = `
		body > *:first-child:after {
			content: custom-function('HELLO', 'world');
			line-height: sqrt-cos(${2 * Math.PI});
		}
	`

	const functions = await getFunctions(
		import('./artifacts/custom-function'),
		import('./artifacts/sqrt-cos'),
	)

	const { css: result } = await sass.compileStringAsync(source, { functions })

	expect(result).to.includes('content: "helloWORLD";')
	expect(result).to.includes('line-height: 1;')
})
