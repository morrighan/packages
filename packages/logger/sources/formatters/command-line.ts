// Third-party modules.
import { gray } from '@std/fmt/colors'
import rTracer from 'cls-rtracer'
import { DateTime } from 'luxon'
import { format } from 'winston'

// Handler implementations.
import handlers from '#handlers/index'

export default format.printf(data => {
	const timestamp = gray(DateTime.now().toISO({ includeOffset: true }))
	const handler = handlers.find(({ name }) => name === data.level)
	const fallback = { label: handler?.label, payload: data.message }
	const performHandle = handler?.default ?? ((): typeof fallback => fallback)

	// Execute handler and then, get decorated payload.
	const { label, payload } = Reflect.apply(performHandle, undefined, [ data ]) ?? fallback

	const extraFingerprint = [
		[ 'Request-ID', rTracer.id() ],
		[ 'Transaction-ID', data.transactionId ],
	]
		.filter(([ , idValue ]) => idValue)
		.map(([ kind, idValue ]) => `${kind} = ${idValue}`)
		.join(' | ')

	return `${label as string} ${timestamp}${extraFingerprint ? ` (${extraFingerprint})` : ''}\n${payload as string}`
})
