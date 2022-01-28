// Highlight.js
import highlight from 'cli-highlight';

// Local helpers.
import LoggingLevel from '../helpers/logging-level';
import ColorScheme from '../helpers/color-scheme';
import decorateLabel from '../helpers/label-decorator';

// Type definitions.
type LoggingData = { level: string, message: string } & Record<PropertyKey, any>;
type HandledData = { label: string, payload: string };

// Handler metadata.
export const name = 'query';
export const level = LoggingLevel.Query;
export const label = decorateLabel('QUERY', ColorScheme.Query);

export default function handle(data: LoggingData): HandledData | undefined {
    const payload = highlight(data.message, { language: 'sql' });

    return { label, payload };
}
