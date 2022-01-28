// Local helpers.
import LoggingLevel from '../helpers/logging-level';
import ColorScheme from '../helpers/color-scheme';
import decorateLabel from '../helpers/label-decorator';

// Handler metadata.
export const name = 'fatal';
export const level = LoggingLevel.Fatal;
export const label = decorateLabel('FATAL', ColorScheme.Critical);

export { default } from './error';
