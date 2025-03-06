import { sassFunction } from '@cichol/sass-bridge'

export default class SquareRootCosine {
	@sassFunction('sqrt-cos($x)')
	public execute(X: number) {
		return Math.sqrt(Math.cos(X))
	}
}
