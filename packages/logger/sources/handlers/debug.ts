// Local helpers.
import LoggingLevel from '../helpers/logging-level';
import ColorScheme from '../helpers/color-scheme';
import decorateLabel from '../helpers/label-decorator';

// Handler metadata.
export const name = 'debug';
export const level = LoggingLevel.Debug;
export const label = decorateLabel('DEBUG', ColorScheme.Loud);

export default null;
