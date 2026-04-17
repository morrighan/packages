// Node.js built-in APIs.
import process from 'process'

// Third-party modules.
import { bold } from '@std/fmt/colors'

// Local helpers.
import ColorScheme, { getChalkOf } from '#helpers/color-scheme'

// Constants.
const { isTTY } = process.stdout
const isNotOnCLI = !isTTY

export default function decorateLabel<T extends string>(label: T, scheme: ColorScheme): T {
	if (isNotOnCLI) return label

	const colorize = getChalkOf(scheme)
	const decoratedLabel = bold(colorize(` ${label} `))

	return decoratedLabel as T
}
