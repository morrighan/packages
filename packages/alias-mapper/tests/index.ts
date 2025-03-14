// Node.js built-in APIs.
import console from 'console'
import path from 'path'

// Third-party modules.
import { test, expect } from 'vitest'

// Target modules.
import * as Babel from '@babel/core'
import { ESLint, loadESLint } from 'eslint'

// Constants.
const TARGET_ROOT = path.resolve(import.meta.dirname, 'examples')
const TARGET_FILE = path.resolve(TARGET_ROOT, 'sources/frontend/components/button/index.js')

//
const eslint = await loadESLint({ useFlatConfig: true }).then(Linter => new Linter())

test(`should work properly w/ ESLint v${ESLint.version}`, async () => {
	const [ result ] = await eslint.lintFiles([ TARGET_FILE ])

	try {
		expect(result, 'An error has not to be raised').to.have.own.property('errorCount', 0)
	} catch {
		console.table(result.messages)
	}
})

test(`should work properly w/ Babel v${Babel.version}`, async () => {
	const result = Babel.transformFileAsync(TARGET_FILE, { root: TARGET_ROOT, compact: true })

	await expect(result, 'The built code does not match').resolves.to.have.own.property('code', [
		'import"./../../../common/logger";',
		'import{initialize}from"./../../../backend/database";',
		'import{Account}from"./../../../backend/models/account";',
		'import"./../checkbox";',
		'export{Account,initialize};',
	].join(''))
})
