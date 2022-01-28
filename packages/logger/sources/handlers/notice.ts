// Local helpers.
import LoggingLevel from '../helpers/logging-level';
import ColorScheme from '../helpers/color-scheme';
import decorateLabel from '../helpers/label-decorator';

// Handler metadata.
export const name = 'notice';
export const level = LoggingLevel.Notice;
export const label = decorateLabel('NOTICE', ColorScheme.Regular);

export default null;
