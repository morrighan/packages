// Handler implementations.
import * as FatalHandler from './fatal';
import * as ErrorHandler from './error';
import * as WarningHandler from './warning';
import * as NoticeHandler from './notice';
import * as InfoHandler from './info';
import * as HttpHandler from './http';
import * as QueryHandler from './query';
import * as VerboseHandler from './verbose';
import * as DebugHandler from './debug';

const handlers = [
    FatalHandler,
    ErrorHandler,
    WarningHandler,
    NoticeHandler,
    InfoHandler,
    HttpHandler,
    QueryHandler,
    VerboseHandler,
    DebugHandler
];

export type LoggingLevelName = (typeof handlers extends (infer T)[] ? T : never)['name'];
export default handlers;
