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

function mapLocationOfErrorThrown(filename: string): string {
	let target = path.relative(rootPath, filename)

	if (target.startsWith('node_modules')) {
		target = chalk.gray(target).replace(
			/node_modules[\\/]([^\\/]+)(.*)/,
			(matches, moduleName: string, trailing: string) => `node_modules${path.sep}${chalk.bold.underline(moduleName)}${chalk.gray(trailing)}`,
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
		.map(line => (path.isAbsolute(line) ? `<anonymous>${conjunction}${mapLocationOfErrorThrown(line)}` : line))
		.map(line => line.replace(/^(.+) \((.+)\)$/, (matches, contextName: string, rawLocation: string) => {
			let location = ''

			switch (true) {
			case (rawLocation === '<anonymous>'): {
				location = chalk.gray(rawLocation)

				break
			}

			case (rawLocation.startsWith('node:')): {
				const [ filename, occurredLine ] = rawLocation.slice(5).split(':')

				location = chalk.gray(`https://github.com/${chalk.bold.underline('nodejs')}/node/blob/${version}/lib/${filename}.js#L${occurredLine}`)

				break
			}

			case (rawLocation.startsWith('data:')): {
				const [ dataURI ] = rawLocation.split(':')
				const contentsPivot = dataURI.indexOf(',') + 1
				const dataURIPrefix = dataURI.slice(0, contentsPivot)
				const contentPrefix = dataURI.slice(contentsPivot, contentsPivot + 4)
				const contentSuffix = dataURI.slice(-4)

				location = chalk.gray(`${dataURIPrefix + contentPrefix}...${contentSuffix}`)

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
