import { type BridgedFunction, sassFunction } from '@cichol/sass-bridge';

@sassFunction('sqrt-cos($x)')
export default class SquareRootCosine implements BridgedFunction {
    #x: number;

    public constructor(X: number) {
        this.#x = X;
    }

    public async execute() {
        return Math.sqrt(Math.cos(this.#x));
    }
}
