// Node.js built-in APIs.
import path from 'path'

// Babel modules.
import type { Visitor, types as t } from '@babel/core'
import { declare } from '@babel/helper-plugin-utils'

// Local helpers.
import findAlias, { type Configuration } from './helpers/alias-finder'
import findRelativePath from './helpers/relative-path-finder'

// Type definitions.
interface State extends Record<string, any> {
	filename: string | undefined
}

function createReplacer(configuration: Configuration, basePath: string) {
	const curriedFind = (curriedConfiguration: Configuration) => (
		(rawPath: string, mentionedFile: string) => findAlias(rawPath, mentionedFile, curriedConfiguration)
	)

	const performFind = curriedFind({ ...configuration, basePath: configuration.basePath ?? basePath })

	return (source: t.StringLiteral, state: State) => {
		const rawPath = source.value

		if (!state.filename) return

		const mentionedFile = path.dirname(state.filename)
		const [ mappedPath ] = performFind(rawPath, mentionedFile) ?? []

		if (mappedPath) {
			source.value = findRelativePath(mentionedFile, mappedPath) // eslint-disable-line no-param-reassign
		}
	}
}

export default declare((API, options, configuredDirectory) => {
	API.assertVersion('^7.26.9')

	const performReplace = createReplacer(options, configuredDirectory)

	const internalVisitor: Visitor<State> = {
		ImportDeclaration({ node }, state) {
			performReplace(node.source, state)
		},

		ExportNamedDeclaration({ node }, state) {
			if (node.source) {
				performReplace(node.source, state)
			}
		},

		ExportAllDeclaration({ node }, state) {
			if (node.source) {
				performReplace(node.source, state)
			}
		},
	}

	const globalVisitor: Visitor<State> = {
		Program(nodePath, state) {
			nodePath.traverse(internalVisitor, state)
		},
	}

	return { visitor: globalVisitor }
})
