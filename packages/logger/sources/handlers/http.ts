// Local helpers.
import LoggingLevel from '../helpers/logging-level'
import ColorScheme from '../helpers/color-scheme'
import decorateLabel from '../helpers/label-decorator'

// Handler metadata.
export const name = 'http'
export const level = LoggingLevel.Http
export const label = decorateLabel('HTTP', ColorScheme.Http)

export default null
