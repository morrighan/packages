import { sassFunction } from '@cichol/sass-bridge'

export default class CustomFunction {
	@sassFunction('custom-function($a, $b)')
	public execute(A: string, B: string) {
		return A.toLowerCase() + B.toUpperCase()
	}
}
