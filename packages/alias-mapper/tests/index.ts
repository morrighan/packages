// Node.js built-in APIs.
import console from 'console'
import fs from 'fs/promises'
import path from 'path'

// Third-party modules.
import { describe, it } from 'mocha'
import { expect } from 'chai'

// Target modules.
import * as Babel from '@babel/core'
import { ESLint, loadESLint } from 'eslint'

declare module 'eslint' {
	function loadESLint(options?: ESLint.Options & { useFlatConfig?: boolean }): Promise<typeof ESLint>
}

// Constants.
const examplesPath = path.resolve(import.meta.dirname, 'examples')
const targetFile = path.resolve(examplesPath, 'sources/frontend/components/button/index.js')
const astFile = path.resolve(import.meta.dirname, 'artifacts/ast.json')

// Artifacts.
const savedAst = fs.readFile(astFile, 'utf8').then(data => JSON.parse(data))

describe('@cichol/alias-mapper', () => {
	it(`ESLint v${ESLint.version} should lint without an error`, async () => {
		const linter = await loadESLint().then(ESLint => new ESLint())
		const [ { messages } ] = await linter.lintFiles([ targetFile ])

		for (const { message, ruleId, line, column } of messages) {
			console.error(`[${(ruleId ?? '?')}] ${message} (${line}:${column})`)
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		expect(messages, 'An error has to be not raised').to.be.empty
	})

	it(`Babel v${Babel.version} should compile without an error`, async () => {
		const fileResult = await Babel.transformFileAsync(targetFile, { root: examplesPath, code: false, ast: true })
		const builtAst = fileResult && JSON.parse(JSON.stringify(fileResult.ast))

		expect(builtAst, 'The abstract syntax tree does not match').to.deep.equal(await savedAst)
	})
})
