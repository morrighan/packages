// Node.js built-in APIs.
import console from 'console'
import fs from 'fs/promises'
import path from 'path'
import { serialize } from 'v8'

// Third-party modules.
import { describe, it } from 'mocha'
import { expect } from 'chai'

// Target modules.
import * as Babel from '@babel/core'
import { ESLint, loadESLint } from 'eslint'

// Constants.
const examplesPath = path.resolve(import.meta.dirname, 'examples')
const targetFile = path.resolve(examplesPath, 'sources/frontend/components/button/index.js')
const astFile = path.resolve(import.meta.dirname, 'artifacts/ast.data')

// Artifacts.
const savedAst = fs.readFile(astFile)

describe('@cichol/alias-mapper', () => {
	it(`ESLint v${ESLint.version} should lint without an error`, async () => {
		const linter = await loadESLint().then(Linter => new Linter())
		const [ { messages } ] = await linter.lintFiles([ targetFile ])

		for (const { message, ruleId, line, column } of messages) {
			console.error(`[${(ruleId ?? '?')}] ${message} (${line}:${column})`)
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		expect(messages, 'An error has to be not raised').to.be.empty
	})

	it(`Babel v${Babel.version} should compile without an error`, async () => {
		const fileResult = await Babel.transformFileAsync(targetFile, { root: examplesPath, code: false, ast: true })
		const builtAst = fileResult && serialize(fileResult.ast)

		expect(builtAst?.compare(await savedAst), 'The abstract syntax tree does not match').to.equal(0)
	})
})
