// Node.js built-in APIs.
import {
	STATUS_CODES,
	IncomingMessage as HttpRequest,
	ServerResponse as HttpResponse,
} from 'http'

// Third-party modules.
import morgan from 'morgan'
import { green, magenta, red, gray, bold, rgb24 } from '@std/fmt/colors'
import { format as prettyBytes } from '@std/fmt/bytes'
import { format as prettyMs } from '@std/fmt/duration'

// Local helpers.
import { ExecutionMode, executionMode } from '#helpers/constants'

// Type definitions.
declare module 'morgan' {
	const combined: morgan.FormatFn
}

interface TokenIndexer {
	[tokenName: string]: (
		request: HttpRequest,
		response: HttpResponse,
		...args: any[]
	) => string | undefined
}

// Helpers.
function decorateStatusCode(statusCode: keyof typeof STATUS_CODES): string {
	const groupOfCode = Math.floor(Number(statusCode) / 100) * 100
	const baseMessage = `${statusCode} ${STATUS_CODES[statusCode] as string}`

	switch (groupOfCode) {
	case 200: {
		return green(baseMessage)
	}

	case 300: {
		return magenta(baseMessage)
	}
	case 400:
	case 500: {
		return red(baseMessage)
	}

	default: {
		return gray(baseMessage)
	}
	}
}

function formatForMorgan(tokens: any, request: HttpRequest, response: HttpResponse): string {
	function _(token: string, ...subArgs: any[]): string | void {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return (tokens as TokenIndexer)[token](request, response, ...subArgs)
	}

	// Raw values.
	const method = _('method')
	const URL = _('url')
	const httpVersion = `HTTP/${_('http-version') as string}`
	const statusCode = Number(_('status'))
	const contentLength = Number(_('res', 'content-length') ?? -1)
	const responseTime = Number(_('response-time') ?? -1)

	// Decorated values.
	const $method = bold(method ?? '')
	const $version = rgb24(httpVersion, 0x62B1FF)
	const $statusCode = decorateStatusCode(statusCode)
	const $contentLength = contentLength >= 0 ? prettyBytes(contentLength) : '? B'
	const $responseTime = responseTime >= 0 ? prettyMs(responseTime, { ignoreZero: true }) : ''

	// Additional information.
	const metadata = `(${$contentLength}, ${$responseTime})`

	return [
		`→ ${$method} ${URL as string} ${$version}`,
		`← ${$version} ${$statusCode} ${metadata}`,
	].join('\n')
}

export default executionMode === ExecutionMode.DevelopmentMode ? formatForMorgan : morgan.combined
