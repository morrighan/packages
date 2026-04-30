// Third-party modules.
import { gray } from '@std/fmt/colors'

// Local helpers.
import LoggingLevel from '#helpers/logging-level'
import ColorScheme from '#helpers/color-scheme'
import decorateLabel from '#helpers/label-decorator'

// Type definitions.
type LoggingData = { level: string, message: string } & Record<PropertyKey, any>
type HandledData = { label: string, payload: string }

// Handler metadata.
export const name = 'verbose'
export const level = LoggingLevel.Verbose
export const label = decorateLabel('VERBOSE', ColorScheme.Loud)

export default function handle(data: LoggingData): HandledData | undefined {
	return { label, payload: gray(data.message) }
}
