// Node.js built-in APIs.
import path from 'path'
import process, { version } from 'process'

// Third-party modules.
import chalk from 'chalk'

// Local helpers.
import LoggingLevel from '../helpers/logging-level'
import ColorScheme from '../helpers/color-scheme'
import decorateLabel from '../helpers/label-decorator'

// Type definitions.
type LoggingData = { level: string, message: string } & Record<PropertyKey, any>
type HandledData = { label: string, payload: string }

// Constants.
const rootPath = process.cwd()
const conjunction = ` ${chalk.blue('──')} `
const splat: unique symbol = Symbol.for('splat')

// Handler metadata.
export const name = 'error'
export const level = LoggingLevel.Error
export const label = decorateLabel('ERROR', ColorScheme.Critical)

function simplifyDataURI(dataURI: string): string {
	const [ , actualContent ] = dataURI.split(':')
	const pivot = actualContent.indexOf(',') + 1
	const mimeIndicator = actualContent.slice(0, pivot)
	const contentPrefix = actualContent.slice(pivot, pivot + 4)
	const contentSuffix = actualContent.slice(-4)

	return `data:${mimeIndicator + contentPrefix}...${contentSuffix}`
}

function isDataURI(filename: string): boolean {
	return filename.startsWith('data:')
}

function isAbsoluteOrDataURI(filename: string): boolean {
	return path.isAbsolute(filename) || isDataURI(filename)
}

function mapLocationOfErrorThrown(filename: string): string {
	let target = path.relative(rootPath, filename)

	if (isDataURI(filename)) {
		target = chalk.gray(simplifyDataURI(filename))
	} else if (target.includes('node_modules')) {
		target = chalk.gray(
			target.slice(target.lastIndexOf('node_modules')),
		).replace(
			/node_modules[\\/]((?:@[^\\/]+[\\/])?[^\\/]+)(.*)/,
			(_, moduleName: string, trailing: string) => (
				`node_modules${path.sep}${chalk.bold.underline(moduleName)}${chalk.gray(trailing)}`
			),
		)
	} else {
		target = `${chalk.gray(path.dirname(target) + path.sep)}${chalk.bold.underline(path.basename(target))}`
	}

	return target
}

export default function handle(data: LoggingData): HandledData | undefined {
	const { [splat]: [ error ] = [] } = data as any

	if (!(error instanceof Error)) {
		return undefined
	}

	const { name: errorName, message, stack: rawStack = '' } = error

	const stack = rawStack
		.slice(errorName.length + message.length + 3)
		.split('\n')
		.map(line => line.replace(/^\s+at /g, ''))
		.map(line => (isAbsoluteOrDataURI(line) ? `<anonymous>${conjunction}${mapLocationOfErrorThrown(line)}` : line))
		.map(line => line.replace(/^(.+) \((.+)\)$/, (_, contextName: string, rawLocation: string) => {
			let location = ''

			switch (true) {
			case (rawLocation === '<anonymous>'): {
				location = chalk.gray(rawLocation)

				break
			}

			case (isDataURI(rawLocation)): {
				location = chalk.gray(simplifyDataURI(rawLocation))

				break
			}

			case (rawLocation.startsWith('node:')): {
				const [ filename, occurredLine ] = rawLocation.slice(5).split(':')

				location = chalk.gray(`https://github.com/${chalk.bold.underline('nodejs')}/node/blob/${version}/lib/${filename}.js#L${occurredLine}`)

				break
			}

			default: {
				const [ filename, occurredLine, occurredColumn ] = rawLocation.split(':')

				if (!path.isAbsolute(filename)) break

				const target = mapLocationOfErrorThrown(path.relative(rootPath, filename))
				const trailing = chalk.gray(`:${occurredLine}:${occurredColumn}`)

				location = target + trailing
			}
			}

			return `${contextName}${conjunction}${location}`
		}))
		.join('\n')

	const decoratedLabel = decorateLabel(errorName, ColorScheme.Critical)
	const payload = `${message}\n\n${stack}\n`

	return { label: decoratedLabel, payload }
}
