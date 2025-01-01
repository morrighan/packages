// Node.js built-in APIs.
import process from 'process'

// Local helpers.
import ColorScheme, { getChalkOf } from './color-scheme'

// Constants.
const { isTTY } = process.stdout
const isNotOnCLI = !isTTY

export default function decorateLabel<T extends string>(label: T, scheme: ColorScheme): T {
	if (isNotOnCLI) return label

	const chalk = getChalkOf(scheme)
	const decoratedLabel = chalk.bold(` ${label} `)

	return decoratedLabel as T
}
