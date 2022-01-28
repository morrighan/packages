// Local helpers.
import LoggingLevel from '../helpers/logging-level';
import ColorScheme from '../helpers/color-scheme';
import decorateLabel from '../helpers/label-decorator';

// Handler metadata.
export const name = 'verbose';
export const level = LoggingLevel.Verbose;
export const label = decorateLabel('VERBOSE', ColorScheme.Loud);

export default null;
