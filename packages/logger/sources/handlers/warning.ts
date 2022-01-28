// Local helpers.
import LoggingLevel from '../helpers/logging-level';
import ColorScheme from '../helpers/color-scheme';
import decorateLabel from '../helpers/label-decorator';

// Handler metadata.
export const name = 'warning';
export const level = LoggingLevel.Warning;
export const label = decorateLabel('WARNING', ColorScheme.Warning);

export default null;
