// Handler implementations.
import * as FatalHandler from '#handlers/fatal'
import * as ErrorHandler from '#handlers/error'
import * as WarningHandler from '#handlers/warning'
import * as NoticeHandler from '#handlers/notice'
import * as InfoHandler from '#handlers/info'
import * as HttpHandler from '#handlers/http'
import * as QueryHandler from '#handlers/query'
import * as VerboseHandler from '#handlers/verbose'
import * as DebugHandler from '#handlers/debug'

const handlers = [
	FatalHandler,
	ErrorHandler,
	WarningHandler,
	NoticeHandler,
	InfoHandler,
	HttpHandler,
	QueryHandler,
	VerboseHandler,
	DebugHandler,
]

export type LoggingLevelName = (typeof handlers extends (infer T)[] ? T : never)['name']
export default handlers
